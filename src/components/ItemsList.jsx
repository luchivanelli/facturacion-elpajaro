import { useSelector } from "react-redux";
import { useState } from "react";
import EditItem from "./EditItem";
import DeleteModal from "./DeleteModal";

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
);

const ItemsList = ({ entrega, onEntregaChange }) => {
  const items = useSelector((state) => state.items);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  let total = 0;
  items.forEach((item) => { total += parseInt(item.total) || 0; });
  const entregaNum = parseInt(entrega) || 0;
  const saldo = total - entregaNum;

  return (
    <div className="mt-4 max-w-[1000px] mx-auto">
      <div className="bg-[var(--carbon-2)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--steel)] text-[var(--text-secondary)]">
                <th className="font-display font-700 tracking-widest text-[10px] md:text-sm uppercase py-3 px-3 text-left">Cant.</th>
                <th className="font-display font-700 tracking-widest text-[10px] md:text-sm uppercase py-3 px-3 text-left">Detalle</th>
                <th className="font-display font-700 tracking-widest text-[10px] md:text-sm uppercase py-3 px-3 text-right">Precio</th>
                <th className="font-display font-700 tracking-widest text-[10px] md:text-sm uppercase py-3 px-3 text-right">Total</th>
                <th className="py-3 px-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[var(--text-muted)] italic text-sm">
                    No hay ítems agregados
                  </td>
                </tr>
              ) : (
                items.map((item, i) => (
                  <tr
                    key={item.id}
                    className={`border-t border-[var(--border-subtle)] ${i % 2 === 0 ? "" : "bg-[var(--steel)]/30"} hover:bg-[var(--amber-glow)] transition-colors`}
                  >
                    <td className="py-2.5 px-3 text-[var(--text-secondary)] md:text-base">{item.cantidad}</td>
                    <td className="py-2.5 px-3 text-[var(--text-primary)] md:text-base">{item.detalle}</td>
                    <td className="py-2.5 px-3 text-right text-[var(--text-secondary)] md:text-base">
                      <span className="whitespace-nowrap"><span className="text-[var(--amber)] text-xs mr-0.5">$</span>{'\u00A0'}{item.precio_unitario}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-600 md:text-base">
                      <span className="whitespace-nowrap"><span className="text-[var(--amber)] text-xs mr-0.5">$</span>{'\u00A0'}{item.total}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditId(item.id)}
                          className="text-[var(--text-muted)] hover:text-[var(--amber)] transition-colors cursor-pointer"
                          title="Editar"
                        >
                          <PencilIcon />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="text-[var(--text-muted)] hover:text-[var(--red)] transition-colors cursor-pointer"
                          title="Eliminar"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer totales */}
        <div className="border-t border-[var(--border)] bg-[var(--carbon-3)] px-4 py-4">
          <div className="flex flex-col gap-3 max-w-xs ml-auto">
            {/* Total bruto */}
            <div className="flex items-center justify-between text-sm md:text-base">
              <span className="font-display font-700 tracking-wider uppercase text-[var(--text-secondary)]">
                Total trabajos
              </span>
              <span className="font-700 text-[var(--text-primary)] md:text-lg">$ {total}</span>
            </div>

            {/* Campo entrega */}
            <div className="flex items-center justify-between gap-3">
              <label className="font-display font-700 tracking-wider uppercase text-[var(--text-secondary)] text-sm md:text-base whitespace-nowrap">
                Entrega a cuenta
              </label>
              <div className="flex items-center gap-1 border-b border-[var(--border)] pb-1">
                <span className="text-[var(--amber)] font-700 text-sm md:text-base">$</span>
                <input
                  type="number"
                  placeholder="0"
                  value={entrega}
                  onChange={(e) => onEntregaChange(e.target.value)}
                  className="w-24 bg-transparent text-right text-[var(--text-primary)] focus:outline-none font-600 text-sm md:text-lg placeholder:text-[var(--text-muted)]"
                  min="0"
                />
              </div>
            </div>

            {/* Saldo */}
            {entregaNum > 0 && (
              <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
                <span className="font-display font-800 tracking-wider uppercase text-[var(--amber)]">
                  Saldo
                </span>
                <span className={`font-800 text-lg md:text-xl ${saldo < 0 ? "text-[var(--red)]" : "text-[var(--amber)]"}`}>
                  $ {saldo}
                </span>
              </div>
            )}

            {entregaNum === 0 && (
              <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
                <span className="font-display font-800 tracking-wider uppercase text-[var(--amber)]">
                  TOTAL
                </span>
                <span className="font-800 text-lg md:text-xl text-[var(--amber)]">$ {total}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {editId && <EditItem itemId={editId} onClose={() => setEditId(null)} />}
      {deleteId && <DeleteModal itemId={deleteId} onClose={() => setDeleteId(null)} />}
    </div>
  );
};

export default ItemsList;
