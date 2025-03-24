const TaskInput = ({ taskText, setTaskText, addTask }) => {
    <div>
        <input value={taskText} onChange={e => setTaskText(e.target.value)} placeholder='New task'/>
        <button onClick={addTask} disabled={!taskText.trim()}>Add Task</button>
    </div>
};

export default TaskInput;