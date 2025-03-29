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
    editingDueDate,
    editingPriority,
    setEditingDueDate,
    setEditingPriority,
    toggleTask,
    updateTask,
    deleteTask,
    editTask,
}) => {
    let filteredTasks = tasks.filter(task => {
        const taskPriority = task.priority || "medium";
        const isCompleted = task.completed;
      
        const filterMatch =
          (filter === "all") ||
          (filter === "completed" && isCompleted) ||
          (filter === "incomplete" && !isCompleted);
      
        const priorityMatch =
          priorityFilter === "all" || taskPriority === priorityFilter;
      
        return filterMatch && priorityMatch;
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
    console.log("Filtered tasks:", filteredTasks.map(t => ({ text: t.text, priority: t.priority })));


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
                    editingDueDate={editingDueDate}
                    editingPriority={editingPriority}
                    setEditingDueDate={setEditingDueDate}
                    setEditingPriority={setEditingPriority}
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