import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./Column";

const initialColumns = {
  todo: { name: "To Do", items: [{ id: "1", content: "Task 1" }]},
  inProgress: { name: "In Progress", items: [{ id: "2", content: "Task 2" }]},
  done: { name: "Done", items: [{ id: "3", content: "Task 3" }]},
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sourceColumnId = Object.keys(columns).find((key) =>
    columns[key].items.some((item) => item.id === active.id)
  );
  const destinationColumnId = over.id;

  if (!sourceColumnId || !destinationColumnId) return;

  const sourceColumn = columns[sourceColumnId];
  const destColumn = columns[destinationColumnId];
  const task = sourceColumn.items.find((item) => item.id === active.id);

  if (!task) return;

  setColumns((prev) => {
    const newSourceItems = prev[sourceColumnId].items.filter((item) => item.id !== active.id);
    const newDestItems = [...prev[destinationColumnId].items, task];

    return {
      ...prev,
      [sourceColumnId]: { ...prev[sourceColumnId], items: newSourceItems },
      [destinationColumnId]: { ...prev[destinationColumnId], items: newDestItems },
    };
  });
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4">
        {Object.entries(columns).map(([id, column]) => (
          <Column key={id} columnId={id} column={column} />
        ))}
      </div>
    </DndContext>
  );
}
