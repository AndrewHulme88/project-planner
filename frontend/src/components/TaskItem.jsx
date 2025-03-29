const TaskItem = ({
    task,
    editingTaskId,
    editingText,
    setEditingText,
    setEditingTaskId,
    toggleTask,
    updateTask,
    deleteTask,
    editTask,
}) => {
    const isEditing = editingTaskId === task._id;
    const isOverdue = (dateStr) => {
      const today = new Date();
      const due = new Date(dateStr);
      return due < today && !task.completed;
    };

    const getPriorityColor = (level) => {
      switch (level) {
        case "high": return "red";
        case "medium": return "orange";
        case "low": return "green";
        default: return "gray";
      }
    };

    return (
        <li className='task'>
        {isEditing ? (
          <>
            <input value={editingText} onChange={(e) => setEditingText(e.target.value)}/>
            <input type="date" value={editingDueDate} onChange={(e) => setEditingDueDate(e.target.value)} />
            <select value={editingPriority} onChange={(e) => setEditingPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="task-actions">
              <button onClick={updateTask}>Save</button>
              <button onClick={() => setEditingTaskId(null)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <span onClick={() => toggleTask(task._id)}>
             {task.text} {task.completed ? "✔️" : "❌"}
             {task.dueDate && (
              <small style={{ marginLeft: "10px", color: isOverdue(task.dueDate) ? "red" : "gray" }}>
                (Due: {new Date(task.dueDate).toLocaleDateString()})
              </small>
             )}
             <small style={{ marginLeft: "10px", color: getPriorityColor(task.priority)}}>
              [{task.priority}]
             </small>
            </span>
            <div className='task-actions'>
              <button onClick={() => editTask(task._id)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </>
        )}
      </li>
    );
};

export default TaskItem;