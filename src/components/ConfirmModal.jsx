// src/components/ConfirmModal.jsx
export default function ConfirmModal({ isOpen, title, message, onConfirm, onLoss, onCancel }) {
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
          <p className="text-gray-300 text-sm mb-3">{message}</p>
          
          {/* Warning Box */}
          <div className="bg-yellow-950/30 border border-yellow-900/50 rounded-lg p-2.5 mb-3">
            <div className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <p className="text-xs font-semibold text-yellow-500 mb-0.5">Pilih Status Akun</p>
                <p className="text-xs text-yellow-200/80">• Terjual = Profit masuk</p>
                <p className="text-xs text-yellow-200/80">• Rugi (HB) = Minus modal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-zinc-800 space-y-2">
          {/* Tombol Rugi (HB/Hackback) */}
          <button
            onClick={onLoss}
            className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Rugi (HB/Hackback)
          </button>

          <div className="flex gap-2">
            {/* Tombol Batal */}
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 border border-zinc-800 text-gray-300 text-sm rounded-lg hover:bg-zinc-800 transition"
            >
              Batal
            </button>
            
            {/* Tombol Terjual */}
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Terjual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}