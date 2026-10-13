import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/tasks": "Görevler",
};

function Navbar({ onMenuOpen }) {
  const { pathname } = useLocation();

  return (
    <header className="flex h-18 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-6">
      <button
        type="button"
        onClick={onMenuOpen}
        className="text-xl text-gray-600 lg:hidden"
        aria-label="Menüyü aç"
      >
        ☰
      </button>

      <h2 className="text-xl font-semibold text-gray-800">
        {pageTitles[pathname] || "TaskFlow"}
      </h2>
    </header>
  );
}

export default Navbar;
