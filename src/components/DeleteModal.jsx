import { deleteItem } from "../features/itemsSlice";
import { useDispatch } from "react-redux";

const DeleteModal = ({ itemId, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteItem(itemId));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="animate-slideup bg-[var(--carbon-2)] border border-[var(--border)] rounded-xl w-full max-w-sm shadow-2xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--red)]/10 border border-[var(--red)]/30 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </div>
        <h3 className="font-display font-700 text-lg text-[var(--text-primary)] mb-2 tracking-wide">
          Eliminar ítem
        </h3>
        <p className="text-[var(--text-secondary)] text-sm mb-6">
          ¿Estás seguro de que querés eliminar este elemento? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-[var(--border)] text-[var(--text-secondary)] rounded-lg font-600 hover:bg-[var(--steel)] transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 py-2.5 bg-[var(--red)] text-white rounded-lg font-700 font-display tracking-wide uppercase hover:opacity-90 transition-all cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
