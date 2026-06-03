import { useState } from "react";
import {
  Search, Plus, Eye, Edit, Calendar,
  ChevronLeft, ChevronRight, Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MOCK_PATIENTS = [
  { id: 1, numeroDossier: "PAT-2025-0012", nom: "Dupont",    prenom: "Alain",    sexe: "M", dateNaissance: "1985-03-15", telephone: "06 12 34 56 78", service: "Consultation générale", derniereVisite: "2025-04-28" },
  { id: 2, numeroDossier: "PAT-2025-0013", nom: "Martin",    prenom: "Béatrice", sexe: "F", dateNaissance: "1972-07-22", telephone: "06 23 45 67 89", service: "Cardiologie",           derniereVisite: "2025-04-25" },
  { id: 3, numeroDossier: "PAT-2025-0014", nom: "Lefebvre",  prenom: "Charles",  sexe: "M", dateNaissance: "1990-11-08", telephone: "06 34 56 78 90", service: "Consultation générale", derniereVisite: "2025-04-20" },
  { id: 4, numeroDossier: "PAT-2025-0015", nom: "Petit",     prenom: "Diane",    sexe: "F", dateNaissance: "2020-02-14", telephone: "06 45 67 89 01", service: "Pédiatrie",             derniereVisite: "2025-04-18" },
  { id: 5, numeroDossier: "PAT-2025-0016", nom: "Moreau",    prenom: "Édouard",  sexe: "M", dateNaissance: "1968-09-30", telephone: "06 56 78 90 12", service: "Neurologie",            derniereVisite: "2025-04-15" },
  { id: 6, numeroDossier: "PAT-2025-0017", nom: "Laurent",   prenom: "Sophie",   sexe: "F", dateNaissance: "1995-05-19", telephone: "06 67 89 01 23", service: "Gynécologie",           derniereVisite: "2025-04-10" },
  { id: 7, numeroDossier: "PAT-2025-0018", nom: "Bernard",   prenom: "Marc",     sexe: "M", dateNaissance: "1955-12-03", telephone: "06 78 90 12 34", service: "Cardiologie",           derniereVisite: "2025-04-08" },
  { id: 8, numeroDossier: "PAT-2025-0019", nom: "Rousseau",  prenom: "Claire",   sexe: "F", dateNaissance: "1988-01-27", telephone: "06 89 01 23 45", service: "Dermatologie",          derniereVisite: "2025-04-05" },
];

const ITEMS_PAR_PAGE = 6;

const SEXE_LABELS = { M: "Masculin", F: "Féminin", Autre: "Autre" };

const calcAge = (dateNaissance) => {
  const today = new Date();
  const naissance = new Date(dateNaissance);
  let age = today.getFullYear() - naissance.getFullYear();
  const m = today.getMonth() - naissance.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < naissance.getDate())) age--;
  return age;
};

// ─────────────────────────────────────────────────────────────────────────────

export default function ListePatients() {
  const navigate = useNavigate();
  const [search, setSearch]     = useState("");
  const [page, setPage]         = useState(1);
  const [sexeFilter, setSexeFilter] = useState("Tous");

  const filtered = MOCK_PATIENTS.filter((p) => {
    const term = search.toLowerCase();
    const matchSearch =
      p.nom.toLowerCase().includes(term) ||
      p.prenom.toLowerCase().includes(term) ||
      p.telephone.includes(term) ||
      p.numeroDossier.toLowerCase().includes(term);
    const matchSexe = sexeFilter === "Tous" || p.sexe === sexeFilter;
    return matchSearch && matchSexe;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PAR_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PAR_PAGE, page * ITEMS_PAR_PAGE);

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleFilter = (val) => { setSexeFilter(val); setPage(1); };

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Liste des patients</h1>
          <p className="text-slate-500 mt-1 font-medium">
            {filtered.length} patient{filtered.length > 1 ? "s" : ""} enregistré{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => navigate("/ajout-patient")}
          className="flex items-center gap-2 px-6 py-3 bg-[#0062a2] text-white rounded-2xl font-semibold hover:bg-[#001a4a] transition shadow-lg shadow-blue-100"
        >
          <Plus size={18} /> Nouveau patient
        </button>
      </div>

      {/* Barre de recherche & filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Rechercher par nom, téléphone, numéro de dossier..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/20 focus:border-[#0062a2] transition"
            />
          </div>
          <select
            value={sexeFilter}
            onChange={(e) => handleFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/20 focus:border-[#0062a2] transition min-w-36"
          >
            <option value="Tous">Tous les sexes</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        {paginated.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Users size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">Aucun patient trouvé</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <Th>N° Dossier</Th>
                <Th>Patient</Th>
                <Th>Âge / Sexe</Th>
                <Th>Téléphone</Th>
                <Th>Service</Th>
                <Th>Dernière visite</Th>
                <Th align="right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-[#0062a2] bg-blue-50 px-2 py-1 rounded-lg">
                      {p.numeroDossier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-[#0062a2] text-white flex items-center justify-center text-xs font-black shrink-0">
                        {p.prenom[0]}{p.nom[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{p.prenom} {p.nom}</p>
                        <p className="text-xs text-slate-400">{p.dateNaissance}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-700">{calcAge(p.dateNaissance)} ans</p>
                    <p className="text-xs text-slate-400">{SEXE_LABELS[p.sexe]}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.telephone}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-[#0062a2] bg-blue-50 px-3 py-1 rounded-lg">
                      {p.service}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">{p.derniereVisite}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <ActionBtn icon={<Eye size={15} />}    title="Voir le dossier"  onClick={() => {}} />
                      <ActionBtn icon={<Edit size={15} />}   title="Modifier"          onClick={() => {}} />
                      <ActionBtn icon={<Calendar size={15} />} title="Rendez-vous"    onClick={() => navigate("/gestion-rendez-vous")} />
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
              <PageBtn icon={<ChevronLeft size={14} />}  onClick={() => setPage((p) => Math.max(1, p - 1))}        disabled={page === 1} />
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
// Sous-composants

const Th = ({ children, align = "left" }) => (
  <th className={`px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${align === "right" ? "text-right" : ""}`}>
    {children}
  </th>
);

const ActionBtn = ({ icon, title, onClick }) => (
  <button onClick={onClick} title={title}
    className="p-2 text-slate-400 hover:text-[#0062a2] hover:bg-blue-50 rounded-xl transition">
    {icon}
  </button>
);

const PageBtn = ({ label, icon, active, disabled, onClick }) => (
  <button onClick={onClick} disabled={disabled}
    className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition ${
      active    ? "bg-[#0062a2] text-white shadow-sm" :
      disabled  ? "text-slate-200 cursor-not-allowed" :
                  "text-slate-500 hover:bg-white hover:text-[#0062a2] border border-transparent hover:border-slate-200"
    }`}>
    {icon ?? label}
  </button>
);
