import { useEffect, useState } from 'react';
import axios from 'axios';
//import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

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
          <input value={taskText} onChange={e => setTaskText(e.target.value)} />
          <button onClick={addTask}>Add Task</button>
          <ul>
            {tasks.map(task => (
              <li key={task._id} onClick={() => toggleTask(task._id)}>
                {task.text} {task.completed ? "✔️" : "❌"}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Login</p>
      )}
    </div>
  );
}

export default App;
