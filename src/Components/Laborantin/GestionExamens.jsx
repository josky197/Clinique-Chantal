import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlaskConical, Search, Play,
  CheckCircle2, FileText, ChevronLeft, ChevronRight,
} from "lucide-react";

const MOCK_EXAMENS = [
  { id: 1,  patient: "Alain Dupont",     dossier: "PAT-2025-0012", type: "Analyse sanguine", medecin: "Dr. Moore",  date: "2025-05-01", heure: "08 h 30", priorite: "Normale", statut: "En attente" },
  { id: 2,  patient: "Béatrice Martin",  dossier: "PAT-2025-0013", type: "ECBU",             medecin: "Dr. Dupont", date: "2025-05-01", heure: "09 h 00", priorite: "Urgente", statut: "En attente" },
  { id: 3,  patient: "Charles Lefebvre", dossier: "PAT-2025-0014", type: "Glycémie",         medecin: "Dr. Moore",  date: "2025-05-01", heure: "09 h 30", priorite: "Normale", statut: "En cours"   },
  { id: 4,  patient: "Diane Petit",      dossier: "PAT-2025-0015", type: "NFS",              medecin: "Dr. Vance",  date: "2025-05-01", heure: "10 h 00", priorite: "Urgente", statut: "En attente" },
  { id: 5,  patient: "Édouard Moreau",   dossier: "PAT-2025-0016", type: "Bilan hépatique",  medecin: "Dr. Smith",  date: "2025-04-30", heure: "14 h 00", priorite: "Normale", statut: "Terminé"    },
  { id: 6,  patient: "Sophie Laurent",   dossier: "PAT-2025-0017", type: "Ionogramme",       medecin: "Dr. Moore",  date: "2025-04-30", heure: "15 h 30", priorite: "Normale", statut: "Terminé"    },
  { id: 7,  patient: "Marc Bernard",     dossier: "PAT-2025-0018", type: "Bilan lipidique",  medecin: "Dr. Dupont", date: "2025-04-29", heure: "11 h 00", priorite: "Normale", statut: "Terminé"    },
];

const TYPES = ["Tous les types", "Analyse sanguine", "ECBU", "Glycémie", "NFS", "Bilan hépatique", "Ionogramme", "Bilan lipidique"];
const ITEMS_PAR_PAGE = 6;

const STATUT_STYLE = {
  "En attente": "bg-yellow-50 text-yellow-700",
  "En cours":   "bg-blue-50 text-[#0062a2]",
  "Terminé":    "bg-green-50 text-green-700",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function GestionExamens() {
  const navigate = useNavigate();

  const [examens, setExamens]       = useState(MOCK_EXAMENS);
  const [search, setSearch]         = useState("");
  const [statutFiltre, setStatut]   = useState("Tous");
  const [typeFiltre, setType]       = useState("Tous les types");
  const [page, setPage]             = useState(1);

  const filtered = examens.filter((e) => {
    const matchSearch  = e.patient.toLowerCase().includes(search.toLowerCase())
                      || e.type.toLowerCase().includes(search.toLowerCase())
                      || e.dossier.toLowerCase().includes(search.toLowerCase());
    const matchStatut  = statutFiltre === "Tous" || e.statut === statutFiltre;
    const matchType    = typeFiltre === "Tous les types" || e.type === typeFiltre;
    return matchSearch && matchStatut && matchType;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PAR_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PAR_PAGE, page * ITEMS_PAR_PAGE);

  const demarrer  = (id) => setExamens((p) => p.map((e) => e.id === id ? { ...e, statut: "En cours" } : e));

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Gestion des examens</h1>
        <p className="text-slate-500 mt-1 font-medium text-sm">
          {filtered.length} examen{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Patient, type d'examen, numéro de dossier…"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all" />
          </div>
          <select value={statutFiltre} onChange={(e) => { setStatut(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 transition-all min-w-36">
            <option value="Tous">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          </select>
          <select value={typeFiltre} onChange={(e) => { setType(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 transition-all min-w-44">
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Raccourcis statuts */}
        <div className="flex gap-2 mt-4">
          {["Tous", "En attente", "En cours", "Terminé"].map((s) => (
            <button key={s} onClick={() => { setStatut(s); setPage(1); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                statutFiltre === s
                  ? "bg-[#0062a2] text-white border-[#0062a2]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#0062a2]/40"
              }`}>
              {s}
              <span className="ml-1.5 opacity-60">
                ({s === "Tous" ? examens.length : examens.filter((e) => e.statut === s).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        {paginated.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <FlaskConical size={36} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium">Aucun examen trouvé</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <Th>Patient</Th>
                <Th>Type d'examen</Th>
                <Th>Médecin prescripteur</Th>
                <Th>Date / Heure</Th>
                <Th>Priorité</Th>
                <Th>Statut</Th>
                <Th align="right">Action</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.map((ex) => (
                <tr key={ex.id} className={`hover:bg-slate-50 transition-colors ${ex.priorite === "Urgente" && ex.statut !== "Terminé" ? "bg-red-50/20" : ""}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ${
                        ex.statut === "Terminé" ? "bg-green-50 text-green-600" :
                        ex.statut === "En cours" ? "bg-blue-50 text-[#0062a2]" :
                        "bg-yellow-50 text-yellow-600"
                      }`}>
                        <FlaskConical size={15} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{ex.patient}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{ex.dossier}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">{ex.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{ex.medecin}</td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-700">{ex.date}</p>
                    <p className="text-xs text-slate-400">{ex.heure}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${
                      ex.priorite === "Urgente" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"
                    }`}>
                      {ex.priorite}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${STATUT_STYLE[ex.statut]}`}>
                      {ex.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      {ex.statut === "En attente" && (
                        <button onClick={() => demarrer(ex.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0062a2] text-white text-xs font-bold rounded-xl hover:bg-[#004f82] transition">
                          <Play size={11} /> Démarrer
                        </button>
                      )}
                      {ex.statut === "En cours" && (
                        <button onClick={() => navigate(`/saisie-resultats/${ex.id}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition">
                          <CheckCircle2 size={11} /> Saisir résultats
                        </button>
                      )}
                      {ex.statut === "Terminé" && (
                        <button onClick={() => navigate(`/saisie-resultats/${ex.id}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition">
                          <FileText size={11} /> Voir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {filtered.length > ITEMS_PAR_PAGE && (
          <div className="px-6 py-4 border-t border-slate-50 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs text-slate-400 font-medium">
              {(page - 1) * ITEMS_PAR_PAGE + 1}–{Math.min(page * ITEMS_PAR_PAGE, filtered.length)} sur {filtered.length}
            </span>
            <div className="flex items-center gap-2">
              <PageBtn icon={<ChevronLeft size={14} />} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
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

const Th = ({ children, align = "left" }) => (
  <th className={`px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${align === "right" ? "text-right" : ""}`}>
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
