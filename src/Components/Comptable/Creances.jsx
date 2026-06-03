import { useState } from "react";
import {
  Search, AlertTriangle, CheckCircle2,
  Clock, ChevronLeft, ChevronRight,
  Phone, Mail, X, Save,
} from "lucide-react";

const MOCK_CREANCES = [
  { id: 1,  ref: "FAC-2026-0031", patient: "Édouard Moreau",   dossier: "PAT-2025-0016", service: "Neurologie",  montant: 60000, dateEcheance: "2026-04-15", type: "Patient",   statut: "En retard",  contact: "07 00 11 22 33", relances: 2 },
  { id: 2,  ref: "FAC-2026-0028", patient: "Claire Rousseau",  dossier: "PAT-2025-0019", service: "Dermatologie",montant: 18000, dateEcheance: "2026-04-20", type: "Patient",   statut: "En retard",  contact: "07 00 44 55 66", relances: 1 },
  { id: 3,  ref: "FAC-2026-0025", patient: "Jean-Paul Konan",  dossier: "PAT-2025-0021", service: "Cardiologie", montant: 85000, dateEcheance: "2026-04-30", type: "Assurance", statut: "En cours",   contact: "MUGEFCI — 20 30 40 50", relances: 0, assurance: "MUGEFCI" },
  { id: 4,  ref: "FAC-2026-0019", patient: "Aya Diallo",       dossier: "PAT-2025-0022", service: "Pédiatrie",   montant: 22000, dateEcheance: "2026-03-31", type: "Assurance", statut: "En retard",  contact: "CNPS — 20 21 22 23", relances: 3, assurance: "CNPS" },
  { id: 5,  ref: "FAC-2026-0015", patient: "Marc Gbagbo",      dossier: "PAT-2025-0023", service: "Consultation",montant: 15000, dateEcheance: "2026-05-10", type: "Patient",   statut: "En attente", contact: "05 00 77 88 99", relances: 0 },
  { id: 6,  ref: "FAC-2026-0011", patient: "Fatou Traoré",     dossier: "PAT-2025-0024", service: "Gynécologie", montant: 35000, dateEcheance: "2026-03-15", type: "Patient",   statut: "Irrécouvrable", contact: "—", relances: 5 },
];

const STATUT_STYLE = {
  "En attente":    { badge: "bg-blue-50 text-[#0062a2]",   barre: "border-l-[#0062a2]" },
  "En cours":      { badge: "bg-yellow-50 text-yellow-700", barre: "border-l-yellow-400" },
  "En retard":     { badge: "bg-red-50 text-red-600",       barre: "border-l-red-500" },
  "Irrécouvrable": { badge: "bg-slate-100 text-slate-500",  barre: "border-l-slate-300" },
};

const ITEMS_PAR_PAGE = 5;
const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";

// ─────────────────────────────────────────────────────────────────────────────

export default function Creances() {
  const [creances, setCreances]     = useState(MOCK_CREANCES);
  const [search, setSearch]         = useState("");
  const [statutFiltre, setStatut]   = useState("Tous");
  const [typeFiltre, setType]       = useState("Tous");
  const [page, setPage]             = useState(1);
  const [modalRelance, setModalRelance] = useState(null);

  const filtered = creances.filter((c) => {
    const matchSearch  = c.patient.toLowerCase().includes(search.toLowerCase())
                      || c.ref.toLowerCase().includes(search.toLowerCase());
    const matchStatut  = statutFiltre === "Tous" || c.statut === statutFiltre;
    const matchType    = typeFiltre === "Tous" || c.type === typeFiltre;
    return matchSearch && matchStatut && matchType;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PAR_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PAR_PAGE, page * ITEMS_PAR_PAGE);

  const totalEnAttente   = creances.filter((c) => c.statut !== "Irrécouvrable").reduce((s, c) => s + c.montant, 0);
  const totalEnRetard    = creances.filter((c) => c.statut === "En retard").reduce((s, c) => s + c.montant, 0);
  const nbIrrecouvrable  = creances.filter((c) => c.statut === "Irrécouvrable").length;

  const marquerSolde = (id) =>
    setCreances((prev) => prev.filter((c) => c.id !== id));

  const incrementerRelance = (id) =>
    setCreances((prev) => prev.map((c) =>
      c.id === id ? { ...c, relances: c.relances + 1, statut: c.statut === "En attente" ? "En cours" : c.statut } : c
    ));

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Suivi des créances</h1>
        <p className="text-slate-500 mt-1 font-medium text-sm">
          Factures impayées — patients et assurances
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCreance
          label="Total à recouvrer"
          valeur={fmt(totalEnAttente)}
          icone={<Clock size={20} />}
          bg="bg-blue-50 text-[#0062a2]"
        />
        <KpiCreance
          label="En retard"
          valeur={fmt(totalEnRetard)}
          icone={<AlertTriangle size={20} />}
          bg="bg-red-50 text-red-600"
          urgent
        />
        <KpiCreance
          label="Irrécouvrables"
          valeur={`${nbIrrecouvrable} dossier${nbIrrecouvrable > 1 ? "s" : ""}`}
          icone={<X size={20} />}
          bg="bg-slate-100 text-slate-500"
        />
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Patient, référence de facture…"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all" />
          </div>
          <select value={typeFiltre} onChange={(e) => { setType(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 transition-all min-w-36">
            <option value="Tous">Tous types</option>
            <option value="Patient">Patient</option>
            <option value="Assurance">Assurance</option>
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Tous", "En attente", "En cours", "En retard", "Irrécouvrable"].map((s) => (
            <FiltreBtn key={s} label={s} actif={statutFiltre === s}
              onClick={() => { setStatut(s); setPage(1); }} />
          ))}
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {paginated.length === 0 ? (
          <div className="bg-white rounded-4xl border border-slate-100 p-16 text-center text-slate-400">
            <CheckCircle2 size={36} className="mx-auto mb-3 opacity-20" />
            <p className="font-medium">Aucune créance trouvée</p>
          </div>
        ) : paginated.map((c) => {
          const style = STATUT_STYLE[c.statut] ?? STATUT_STYLE["En attente"];
          const joursRetard = Math.max(0, Math.floor((new Date() - new Date(c.dateEcheance)) / 86400000));
          return (
            <div key={c.id}
              className={`bg-white rounded-4xl border border-slate-100 border-l-4 shadow-sm p-5 ${style.barre}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ${
                    c.type === "Assurance" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-[#0062a2]"
                  }`}>
                    {c.patient.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>

                  {/* Infos */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-800">{c.patient}</p>
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                        {c.ref}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg ${
                        c.type === "Assurance" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-[#0062a2]"
                      }`}>
                        {c.type}
                        {c.assurance ? ` — ${c.assurance}` : ""}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1">
                      {c.service} — Échéance : <strong>{c.dateEcheance}</strong>
                      {joursRetard > 0 && c.statut !== "Irrécouvrable" && (
                        <span className="text-red-500 font-bold ml-2">({joursRetard} jour{joursRetard > 1 ? "s" : ""} de retard)</span>
                      )}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Phone size={11} /> {c.contact}
                      </span>
                      <span className="text-xs text-slate-400">
                        {c.relances} relance{c.relances > 1 ? "s" : ""} effectuée{c.relances > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Montant + actions */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <p className="text-lg font-black text-slate-800">{fmt(c.montant)}</p>
                  <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${style.badge}`}>
                    {c.statut}
                  </span>
                  {c.statut !== "Irrécouvrable" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setModalRelance(c); incrementerRelance(c.id); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0062a2] text-white text-xs font-bold rounded-xl hover:bg-[#004f82] transition"
                      >
                        <Mail size={11} /> Relancer
                      </button>
                      <button
                        onClick={() => marquerSolde(c.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition"
                      >
                        <CheckCircle2 size={11} /> Soldée
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {filtered.length > ITEMS_PAR_PAGE && (
        <div className="flex items-center justify-between">
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

      {/* Modal confirmation relance */}
      {modalRelance && (
        <ModalRelance creance={modalRelance} onClose={() => setModalRelance(null)} />
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ModalRelance({ creance, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-4xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#0062a2] rounded-2xl flex items-center justify-center">
            <Mail size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Relance envoyée</h2>
            <p className="text-sm text-slate-400">{creance.patient}</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-5 space-y-2 mb-6 text-sm">
          <Row label="Référence" value={creance.ref} />
          <Row label="Montant dû" value={`${creance.montant.toLocaleString("fr-FR")} FCFA`} />
          <Row label="Contact" value={creance.contact} />
          <Row label="Relances" value={`${creance.relances + 1} au total`} />
        </div>

        <p className="text-xs text-slate-400 text-center mb-6 leading-relaxed">
          Une notification de relance a été enregistrée.
          <br />En production, un SMS / email sera envoyé automatiquement.
        </p>

        <button onClick={onClose}
          className="w-full py-3 bg-[#0062a2] text-white rounded-2xl font-bold hover:bg-[#004f82] transition">
          Fermer
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const KpiCreance = ({ label, valeur, icone, bg, urgent }) => (
  <div className={`bg-white p-6 rounded-4xl border shadow-sm ${urgent ? "border-b-4 border-b-red-400 border-slate-100" : "border-slate-100"}`}>
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}>{label}</span>
      <div className={`${bg} p-2 rounded-xl`}>{icone}</div>
    </div>
    <p className="text-2xl font-black text-slate-800">{valeur}</p>
  </div>
);

const FiltreBtn = ({ label, actif, onClick }) => (
  <button onClick={onClick}
    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${actif ? "bg-[#0062a2] text-white border-[#0062a2]" : "bg-white text-slate-500 border-slate-200 hover:border-[#0062a2]/40"}`}>
    {label}
  </button>
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

const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-slate-400 text-xs">{label}</span>
    <span className="font-semibold text-slate-700 text-xs">{value}</span>
  </div>
);
