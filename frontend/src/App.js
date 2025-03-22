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
    axios.post("http://localhost:5000/api/tasks", { text: taskText }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTasks([...tasks, res.data]));
  };

  const toggleTask = (id) => {
    axios.put(`http://localhost:5000/api/tasks/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setTasks(tasks.map(task => task._id === id ? res.data : task));
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {token ? (
        <>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <input value={taskText} onChange={e => setTaskText(e.target.value)} placeholder='New task'/>
          <button onClick={addTask}>Add Task</button>
          <ul>
            {tasks.map(task => (
              <li key={task._id} onClick={() => toggleTask(task._id)}>
                {task.text} {task.completed ? "✔️" : "❌"}
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
