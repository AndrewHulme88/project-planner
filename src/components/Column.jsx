import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

export default function Column({ columnId, column }) {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div ref={setNodeRef} className="bg-gray-200 p-4 rounded w-64 min-h-[150px]">
      <h2 className="text-lg font-bold mb-2">{column.name}</h2>
      {column.items.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      ))}
    </div>
  );
}
