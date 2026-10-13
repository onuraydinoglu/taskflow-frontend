import { useEffect } from "react";

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      role="status"
      className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <p className="flex-1 text-sm font-medium text-gray-800">{message}</p>

      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-700"
        aria-label="Bildirimi kapat"
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;
