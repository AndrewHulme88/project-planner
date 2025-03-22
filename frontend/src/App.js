import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleRegister = async () => {
    if (!formUsername || !formPassword) {
      setErrorMsg("Username and password are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register", {
        username: formUsername,
        password: formPassword,
      });
      setErrorMsg("Registered! You can now log in.");
    } catch (err) {
      setErrorMsg("Registration failed.");
    }
  };

  const handleLogin = async () => {
    if (!formUsername || !formPassword) {
      setErrorMsg("Username and password are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username: formUsername,
        password: formPassword,
      });
      localStorage.setItem("token", res.data);
      setToken(res.data);
      setErrorMsg("");
      window.location.reload();
    } catch (err) {
      setErrorMsg("Login failed.");
    }
  };

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setTasks(res.data));
    }
  }, [token]);

  const addTask = () => {
    if (!taskText.trim()) {
      setErrorMsg("Task cannot be empty.");
      return;
    }

    if (taskText.trim().length > 100) {
      setErrorMsg("Task must be no more than 100 characters.");
      return;
    }

    axios.post("http://localhost:5000/api/tasks", { text: taskText }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setTasks([...tasks, res.data]);
      setTaskText("");
      setErrorMsg("");
    })
    .catch(() => {
      setErrorMsg("Failed to add task.");
    });
  };

  const toggleTask = (id) => {
    axios.put(`http://localhost:5000/api/tasks/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setTasks(tasks.map(task => task._id === id ? res.data : task));
    });
  };

  const editTask = (id) => {
    const task = tasks.find(t => t._id === id);
    setEditingTaskId(id);
    setEditingText(task.text);
  };

  const updateTask = () => {
    if (!editingText.trim()) {
      setErrorMsg("Task cannot be empty.");
      return;
    }

    axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, {
      text: editingText,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setTasks(tasks.map(task => 
        task._id === editingTaskId ? res.data : task
      ));
      setEditingTaskId(null);
      setEditingText("");
      setErrorMsg("");
    })
    .catch(() => {
      setErrorMsg("Failed to update task.");
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {token ? (
        <>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <input value={taskText} onChange={e => setTaskText(e.target.value)} placeholder='New task'/>
          <button onClick={addTask} disabled={!taskText.trim()}>Add Task</button>
          <ul>
            {tasks.map(task => (
              <li key={task._id}>
                {editingTaskId === task._id ? (
                  <>
                  <input value={editingText} onChange={(e) => setEditingText(e.target.value)}/>
                  <button onClick={updateTask}>Save</button>
                  <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span onClick={() => toggleTask(task._id)}>
                     {task.text} {task.completed ? "✔️" : "❌"}
                    </span>
                    <button onClick={() => editTask(task._id)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <button onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}>Logout</button>
        </>
      ) : (
        <>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <input
            type='text'
            placeholder='Username'
            value={formUsername}
            onChange={(e) => setFormUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
          />
          <button onClick={handleRegister} disabled={!formUsername || !formPassword}>Sign Up</button>
          <button onClick={handleLogin} disabled={!formUsername || !formPassword}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;
