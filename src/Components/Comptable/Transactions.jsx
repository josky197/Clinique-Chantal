import { useState } from "react";
import {
  Search, CheckCircle2, Clock, Download,
  ChevronLeft, ChevronRight, TrendingUp,
} from "lucide-react";

const MOCK_TRANSACTIONS = [
  { id: "TRX-2025-0041", patient: "Alain Dupont",     dossier: "PAT-2025-0012", service: "Consultation générale", medecin: "Dr. Moore",  montant: 15000,  mode: "Espèces",      date: "2025-05-01", heure: "14 h 30", statut: "Payée",      receptionniste: "M. Kouassi" },
  { id: "TRX-2025-0040", patient: "Béatrice Martin",  dossier: "PAT-2025-0013", service: "Cardiologie",           medecin: "Dr. Dupont", montant: 45000,  mode: "Assurance",    date: "2025-05-01", heure: "11 h 00", statut: "Payée",      receptionniste: "M. Kouassi" },
  { id: "TRX-2025-0039", patient: "Charles Lefebvre", dossier: "PAT-2025-0014", service: "Consultation générale", medecin: "Dr. Moore",  montant: 15000,  mode: "Carte",        date: "2025-05-01", heure: "09 h 30", statut: "Payée",      receptionniste: "M. Kouassi" },
  { id: "TRX-2025-0038", patient: "Diane Petit",      dossier: "PAT-2025-0015", service: "Pédiatrie",             medecin: "Dr. Vance",  montant: 20000,  mode: "Mobile Money", date: "2025-04-30", heure: "16 h 45", statut: "Payée",      receptionniste: "Mme Brou" },
  { id: "TRX-2025-0037", patient: "Édouard Moreau",   dossier: "PAT-2025-0016", service: "Neurologie",            medecin: "Dr. Smith",  montant: 60000,  mode: "—",            date: "2025-04-30", heure: "15 h 00", statut: "En attente", receptionniste: "Mme Brou" },
  { id: "TRX-2025-0036", patient: "Sophie Laurent",   dossier: "PAT-2025-0017", service: "Gynécologie",           medecin: "Dr. Vance",  montant: 25000,  mode: "Espèces",      date: "2025-04-29", heure: "10 h 15", statut: "Payée",      receptionniste: "M. Kouassi" },
  { id: "TRX-2025-0035", patient: "Marc Bernard",     dossier: "PAT-2025-0018", service: "Cardiologie",           medecin: "Dr. Dupont", montant: 45000,  mode: "Assurance",    date: "2025-04-29", heure: "09 h 00", statut: "Payée",      receptionniste: "M. Kouassi" },
  { id: "TRX-2025-0034", patient: "Claire Rousseau",  dossier: "PAT-2025-0019", service: "Dermatologie",          medecin: "Dr. Moore",  montant: 18000,  mode: "Carte",        date: "2025-04-28", heure: "14 h 00", statut: "En attente", receptionniste: "Mme Brou" },
];

const MODES = ["Tous les modes", "Espèces", "Carte", "Assurance", "Mobile Money"];
const ITEMS_PAR_PAGE = 6;
const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";

const STATUT_STYLE = {
  "Payée":      "bg-green-50 text-green-700",
  "En attente": "bg-yellow-50 text-yellow-700",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Transactions() {
  const [search, setSearch]       = useState("");
  const [statut, setStatut]       = useState("Tous");
  const [mode, setMode]           = useState("Tous les modes");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin]     = useState("");
  const [page, setPage]           = useState(1);

  const filtered = MOCK_TRANSACTIONS.filter((t) => {
    const matchSearch = t.patient.toLowerCase().includes(search.toLowerCase())
                     || t.id.toLowerCase().includes(search.toLowerCase())
                     || t.dossier.toLowerCase().includes(search.toLowerCase());
    const matchStatut = statut === "Tous" || t.statut === statut;
    const matchMode   = mode === "Tous les modes" || t.mode === mode;
    const matchDate   = (!dateDebut || t.date >= dateDebut) && (!dateFin || t.date <= dateFin);
    return matchSearch && matchStatut && matchMode && matchDate;
  });

  const totalPages     = Math.max(1, Math.ceil(filtered.length / ITEMS_PAR_PAGE));
  const paginated      = filtered.slice((page - 1) * ITEMS_PAR_PAGE, page * ITEMS_PAR_PAGE);
  const totalFiltrees  = filtered.reduce((sum, t) => sum + (t.statut === "Payée" ? t.montant : 0), 0);

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Registre des transactions</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            {filtered.length} transaction{filtered.length > 1 ? "s" : ""} — Total encaissé :{" "}
            <span className="font-black text-green-600">{fmt(totalFiltrees)}</span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-2xl font-semibold text-sm hover:bg-slate-200 transition">
          <Download size={16} /> Exporter CSV
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Patient, numéro de transaction, dossier…"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all" />
          </div>
          <select value={mode} onChange={(e) => { setMode(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 transition-all min-w-44">
            {MODES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <input type="date" value={dateDebut} onChange={(e) => { setDateDebut(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 transition-all" />
          <input type="date" value={dateFin} onChange={(e) => { setDateFin(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 transition-all" />
        </div>

        <div className="flex gap-2">
          {["Tous", "Payée", "En attente"].map((s) => (
            <button key={s} onClick={() => { setStatut(s); setPage(1); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                statut === s
                  ? "bg-[#0062a2] text-white border-[#0062a2]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#0062a2]/40"
              }`}>
              {s}
              <span className="ml-1.5 opacity-60">
                ({s === "Tous" ? MOCK_TRANSACTIONS.length : MOCK_TRANSACTIONS.filter((t) => t.statut === s).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <Th>Référence</Th>
              <Th>Patient</Th>
              <Th>Service</Th>
              <Th>Date</Th>
              <Th>Mode</Th>
              <Th>Montant</Th>
              <Th>Statut</Th>
              <Th>Encaissé par</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-16 text-center text-slate-400">
                  <TrendingUp size={32} className="mx-auto mb-3 opacity-20" />
                  <p className="font-medium">Aucune transaction trouvée</p>
                </td>
              </tr>
            ) : paginated.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-[11px] font-bold text-[#0062a2] bg-blue-50 px-2 py-1 rounded-lg">
                    {t.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800 text-sm">{t.patient}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{t.dossier}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-700">{t.service}</p>
                  <p className="text-xs text-slate-400">{t.medecin}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs font-bold text-slate-700">{t.date}</p>
                  <p className="text-xs text-slate-400">{t.heure}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                    {t.mode === "—" ? "—" : t.mode}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-black ${t.statut === "Payée" ? "text-slate-800" : "text-yellow-600"}`}>
                    {fmt(t.montant)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${STATUT_STYLE[t.statut]}`}>
                    {t.statut}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 font-medium">{t.receptionniste}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {filtered.length > ITEMS_PAR_PAGE && (
          <div className="px-6 py-4 border-t border-slate-50 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs text-slate-400 font-medium">
              {(page - 1) * ITEMS_PAR_PAGE + 1}–{Math.min(page * ITEMS_PAR_PAGE, filtered.length)} sur {filtered.length}
            </span>
            <div className="flex items-center gap-2">
              <PageBtn icon={<ChevronLeft size={14} />}  onClick={() => setPage((p) => Math.max(1, p - 1))}          disabled={page === 1} />
              {Array.from({ length: totalPages }, (_, i) => (
                <PageBtn key={i} label={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)} />
              ))}
              <PageBtn icon={<ChevronRight size={14} />} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const Th = ({ children }) => (
  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
    {children}
  </th>
);

const PageBtn = ({ label, icon, active, disabled, onClick }) => (
  <button onClick={onClick} disabled={disabled}
    className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition ${
      active   ? "bg-[#0062a2] text-white shadow-sm" :
      disabled ? "text-slate-200 cursor-not-allowed" :
                 "text-slate-500 hover:bg-white hover:text-[#0062a2] border border-transparent hover:border-slate-200"
    }`}>
    {icon ?? label}
  </button>
);
