import { useDraggable } from "@dnd-kit/core";

export default function Task({ task, index }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}
    style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none"}}
    className="task"
    >
      {task.content}
    </div>
  );
}
