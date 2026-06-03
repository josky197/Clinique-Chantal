import { useState } from "react";
import {
  Search, Eye, Printer,
  ChevronLeft, ChevronRight, ClipboardList,
} from "lucide-react";

const HISTORIQUE = [
  { id: "DISP-2026-0041", ordonnance: "ORD-2026-8812", patient: "Jean-Pierre Martin",  dossier: "PAT-2025-0012", medecin: "Dr. Moore",  date: "2026-05-02", heure: "10 h 15", statut: "Dispensée",    medicaments: [{ nom: "Amoxicilline 500 mg", qte: 3, prix: 9500 }, { nom: "Lisinopril 10 mg", qte: 1, prix: 4500 }], total: 33000, pharmacien: "Pharmacien" },
  { id: "DISP-2026-0040", ordonnance: "ORD-2026-8813", patient: "Béatrice Martin",     dossier: "PAT-2025-0013", medecin: "Dr. Dupont", date: "2026-05-02", heure: "09 h 30", statut: "Dispensée",    medicaments: [{ nom: "Atorvastatine 20 mg", qte: 1, prix: 7500 }], total: 7500, pharmacien: "Pharmacien" },
  { id: "DISP-2026-0039", ordonnance: "ORD-2026-8811", patient: "Charles Lefebvre",    dossier: "PAT-2025-0014", medecin: "Dr. Moore",  date: "2026-05-01", heure: "14 h 45", statut: "Partielle",    medicaments: [{ nom: "Amoxicilline 500 mg", qte: 3, prix: 9500 }], total: 28500, pharmacien: "Pharmacien" },
  { id: "DISP-2026-0038", ordonnance: "ORD-2026-8809", patient: "Diane Petit",         dossier: "PAT-2025-0015", medecin: "Dr. Vance",  date: "2026-05-01", heure: "11 h 00", statut: "Dispensée",    medicaments: [{ nom: "Ibuprofène 400 mg", qte: 2, prix: 3000 }], total: 6000, pharmacien: "Pharmacien" },
  { id: "DISP-2026-0037", ordonnance: "ORD-2026-8805", patient: "Édouard Moreau",      dossier: "PAT-2025-0016", medecin: "Dr. Smith",  date: "2026-04-30", heure: "16 h 20", statut: "Non dispensée", medicaments: [], total: 0, pharmacien: "—" },
  { id: "DISP-2026-0036", ordonnance: "ORD-2026-8803", patient: "Sophie Laurent",      dossier: "PAT-2025-0017", medecin: "Dr. Vance",  date: "2026-04-30", heure: "09 h 00", statut: "Dispensée",    medicaments: [{ nom: "Paracétamol 500 mg", qte: 2, prix: 2500 }, { nom: "Ibuprofène 400 mg", qte: 1, prix: 3000 }], total: 8000, pharmacien: "Pharmacien" },
];

const STATUT_STYLE = {
  "Dispensée":     "bg-green-50 text-green-700",
  "Partielle":     "bg-yellow-50 text-yellow-700",
  "Non dispensée": "bg-slate-100 text-slate-500",
};

const ITEMS_PAR_PAGE = 5;
const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";

// ─────────────────────────────────────────────────────────────────────────────

export default function HistoriqueDispensation() {
  const [search, setSearch]       = useState("");
  const [statut, setStatut]       = useState("Tous");
  const [page, setPage]           = useState(1);
  const [detailOuvert, setDetail] = useState(null);

  const filtered = HISTORIQUE.filter((h) => {
    const matchSearch = h.patient.toLowerCase().includes(search.toLowerCase())
                     || h.ordonnance.toLowerCase().includes(search.toLowerCase())
                     || h.id.toLowerCase().includes(search.toLowerCase());
    const matchStatut = statut === "Tous" || h.statut === statut;
    return matchSearch && matchStatut;
  });

  const totalPages    = Math.max(1, Math.ceil(filtered.length / ITEMS_PAR_PAGE));
  const paginated     = filtered.slice((page - 1) * ITEMS_PAR_PAGE, page * ITEMS_PAR_PAGE);
  const nbDispensees  = HISTORIQUE.filter((h) => h.statut === "Dispensée").length;
  const totalValeur   = HISTORIQUE.filter((h) => h.statut === "Dispensée").reduce((s, h) => s + h.total, 0);

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Historique des délivrances</h1>
        <p className="text-slate-500 mt-1 font-medium text-sm">
          Traçabilité complète de toutes les dispensations d'ordonnances
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard label="Dispensations totales" valeur={HISTORIQUE.length}     icone={<ClipboardList size={20} />} bg="bg-blue-50 text-[#0062a2]" />
        <KpiCard label="Entièrement dispensées" valeur={nbDispensees}          icone={<ClipboardList size={20} />} bg="bg-green-50 text-green-700" />
        <KpiCard label="Valeur dispensée"       valeur={fmt(totalValeur)}      icone={<ClipboardList size={20} />} bg="bg-purple-50 text-purple-600" />
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5 space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Patient, n° de dispensation, n° d'ordonnance…"
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Tous", "Dispensée", "Partielle", "Non dispensée"].map((s) => (
            <button key={s} onClick={() => { setStatut(s); setPage(1); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                statut === s ? "bg-[#0062a2] text-white border-[#0062a2]" : "bg-white text-slate-500 border-slate-200 hover:border-[#0062a2]/40"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {paginated.map((h) => (
          <div key={h.id} className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-[#0062a2]/10 text-[#0062a2] flex items-center justify-center shrink-0">
                  <ClipboardList size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-slate-800">{h.patient}</p>
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                      {h.id}
                    </span>
                    <span className="font-mono text-[10px] text-[#0062a2] bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                      {h.ordonnance}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {h.medecin} — {h.date} à {h.heure}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-sm font-black text-slate-800">{h.total > 0 ? fmt(h.total) : "—"}</p>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg ${STATUT_STYLE[h.statut]}`}>
                    {h.statut}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setDetail(detailOuvert === h.id ? null : h.id)}
                    className="p-2 text-slate-400 hover:text-[#0062a2] hover:bg-blue-50 rounded-xl transition"
                    title="Voir le détail"
                  >
                    <Eye size={15} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-[#0062a2] hover:bg-blue-50 rounded-xl transition" title="Imprimer">
                    <Printer size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Détail dépliable */}
            {detailOuvert === h.id && h.medicaments.length > 0 && (
              <div className="px-5 pb-5 border-t border-slate-50 pt-4">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      {["Médicament", "Quantité", "Prix unitaire", "Total"].map((col) => (
                        <th key={col} className="pb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {h.medicaments.map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 pr-6 text-sm font-bold text-slate-800">{m.nom}</td>
                        <td className="py-2.5 pr-6 text-sm text-slate-500">{m.qte} boîte{m.qte > 1 ? "s" : ""}</td>
                        <td className="py-2.5 pr-6 text-sm text-slate-500">{fmt(m.prix)}</td>
                        <td className="py-2.5 text-sm font-black text-[#0062a2]">{fmt(m.prix * m.qte)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="pt-3 text-xs font-bold text-slate-500 text-right pr-6">Total :</td>
                      <td className="pt-3 text-sm font-black text-slate-800">{fmt(h.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-4xl border border-slate-100 p-16 text-center text-slate-400">
            <ClipboardList size={36} className="mx-auto mb-3 opacity-20" />
            <p className="font-medium">Aucune délivrance trouvée</p>
          </div>
        )}
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
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const KpiCard = ({ label, valeur, icone, bg }) => (
  <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}>{label}</span>
      <div className={`${bg} p-2 rounded-xl`}>{icone}</div>
    </div>
    <div className="text-2xl font-black text-slate-800">{valeur}</div>
  </div>
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
