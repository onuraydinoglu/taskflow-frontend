import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import initialTasks from "./data/tasks";

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (task) => {
    const nextId = tasks.reduce((max, item) => Math.max(max, item.id), 0) + 1;

    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: nextId,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard tasks={tasks} />} />
          <Route
            path="/tasks"
            element={<Tasks tasks={tasks} onAddTask={addTask} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
