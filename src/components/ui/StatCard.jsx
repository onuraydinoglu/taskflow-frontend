function StatCard({ title, value, color }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className={`mt-3 text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default StatCard;
