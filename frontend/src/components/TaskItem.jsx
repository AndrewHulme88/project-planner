const TaskItem = ({
  task,
  editingTaskId,
  editingText,
  setEditingText,
  setEditingTaskId,
  editingDueDate,
  setEditingDueDate,
  editingPriority,
  setEditingPriority,
  toggleTask,
  updateTask,
  deleteTask,
  editTask,
}) => {
  const getPriorityColor = (level) => {
    switch (level) {
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "green";
      default: return "gray";
    }
  };

  const isEditing = editingTaskId === task._id;

  return (
    <li className="task">
      {isEditing ? (
        <>
          <input
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <input
            type="date"
            value={editingDueDate}
            onChange={(e) => setEditingDueDate(e.target.value)}
          />
          <select
            value={editingPriority}
            onChange={(e) => setEditingPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="task-actions">
            <button onClick={() => updateTask(task._id)}>Save</button>
            <button onClick={() => setEditingTaskId(null)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task._id)}
            />
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.text}
            </span>
            {task.dueDate && (
              <small style={{ color: "gray" }}>
                (Due: {new Date(task.dueDate).toLocaleDateString()})
              </small>
            )}
            <small style={{ color: getPriorityColor(task.priority) }}>
              [{task.priority}]
            </small>
          </div>
          <div className="task-actions">
            <button onClick={() => editTask(task._id)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
