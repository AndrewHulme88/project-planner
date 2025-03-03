import { useState } from 'react'
import KanbanBoard from "./components/KanbanBoard";
import './App.css'

export default funtion App() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Project Planner</h1>
      <KanbanBoard />
    </div>
  );
}
