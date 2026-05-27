import { guardarInfo } from "../features/infoSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const InfoForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    fecha: "",
    cliente: "",
    direccion: "",
    vehiculo: "",
    patente: "",
    kilometraje: "",
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(guardarInfo(info));
    onClose();
  };

  if (!isOpen) return null;

  const fieldClass =
    "w-full bg-transparent border-b border-[var(--border)] text-[var(--text-primary)] py-2 focus:outline-none focus:border-[var(--amber)] transition-colors placeholder:text-[var(--text-muted)]";
  const labelClass = "text-[var(--amber)] font-display font-600 tracking-wide text-sm uppercase whitespace-nowrap";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="animate-slideup bg-[var(--carbon-2)] border border-[var(--border)] rounded-xl w-full max-w-md shadow-2xl">
        <div className="border-b border-[var(--border-subtle)] px-6 py-4 flex items-center justify-between">
          <h2 className="font-display font-700 text-xl tracking-wider text-[var(--amber)] uppercase">
            Información del cliente
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Fecha</label>
              <input
                type="date"
                name="fecha"
                onChange={handleChange}
                value={info.fecha}
                className={fieldClass + " [color-scheme:dark]"}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Kilometraje</label>
              <input
                type="text"
                name="kilometraje"
                placeholder="ej. 85.000 km"
                onChange={handleChange}
                value={info.kilometraje}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Cliente</label>
            <input
              type="text"
              name="cliente"
              placeholder="Nombre completo"
              onChange={handleChange}
              value={info.cliente}
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Dirección del cliente"
              onChange={handleChange}
              value={info.direccion}
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Vehículo</label>
              <input
                type="text"
                name="vehiculo"
                placeholder="Marca y modelo"
                onChange={handleChange}
                value={info.vehiculo}
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Patente</label>
              <input
                type="text"
                name="patente"
                placeholder="ABC 123"
                onChange={handleChange}
                value={info.patente}
                className={fieldClass + " uppercase"}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-[var(--border)] text-[var(--text-secondary)] rounded-lg font-600 hover:bg-[var(--steel)] transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[var(--amber)] text-[var(--carbon)] rounded-lg font-700 font-display tracking-wide uppercase hover:bg-[var(--amber-dark)] transition-all cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoForm;
