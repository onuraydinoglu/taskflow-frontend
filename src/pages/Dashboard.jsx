import { Link } from "react-router-dom";
import StatCard from "../components/ui/StatCard";

function Dashboard({ tasks }) {
  const total = tasks.length;
  const pending = tasks.filter((task) => task.status === "pending").length;
  const completed = tasks.filter((task) => task.status === "completed").length;

  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Genel Bakış</h1>
        <p className="mt-1 text-sm text-gray-500">
          Görevlerin güncel durumunu buradan takip edebilirsin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Toplam Görev" value={total} color="text-gray-900" />
        <StatCard
          title="Bekleyen Görev"
          value={pending}
          color="text-amber-600"
        />
        <StatCard
          title="Tamamlanan Görev"
          value={completed}
          color="text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Görev Durumu</h2>

          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-gray-500">Tamamlanma Oranı</span>
            <span className="font-semibold">%{completionRate}</span>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-violet-600"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Bekleyen</span>
              <span className="font-medium">{pending}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Tamamlanan</span>
              <span className="font-medium">{completed}</span>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Son Eklenen Görevler
            </h2>

            <Link
              to="/tasks"
              className="shrink-0 text-sm font-medium text-violet-600 hover:text-violet-700"
            >
              Tümünü Gör
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {task.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{task.assignee}</p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    task.status === "completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {task.status === "completed" ? "Tamamlandı" : "Bekliyor"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
