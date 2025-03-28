import TaskItem from "./TaskItem";

const TaskList = ({
    tasks,
    filter,
    sortByDueDate,
    priorityFilter,
    sortByPriority,
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
        if (priorityFilter !== "all" && task.priority !== priorityFilter) return false;
        return true;
    });

    if (sortByDueDate) {
        filteredTasks = [...filteredTasks].sort((a, b) => {
            const aHasDate = Boolean(a.dueDate);
            const bHasDate = Boolean(b.dueDate);
        
            if (!aHasDate && !bHasDate) return 0;
            if (!aHasDate) return 1;
            if (!bHasDate) return -1;
        
            const aTime = new Date(a.dueDate).getTime();
            const bTime = new Date(b.dueDate).getTime();
        
            return aTime - bTime;
        });
    }

    if (sortByPriority) {
        const priorityRank = { high: 3, medium: 2, low: 1 };
        filteredTasks = [...filteredTasks].sort((a, b) => {
            const aRank = priorityRank[a.priority] || 0;
            const bRank = priorityRank[b.priority] || 0;
            return bRank - aRank;
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