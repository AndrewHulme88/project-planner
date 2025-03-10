import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./Column";

const initialColumns = {
  todo: { name: "To Do", items: []},
  inProgress: { name: "In Progress", items: []},
  done: { name: "Done", items: []},
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

  const addTask = (columnId) => {
    const taskName = prompt("Enter task name:");

    if (!taskName) return;

    const newTask = { id: Date.now().toString(), content: taskName };

    setColumns((prev) => ({
      ...prev,
      [columnId]: { ...prev[columnId], items: [...prev[columnId].items, newTask] },
    }));
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="columns">
        {Object.entries(columns).map(([id, column]) => (
          <Column key={id} columnId={id} column={column} addTask={addTask} />
        ))}
      </div>
    </DndContext>
  );
}
