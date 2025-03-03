import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

export default function Column({ columnId, column, addTask }) {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div ref={setNodeRef} className="column">
      <h2 className="text-lg font-bold mb-2">{column.name}</h2>
      {column.items.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      ))}
      <button className="mt-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600" onClick={() => addTask(columnId)}>
        Add Task
      </button>
    </div>
  );
}
