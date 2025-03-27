const TaskInput = ({ taskText, setTaskText, addTask, dueDate, setDueDate }) => (
    <div>
        <input value={taskText} onChange={e => setTaskText(e.target.value)} placeholder='New task'/>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button onClick={addTask} disabled={!taskText.trim()}>Add Task</button>
    </div>
);

export default TaskInput;