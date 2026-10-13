import { useEffect } from "react";
import { Check, X } from "lucide-react";

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
        <Check size={20} />
      </div>

      <p className="flex-1 text-sm font-medium text-gray-800">{message}</p>

      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-700"
        aria-label="Bildirimi kapat"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default Toast;
