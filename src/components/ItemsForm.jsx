import { useDispatch } from "react-redux";
import { useState } from "react";
import { addItem } from "../features/itemsSlice";
import { v4 as uuid } from "uuid";

const ItemsForm = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState({ cantidad: "", detalle: "", precio_unitario: "", total: "" });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setItem((prev) => {
      const next = { ...prev, [e.target.name]: e.target.value };
      if (next.cantidad !== "" && next.precio_unitario !== "") {
        next.total = (parseInt(next.cantidad) * parseInt(next.precio_unitario)).toString();
      } else {
        next.total = "";
      }
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.cantidad && item.precio_unitario && item.detalle && item.total) {
      setError(false);
      dispatch(addItem({ ...item, id: uuid() }));
      setItem({ cantidad: "", detalle: "", precio_unitario: "", total: "" });
    } else {
      setError(true);
    }
  };

  const inputClass =
    "w-full pl-1 bg-transparent border-b border-[var(--border)] text-[var(--text-primary)] py-2 focus:outline-none focus:border-[var(--amber)] transition-colors placeholder:text-[var(--text-muted)] text-sm md:text-base";
  const labelClass = "text-xs md:text-sm font-display font-700 tracking-widest text-[var(--amber)] uppercase";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--carbon-2)] border border-[var(--border-subtle)] rounded-xl p-4 md:flex-1"
    >
      <h3 className="font-display font-700 text-base tracking-wider uppercase text-[var(--text-secondary)] mb-4">
        Agregar ítem
      </h3>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Cantidad</label>
            <input
              type="number"
              name="cantidad"
              placeholder="0"
              onChange={handleChange}
              value={item.cantidad}
              className={inputClass}
              min="1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Precio unitario</label>
            <div className="flex items-center gap-1">
              <span className="text-[var(--amber)] font-700 text-sm">$</span>
              <input
                type="number"
                name="precio_unitario"
                placeholder="0"
                onChange={handleChange}
                value={item.precio_unitario}
                className={inputClass}
                min="0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Total</label>
            <div className="flex items-center gap-1">
              <span className="text-[var(--amber)] font-700 text-sm">$</span>
              <input
              type="number"
              name="total"
              placeholder="0"
              onChange={handleChange}
              value={item.total}
              className={inputClass + " font-700"}
              readOnly={item.cantidad !== "" && item.precio_unitario !== ""}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Detalle</label>
          <input
            type="text"
            name="detalle"
            placeholder="Descripción del trabajo o repuesto"
            onChange={handleChange}
            value={item.detalle}
            className={inputClass}
          />
        </div>

        {error && (
          <p className="text-[var(--red)] text-xs font-500">
            ⚠ Completá todos los campos antes de agregar.
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-3 py-2.5 bg-[var(--steel-light)] text-[var(--text-primary)] rounded-lg font-display font-700 tracking-wider uppercase text-sm border border-[var(--border)] hover:bg-[var(--amber)] hover:text-[var(--carbon)] hover:border-[var(--amber)] transition-all cursor-pointer"
        >
          + Agregar a la lista
        </button>
      </div>
    </form>
  );
};

export default ItemsForm;
