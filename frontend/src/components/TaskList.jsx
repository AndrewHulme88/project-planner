import TaskItem from "./TaskItem";

const TaskList = ({
    tasks,
    filter,
    editingTaskId,
    editingText,
    setEditingText,
    setEditingTaskId,
    toggleTask,
    updateTask,
    deleteTask,
    editTask,
}) => {
    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
    });

    return (
        <ul>
            {filteredTasks.map((task) => (
                <TaskItem
                    key={(task._id)}
                    task={task}
                    editingTaskId={editingTaskId}
                    editingText={editingText}
                    setEditingText={setEditingText}
                    setEditingTaskId={setEditingTaskId}
                    toggleTask={toggleTask}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    editTask={editTask}
                />
            ))}
        </ul>
    );
};

export default TaskList;