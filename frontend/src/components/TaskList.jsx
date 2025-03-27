import TaskItem from "./TaskItem";

const TaskList = ({
    tasks,
    filter,
    sortByDueDate,
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
        console.log("Sorting by due date...");
      
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
      console.log("Sorted tasks:", filteredTasks.map(t => ({ text: t.text, dueDate: t.dueDate })));

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