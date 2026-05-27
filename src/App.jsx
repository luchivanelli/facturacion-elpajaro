import logo from "./assets/logo.png";
import InfoForm from "./components/InfoForm";
import InfoList from "./components/InfoList";
import ItemsList from "./components/ItemsList";
import ItemsForm from "./components/ItemsForm";
import generateInvoice from "./components/generateInvoice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { guardarInfoObservaciones, guardarEntrega } from "./features/infoSlice";

const WrenchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const App = () => {
  const info = useSelector((state) => state.info);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const [showInfoForm, setShowInfoForm] = useState(false);
  const [observaciones, setObservaciones] = useState("");
  const [entrega, setEntrega] = useState("");

  const handleObservaciones = (e) => {
    setObservaciones(e.target.value);
    dispatch(guardarInfoObservaciones(e.target.value));
  };

  const handleEntrega = (val) => {
    setEntrega(val);
    dispatch(guardarEntrega(val));
  };

  const handleGenerarFactura = () => {
    generateInvoice(info, items);
  };

  return (
    <div className="min-h-screen bg-[var(--carbon)]">
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-[var(--border-subtle)] bg-[var(--carbon-2)]">
        <div className="max-w-[1000px] mx-auto px-4 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[var(--amber)] flex items-center justify-center text-[var(--carbon)]">
              <WrenchIcon />
            </div>
            <div>
              <p className="font-display font-800 text-sm md:text-base tracking-wider uppercase text-[var(--text-primary)] leading-tight">
                El Pájaro
              </p>
              <p className="text-[11px] md:text-xs font-display tracking-widest text-[var(--text-muted)] uppercase">
                Servicio Automotriz
              </p>
            </div>
          </div>
          <img src={logo} alt="logo" className="h-16 md:h-20 w-auto opacity-90" />
        </div>
      </header>

      {/* Divider accent */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[var(--amber)] to-transparent opacity-30" />

      {/* Main content */}
      <main className="relative z-10 max-w-[1000px] mx-auto px-4 py-6">

        {/* Client info + Items form */}
        <div className="md:flex space-y-4 md:space-y-0 gap-5 items-stretch">
          <InfoList onEdit={() => setShowInfoForm(true)} />
          <ItemsForm />
        </div>

        {/* Items table */}
        <ItemsList entrega={entrega} onEntregaChange={handleEntrega} />

        {/* Observaciones */}
        <div className="mt-4 bg-[var(--carbon-2)] border border-[var(--border-subtle)] rounded-xl px-4 py-4">
          <label className="text-[10px] md:text-sm font-display font-700 tracking-widest text-[var(--amber)] uppercase block mb-2">
            Observaciones
          </label>
          <input
            type="text"
            value={observaciones}
            onChange={handleObservaciones}
            placeholder="Notas adicionales para incluir en la factura..."
            className="w-full bg-transparent border-b border-[var(--border)] text-[var(--text-primary)] py-2 focus:outline-none focus:border-[var(--amber)] transition-colors placeholder:text-[var(--text-muted)] text-sm md:text-base"
          />
        </div>

        {/* Generate button */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleGenerarFactura}
            className="flex items-center gap-2 px-8 py-3 bg-[var(--amber)] text-[var(--carbon)] font-display font-800 tracking-wider uppercase rounded-xl hover:bg-[var(--amber-dark)] active:scale-95 transition-all cursor-pointer shadow-lg shadow-[var(--amber)]/20"
          >
            <PdfIcon />
            Generar factura
          </button>
        </div>
      </main>

      {/* Info form modal */}
      <InfoForm isOpen={showInfoForm} onClose={() => setShowInfoForm(false)} />
    </div>
  );
};

export default App;
