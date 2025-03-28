const TaskInput = ({ taskText, setTaskText, addTask, dueDate, setDueDate, priority, setPriority }) => (
    <div>
        <input 
            value={taskText} 
            onChange={e => setTaskText(e.target.value)} 
            placeholder='New task'
        />
        <input 
            type="date" value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <button onClick={addTask} disabled={!taskText.trim()}>
            Add Task
        </button>
    </div>
);

export default TaskInput;