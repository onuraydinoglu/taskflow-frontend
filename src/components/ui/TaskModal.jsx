import { useState } from "react";
import { validateTask } from "../../validations/taskValidation";

const initialForm = {
  title: "",
  description: "",
  assignee: "",
  priority: "medium",
  status: "pending",
};

function TaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState(task || initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedForm = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      assignee: form.assignee.trim(),
    };

    const validationErrors = validateTask(updatedForm);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSave(updatedForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="task-modal-title"
            className="text-xl font-semibold text-gray-900"
          >
            {task ? "Görevi Düzenle" : "Yeni Görev Ekle"}
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

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
              maxLength={110}
              autoFocus
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
              className={`w-full rounded-lg border px-3 py-2 outline-none ${
                errors.title
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-violet-500"
              }`}
              placeholder="Görev başlığını girin"
            />

            {errors.title && (
              <p id="title-error" className="mt-1 text-xs text-red-600">
                {errors.title}
              </p>
            )}
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
              rows={3}
              maxLength={510}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
              className={`w-full resize-none rounded-lg border px-3 py-2 outline-none ${
                errors.description
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-violet-500"
              }`}
              placeholder="Görev açıklamasını girin"
            />

            {errors.description && (
              <p id="description-error" className="mt-1 text-xs text-red-600">
                {errors.description}
              </p>
            )}
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
              maxLength={60}
              aria-invalid={Boolean(errors.assignee)}
              aria-describedby={errors.assignee ? "assignee-error" : undefined}
              className={`w-full rounded-lg border px-3 py-2 outline-none ${
                errors.assignee
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-violet-500"
              }`}
              placeholder="Sorumlu kişinin adı"
            />

            {errors.assignee && (
              <p id="assignee-error" className="mt-1 text-xs text-red-600">
                {errors.assignee}
              </p>
            )}
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
                aria-invalid={Boolean(errors.priority)}
                className={`w-full rounded-lg border px-3 py-2 outline-none ${
                  errors.priority
                    ? "border-red-500"
                    : "border-gray-300 focus:border-violet-500"
                }`}
              >
                <option value="low">Düşük</option>
                <option value="medium">Orta</option>
                <option value="high">Yüksek</option>
              </select>

              {errors.priority && (
                <p className="mt-1 text-xs text-red-600">{errors.priority}</p>
              )}
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
                aria-invalid={Boolean(errors.status)}
                className={`w-full rounded-lg border px-3 py-2 outline-none ${
                  errors.status
                    ? "border-red-500"
                    : "border-gray-300 focus:border-violet-500"
                }`}
              >
                <option value="pending">Bekliyor</option>
                <option value="completed">Tamamlandı</option>
              </select>

              {errors.status && (
                <p className="mt-1 text-xs text-red-600">{errors.status}</p>
              )}
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
              {task ? "Değişiklikleri Kaydet" : "Görevi Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
