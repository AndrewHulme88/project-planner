import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import AuthForm from './components/AuthForm';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [dueDate, setDueDate] = useState("");
  const [sortByDueDate, setSortByDueDate] = useState(false);
  const [priority, setPriority] = useState("medium");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [editingDueDate, setEditingDueDate] = useState("");
  const [editingPriority, setEditingPriority] = useState("medium");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

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

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (!taskText.trim()) {
      setErrorMsg("Task cannot be empty.");
      return;
    }

    if (taskText.trim().length > 100) {
      setErrorMsg("Task must be no more than 100 characters.");
      return;
    }

    axios.post("http://localhost:5000/api/tasks", { text: taskText, dueDate, priority }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setTasks([...tasks, res.data]);
      setTaskText("");
      setDueDate("");
      setPriority("medium");
      setErrorMsg("");
    })
    .catch(() => {
      setErrorMsg("Failed to add task.");
    });
  };

  const toggleTask = (id) => {
    const task = tasks.find(t => t._id === id);
    const updatedCompleted = !task.completed;

    axios.put(`http://localhost:5000/api/tasks/${id}`, {
      completed: updatedCompleted,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    });
  };

  const editTask = (id) => {
    const task = tasks.find(t => t._id === id);
    setEditingTaskId(id);
    setEditingText(task.text);
    setEditingDueDate(task.dueDate?.split("T")[0] || "");
    setEditingPriority(task.priority || "medium");
  };

  const updateTask = () => {
    if (!editingText.trim()) {
      setErrorMsg("Task cannot be empty.");
      return;
    }

    axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, {
      text: editingText,
      dueDate: editingDueDate,
      priority: editingPriority,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setTasks(tasks.map(task => 
        task._id === editingTaskId ? res.data : task
      ));
      setEditingTaskId(null);
      setEditingText("");
      setEditingDueDate("");
      setEditingPriority("medium");
      setErrorMsg("");
    })
    .catch(() => {
      setErrorMsg("Failed to update task.");
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    })
    .catch(() => {
      setErrorMsg("Failed to delete task.");
    });
  };

  return (
    <Router>
      <Navbar 
        token={token}
        setToken={setToken}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className='container'>
        <h1>Project Manager</h1>

        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={
            token ? (
              <Navigate to="/tasks" />
            ) : (
              <AuthForm
                formUsername={formUsername}
                setFormUsername={setFormUsername}
                formPassword={formPassword}
                setFormPassword={setFormPassword}
                handleRegister={handleRegister}
                handleLogin={handleLogin}
                errorMsg={errorMsg}
              />
            )
          }
        />
        <Route path='/tasks' element={
          token ? (
            <>
              <TaskInput 
                taskText={taskText} 
                setTaskText={setTaskText} 
                addTask={addTask}
                dueDate={dueDate}
                setDueDate={setDueDate} 
                priority={priority}
                setPriority={setPriority}
              />
              <FilterBar 
                filter={filter} 
                setFilter={setFilter} 
                sortByDueDate={sortByDueDate}
                setSortByDueDate={setSortByDueDate}  
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                sortByPriority={sortByPriority}
                setSortByPriority={setSortByPriority}
              />
              {errorMsg && <p style={{ color: "red"}}>{errorMsg}</p>}
              <TaskList
                tasks={tasks}
                filter={filter}
                sortByDueDate={sortByDueDate}
                priorityFilter={priorityFilter}
                sortByPriority={sortByPriority}
                editingTaskId={editingTaskId}
                editingText={editingText}
                editingDueDate={editingDueDate}
                editingPriority={editingPriority}
                setEditingText={setEditingText}
                setEditingTaskId={setEditingTaskId}
                setEditingDueDate={setEditingDueDate}
                setEditingPriority={setEditingPriority}
                toggleTask={toggleTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                editTask={editTask}
              />
              <button onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}>Logout</button>
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
    />
    <Route path='*' element={<Navigate to="/" />} />
    </Routes>
      </div>
    </Router>
  );
}

export default App;
