import KanbanBoard from "./components/KanbanBoard";
import './styles.css'

export default function App() {
  return (
    <div className='p-4'>
      <h1>Project Planner</h1>
      <KanbanBoard />
    </div>
  );
}
