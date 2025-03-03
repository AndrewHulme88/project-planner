import KanbanBoard from "./components/KanbanBoard";
import './styles.css'

export default function App() {
  return (
    <div className="container">
      <h1 className="title">Project Planner</h1>
      <KanbanBoard />
    </div>
  );
}
