import { useState } from "react";
import TaskModal from "../components/ui/TaskModal";
import ConfirmModal from "../components/ui/ConfirmModal";

const priorityLabels = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-red-50 text-red-700",
};

function Tasks({ tasks, onAddTask, onUpdateTask, onDeleteTask }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const handleAdd = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  const handleSave = (task) => {
    if (selectedTask) {
      onUpdateTask(task);
    } else {
      onAddTask(task);
    }
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title
        .toLocaleLowerCase("tr-TR")
        .includes(search.trim().toLocaleLowerCase("tr-TR")),
    )
    .filter((task) =>
      statusFilter === "all" ? true : task.status === statusFilter,
    )
    .filter((task) =>
      priorityFilter === "all" ? true : task.priority === priorityFilter,
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt),
    );

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setSortOrder("newest");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Görevler</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tüm görevleri ve güncel durumlarını görüntüleyebilirsin.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
        >
          + Yeni Görev
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Görev ara..."
          aria-label="Görev ara"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Duruma göre filtrele"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Bekliyor</option>
          <option value="completed">Tamamlandı</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          aria-label="Önceliğe göre filtrele"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500"
        >
          <option value="all">Tüm Öncelikler</option>
          <option value="low">Düşük</option>
          <option value="medium">Orta</option>
          <option value="high">Yüksek</option>
        </select>

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          aria-label="Tarihe göre sırala"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500"
        >
          <option value="newest">En Yeni</option>
          <option value="oldest">En Eski</option>
        </select>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">Görev Listesi</h2>

          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              {filteredTasks.length} / {tasks.length} görev gösteriliyor
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-violet-600 hover:text-violet-700"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Görev</th>
                <th className="px-5 py-4 font-medium">Sorumlu</th>
                <th className="px-5 py-4 font-medium">Öncelik</th>
                <th className="px-5 py-4 font-medium">Durum</th>
                <th className="px-5 py-4 font-medium">Tarih</th>
                <th className="px-5 py-4 font-medium">İşlemler</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="transition hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="mt-1 max-w-70 truncate text-xs text-gray-500">
                      {task.description}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-gray-600">{task.assignee}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${priorityColors[task.priority]}`}
                    >
                      {priorityLabels[task.priority]}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        task.status === "completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {task.status === "completed" ? "Tamamlandı" : "Bekliyor"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString("tr-TR")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(task)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-medium text-violet-700 transition hover:bg-violet-100"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                        Düzenle
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(task)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 transition hover:bg-red-100"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v5" />
                          <path d="M14 11v5" />
                        </svg>
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="p-10 text-center text-sm text-gray-500">
            {tasks.length === 0
              ? "Henüz görev bulunmuyor."
              : "Aramanıza uygun görev bulunamadı."}
          </div>
        )}
      </section>

      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {taskToDelete && (
        <ConfirmModal
          task={taskToDelete}
          onClose={() => setTaskToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default Tasks;
