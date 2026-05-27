import { useSelector } from "react-redux";

const InfoList = ({ onEdit }) => {
  const info = useSelector((state) => state.info);

  const Field = ({ label, value }) => (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs md:text-sm font-display font-700 tracking-widest text-[var(--amber)] uppercase">{label}</span>
      <span className="text-[var(--text-primary)] font-500 text-sm md:text-base">{value || <span className="text-[var(--text-muted)] italic">—</span>}</span>
    </div>
  );

  return (
    <div className="bg-[var(--carbon-2)] border border-[var(--border-subtle)] rounded-xl overflow-hidden md:min-w-[360px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--steel)]">
        <h3 className="font-display font-700 text-base tracking-wider uppercase text-[var(--text-secondary)]">
          Cliente
        </h3>
        <button
          onClick={onEdit}
          className="text-xs font-display font-700 tracking-wider uppercase bg-[var(--amber)] text-[var(--carbon)] px-3 py-1.5 rounded-md hover:bg-[var(--amber-dark)] transition-all cursor-pointer"
        >
          Editar
        </button>
      </div>
      <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-3">
        <Field label="Fecha" value={info.fecha} />
        <Field label="Kilometraje" value={info.kilometraje} />
        <div className="col-span-2">
          <Field label="Cliente" value={info.cliente} />
        </div>
        <div className="col-span-2">
          <Field label="Dirección" value={info.direccion} />
        </div>
        <Field label="Vehículo" value={info.vehiculo} />
        <Field label="Patente" value={info.patente} />
      </div>
    </div>
  );
};

export default InfoList;
