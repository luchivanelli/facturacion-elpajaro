import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { editItem } from "../features/itemsSlice";

const EditItem = ({ itemId, onClose }) => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [item, setItem] = useState({ cantidad: "", detalle: "", precio_unitario: "", total: "" });
  const [error, setError] = useState(false);

  useEffect(() => {
    const found = items.find((i) => i.id === itemId);
    if (found) setItem(found);
  }, [itemId, items]);

  const handleChange = (e) => {
    setItem((prev) => {
      const next = { ...prev, [e.target.name]: e.target.value };
      if (next.cantidad && next.precio_unitario) {
        next.total = (parseInt(next.cantidad) * parseInt(next.precio_unitario)).toString();
      }
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.cantidad && item.precio_unitario && item.detalle && item.total) {
      dispatch(editItem(item));
      onClose();
    } else {
      setError(true);
    }
  };

  const inputClass =
    "w-full md:text-base md:bg-transparent border-b border-[var(--border)] text-[var(--text-primary)] py-2 focus:outline-none focus:border-[var(--amber)] transition-colors placeholder:text-[var(--text-muted)] text-sm";
  const labelClass = "text-[10px] md:text-sm font-display font-700 tracking-widest text-[var(--amber)] uppercase";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="animate-slideup bg-[var(--carbon-2)] border border-[var(--border)] rounded-xl w-full max-w-md shadow-2xl">
        <div className="border-b border-[var(--border-subtle)] px-6 py-4 flex items-center justify-between">
          <h2 className="font-display font-700 text-xl tracking-wider text-[var(--amber)] uppercase">
            Editar ítem
          </h2>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-white transition-colors text-2xl leading-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Cantidad</label>
              <input type="number" name="cantidad" onChange={handleChange} value={item.cantidad || ""} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Precio unitario</label>
              <div className="flex items-center gap-1">
                <span className="text-[var(--amber)] font-700 text-sm">$</span>
                <input type="number" name="precio_unitario" onChange={handleChange} value={item.precio_unitario || ""} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Detalle</label>
            <input type="text" name="detalle" onChange={handleChange} value={item.detalle || ""} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Total</label>
            <div className="flex items-center gap-1">
              <span className="text-[var(--amber)] font-700 text-sm">$</span>
              <input type="number" name="total" onChange={handleChange} value={item.total || ""} className={inputClass + " font-700"} />
            </div>
          </div>

          {error && <p className="text-[var(--red)] text-xs">⚠ Completá todos los campos.</p>}

          <div className="flex gap-3 mt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-[var(--border)] text-[var(--text-secondary)] rounded-lg font-600 hover:bg-[var(--steel)] transition-all cursor-pointer">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-2.5 bg-[var(--amber)] text-[var(--carbon)] rounded-lg font-700 font-display tracking-wide uppercase hover:bg-[var(--amber-dark)] transition-all cursor-pointer">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
