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

    return (
        <li className='task'>
        {isEditing ? (
          <>
          <input value={editingText} onChange={(e) => setEditingText(e.target.value)}/>
          <button onClick={updateTask}>Save</button>
          <button onClick={() => setEditingTaskId(null)}>Cancel</button>
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