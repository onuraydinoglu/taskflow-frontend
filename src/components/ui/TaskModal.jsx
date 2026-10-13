import { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  assignee: "",
  priority: "medium",
  status: "pending",
};

function TaskModal({ onClose, onSave }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const task = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      assignee: form.assignee.trim(),
    };

    if (!task.title || !task.description || !task.assignee) {
      return;
    }

    onSave(task);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="task-modal-title"
            className="text-xl font-semibold text-gray-900"
          >
            Yeni Görev Ekle
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-900"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Görev Başlığı
            </label>
            <input
              id="task-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={150}
              autoFocus
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
              placeholder="Görev başlığını girin"
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Açıklama
            </label>
            <textarea
              id="task-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
              placeholder="Görev açıklamasını girin"
            />
          </div>

          <div>
            <label
              htmlFor="task-assignee"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Sorumlu Kişi
            </label>
            <input
              id="task-assignee"
              name="assignee"
              value={form.assignee}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
              placeholder="Sorumlu kişinin adı"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-priority"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Öncelik
              </label>
              <select
                id="task-priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
              >
                <option value="low">Düşük</option>
                <option value="medium">Orta</option>
                <option value="high">Yüksek</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-status"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Durum
              </label>
              <select
                id="task-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
              >
                <option value="pending">Bekliyor</option>
                <option value="completed">Tamamlandı</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              İptal
            </button>

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              Görevi Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
