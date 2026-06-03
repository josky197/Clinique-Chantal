import { useState } from "react";
import {
  Package, AlertTriangle, Calendar, Search,
  TrendingUp, ChevronLeft, ChevronRight, Download,
} from "lucide-react";

const STOCK = [
  { id: 1,  nom: "Amoxicilline 500 mg",  forme: "Gélule",    categorie: "Antibiotique",  quantite: 1240, seuil: 200,  expiration: "12/2026", fournisseur: "COPHARMED" },
  { id: 2,  nom: "Paracétamol 500 mg",   forme: "Comprimé",  categorie: "Analgésique",   quantite: 4500, seuil: 500,  expiration: "06/2027", fournisseur: "LABOREX" },
  { id: 3,  nom: "Ibuprofène 400 mg",    forme: "Comprimé",  categorie: "Analgésique",   quantite: 45,   seuil: 100,  expiration: "11/2026", fournisseur: "COPHARMED" },
  { id: 4,  nom: "Oseltamivir 6 mg/mL",  forme: "Suspension",categorie: "Antiviral",     quantite: 82,   seuil: 50,   expiration: "08/2026", fournisseur: "BAYER CI" },
  { id: 5,  nom: "Lisinopril 10 mg",     forme: "Comprimé",  categorie: "Cardiovasculaire",quantite: 12,  seuil: 50,   expiration: "08/2026", fournisseur: "LABOREX", critique: true },
  { id: 6,  nom: "Atorvastatine 20 mg",  forme: "Comprimé",  categorie: "Cardiovasculaire",quantite: 890, seuil: 200,  expiration: "05/2027", fournisseur: "COPHARMED" },
  { id: 7,  nom: "Metformine 500 mg",    forme: "Comprimé",  categorie: "Antidiabétique",quantite: 680,  seuil: 200,  expiration: "03/2027", fournisseur: "BAYER CI" },
  { id: 8,  nom: "Ventoline 100 mcg",    forme: "Inhalateur",categorie: "Respiratoire",  quantite: 28,   seuil: 30,   expiration: "01/2026", fournisseur: "LABOREX", critique: true },
];

const ITEMS_PAR_PAGE = 6;
const getStatut = (q, s, c) => c ? "Critique" : q <= s ? "Faible" : q <= s * 2 ? "Attention" : "Normal";
const STATUT_STYLE = {
  "Normal":    "bg-green-50 text-green-700",
  "Attention": "bg-yellow-50 text-yellow-700",
  "Faible":    "bg-orange-50 text-orange-600",
  "Critique":  "bg-red-50 text-red-600",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Stock() {
  const [search, setSearch]       = useState("");
  const [filtre, setFiltre]       = useState("Tous");
  const [page, setPage]           = useState(1);

  const filtered = STOCK.filter((s) => {
    const matchSearch = s.nom.toLowerCase().includes(search.toLowerCase())
                     || s.fournisseur.toLowerCase().includes(search.toLowerCase());
    const statut = getStatut(s.quantite, s.seuil, s.critique);
    const matchFiltre = filtre === "Tous"
      || (filtre === "Alerte" && (statut === "Faible" || statut === "Critique"))
      || (filtre === "Normal" && statut === "Normal")
      || (filtre === "Attention" && statut === "Attention");
    return matchSearch && matchFiltre;
  });

  const totalPages   = Math.max(1, Math.ceil(filtered.length / ITEMS_PAR_PAGE));
  const paginated    = filtered.slice((page - 1) * ITEMS_PAR_PAGE, page * ITEMS_PAR_PAGE);
  const nbAlertes    = STOCK.filter((s) => s.quantite <= s.seuil || s.critique).length;
  const totalUnites  = STOCK.reduce((sum, s) => sum + s.quantite, 0);
  const prochExpir   = STOCK.filter((s) => s.expiration.includes("2026")).length;

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Niveaux de stock</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            {STOCK.length} références — {totalUnites.toLocaleString("fr-FR")} unités en inventaire
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-2xl font-semibold text-sm hover:bg-slate-200 transition">
          <Download size={15} /> Exporter
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard label="Produits en stock"        valeur={STOCK.length}    icone={<Package size={20} />}       bg="bg-blue-50 text-[#0062a2]" />
        <KpiCard label="Alertes stock"            valeur={nbAlertes}       icone={<AlertTriangle size={20} />} bg="bg-red-50 text-red-600" urgent />
        <KpiCard label="Expirations avant 2027"   valeur={prochExpir}      icone={<Calendar size={20} />}      bg="bg-yellow-50 text-yellow-600" />
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Médicament, fournisseur…"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all" />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Tous", "Alerte", "Attention", "Normal"].map((f) => (
            <button key={f} onClick={() => { setFiltre(f); setPage(1); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                filtre === f
                  ? "bg-[#0062a2] text-white border-[#0062a2]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#0062a2]/40"
              }`}>
              {f}
              {f === "Alerte" && nbAlertes > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-black">
                  {nbAlertes}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <Th>Médicament</Th>
              <Th>Catégorie</Th>
              <Th>Quantité</Th>
              <Th>Seuil alerte</Th>
              <Th>Expiration</Th>
              <Th>Fournisseur</Th>
              <Th>Statut</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginated.map((s) => {
              const statut = getStatut(s.quantite, s.seuil, s.critique);
              const pct = Math.min(100, Math.round((s.quantite / (s.seuil * 3)) * 100));
              return (
                <tr key={s.id} className={`hover:bg-slate-50 transition-colors ${s.critique ? "bg-red-50/20" : ""}`}>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-sm">{s.nom}</p>
                    <p className="text-xs text-slate-400">{s.forme}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{s.categorie}</td>
                  <td className="px-6 py-4">
                    <p className={`text-sm font-black ${s.critique || s.quantite <= s.seuil ? "text-red-600" : "text-slate-800"}`}>
                      {s.quantite.toLocaleString("fr-FR")}
                    </p>
                    <div className="mt-1.5 w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.critique ? "bg-red-500" : s.quantite <= s.seuil ? "bg-orange-400" : "bg-green-500"}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{s.seuil}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">{s.expiration}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{s.fournisseur}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${STATUT_STYLE[statut]}`}>
                      {statut}
                    </span>
                  </td>
                </tr>
              );
            })}
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

const KpiCard = ({ label, valeur, icone, bg, urgent }) => (
  <div className={`bg-white p-6 rounded-4xl border shadow-sm ${urgent ? "border-b-4 border-b-red-400 border-slate-100" : "border-slate-100"}`}>
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}>{label}</span>
      <div className={`${bg} p-2 rounded-xl`}>{icone}</div>
    </div>
    <div className={`text-4xl font-black ${urgent ? "text-red-600" : "text-slate-800"}`}>{valeur}</div>
  </div>
);

const Th = ({ children }) => (
  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{children}</th>
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
