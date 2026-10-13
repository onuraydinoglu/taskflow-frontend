import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import initialTasks from "./data/tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("taskflow-tasks");

      if (savedTasks !== null) {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
      }
    } catch {
      return initialTasks;
    }

    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard tasks={tasks} />} />
          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={tasks}
                onAddTask={addTask}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
