import { useState } from "react";
import TaskModal from "../components/ui/TaskModal";

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

  const handleAdd = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Bu görevi silmek istediğinize emin misiniz?",
    );

    if (confirmed) {
      onDeleteTask(id);
    }
  };

  const handleSave = (task) => {
    if (selectedTask) {
      onUpdateTask(task);
    } else {
      onAddTask(task);
    }
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

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">Görev Listesi</h2>
          <p className="mt-1 text-sm text-gray-500">
            Toplam {tasks.length} görev
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left text-sm">
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
              {tasks.map((task) => (
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
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(task)}
                        className="font-medium text-violet-600 hover:text-violet-800"
                      >
                        Düzenle
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(task.id)}
                        className="font-medium text-red-600 hover:text-red-800"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {tasks.length === 0 && (
          <div className="p-10 text-center text-sm text-gray-500">
            Henüz görev bulunmuyor.
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
    </div>
  );
}

export default Tasks;
