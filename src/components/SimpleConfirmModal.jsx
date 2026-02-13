// src/components/SimpleConfirmModal.jsx
export default function SimpleConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div 
        className="bg-zinc-900 rounded-xl w-full max-w-sm border border-red-900/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-zinc-800">
          <h2 className="text-sm font-bold text-white">{title}</h2>
        </div>

        <div className="p-3">
          <p className="text-gray-300 text-sm">{message}</p>
        </div>

        <div className="p-3 border-t border-zinc-800 flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 border border-zinc-800 text-gray-300 text-sm rounded-lg hover:bg-zinc-800 transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}