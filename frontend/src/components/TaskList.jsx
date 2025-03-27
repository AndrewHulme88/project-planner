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
    let filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
    });

    if (sortByDueDate) {
        filteredTasks = filteredTasks.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

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