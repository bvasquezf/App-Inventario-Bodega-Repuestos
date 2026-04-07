function Toast({ message, type = "success", onClose }) {
  if (!message) return null;

  const baseStyles =
    "fixed right-4 top-4 z-50 rounded-xl px-4 py-3 shadow-lg text-white";

  const typeStyles =
    type === "error"
      ? "bg-red-600"
      : type === "warning"
      ? "bg-yellow-500"
      : "bg-green-600";

  return (
    <div className={`${baseStyles} ${typeStyles}`}>
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="rounded px-2 py-1 text-sm font-bold hover:bg-white/20"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;