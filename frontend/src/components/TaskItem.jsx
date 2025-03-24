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