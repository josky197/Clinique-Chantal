import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Plus, MoreVertical,
  ChevronLeft, ChevronRight, TrendingUp, AlertTriangle,
} from "lucide-react";

const CATEGORIES = ["Tous", "Antibiotiques", "Analgésiques", "Antiviraux", "Antihistaminiques", "Antidépresseurs"];

const MEDICAMENTS = [
  { id: 1, nom: "Amoxicilline",   forme: "Gélule",    dosage: "500 mg",   categorie: "Antibiotiques",    prixAchat: 6200,  prixVente: 9500,  stock: 1240, alerte: false },
  { id: 2, nom: "Paracétamol",    forme: "Comprimé",  dosage: "500 mg",   categorie: "Analgésiques",     prixAchat: 1500,  prixVente: 2500,  stock: 4500, alerte: false },
  { id: 3, nom: "Oseltamivir",    forme: "Suspension",dosage: "6 mg/mL",  categorie: "Antiviraux",       prixAchat: 42000, prixVente: 68000, stock: 82,   alerte: true  },
  { id: 4, nom: "Loratadine",     forme: "Comprimé",  dosage: "10 mg",    categorie: "Antihistaminiques",prixAchat: 2700,  prixVente: 4500,  stock: 2100, alerte: false },
  { id: 5, nom: "Sertraline",     forme: "Gélule",    dosage: "50 mg",    categorie: "Antidépresseurs",  prixAchat: 11000, prixVente: 18000, stock: 345,  alerte: false },
  { id: 6, nom: "Ibuprofène",     forme: "Comprimé",  dosage: "400 mg",   categorie: "Analgésiques",     prixAchat: 1800,  prixVente: 3000,  stock: 45,   alerte: true  },
  { id: 7, nom: "Metformine",     forme: "Comprimé",  dosage: "500 mg",   categorie: "Antidiabétiques",  prixAchat: 3500,  prixVente: 5500,  stock: 680,  alerte: false },
];

const ITEMS_PAR_PAGE = 6;
const fmt = (n) => n.toLocaleString("fr-FR") + " F";

// ─────────────────────────────────────────────────────────────────────────────

export default function Medicaments() {
  const navigate = useNavigate();
  const [search, setSearch]         = useState("");
  const [categorie, setCategorie]   = useState("Tous");
  const [page, setPage]             = useState(1);

  const filtered = MEDICAMENTS.filter((m) => {
    const matchSearch = m.nom.toLowerCase().includes(search.toLowerCase())
                     || m.dosage.toLowerCase().includes(search.toLowerCase());
    const matchCat = categorie === "Tous" || m.categorie === categorie;
    return matchSearch && matchCat;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PAR_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PAR_PAGE, page * ITEMS_PAR_PAGE);
  const enAlerte   = MEDICAMENTS.filter((m) => m.alerte).length;

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Médicaments</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            {MEDICAMENTS.length} produits enregistrés
            {enAlerte > 0 && (
              <span className="ml-2 text-red-600 font-bold">
                — {enAlerte} en alerte stock
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => navigate("/ajout-medicament")}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0062a2] text-white rounded-2xl font-semibold text-sm hover:bg-[#004f82] transition shadow-lg shadow-blue-100"
        >
          <Plus size={16} /> Ajouter un médicament
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Rechercher par nom, dosage…"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => { setCategorie(c); setPage(1); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                categorie === c
                  ? "bg-[#0062a2] text-white border-[#0062a2]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#0062a2]/40"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        {/* En-têtes colonnes */}
        <div className="grid grid-cols-12 px-6 py-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <div className="col-span-4">Médicament</div>
          <div className="col-span-2">Dosage</div>
          <div className="col-span-2">Catégorie</div>
          <div className="col-span-2">Prix achat / vente</div>
          <div className="col-span-2 text-right">Stock</div>
        </div>

        <div className="divide-y divide-slate-50">
          {paginated.map((med) => (
            <div key={med.id}
              className={`group grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50 transition-colors ${med.alerte ? "border-l-4 border-l-red-400" : ""}`}>
              {/* Médicament */}
              <div className="col-span-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ${med.alerte ? "bg-red-50 text-red-500" : "bg-blue-50 text-[#0062a2]"}`}>
                  {med.forme[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{med.nom}</p>
                  <p className="text-xs text-slate-400">{med.forme}</p>
                </div>
              </div>

              {/* Dosage */}
              <div className="col-span-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg">
                  {med.dosage}
                </span>
              </div>

              {/* Catégorie */}
              <div className="col-span-2 text-sm text-slate-500 font-medium">{med.categorie}</div>

              {/* Prix */}
              <div className="col-span-2">
                <p className="text-xs font-bold text-slate-800">{fmt(med.prixVente)}</p>
                <p className="text-[10px] text-slate-400">Achat : {fmt(med.prixAchat)}</p>
              </div>

              {/* Stock */}
              <div className="col-span-2 flex items-center justify-end gap-3">
                <div className="text-right">
                  <p className={`text-sm font-black ${med.alerte ? "text-red-600" : "text-slate-700"}`}>
                    {med.stock.toLocaleString("fr-FR")} unités
                  </p>
                  {med.alerte && (
                    <p className="text-[10px] font-bold text-red-500 flex items-center justify-end gap-1 mt-0.5">
                      <AlertTriangle size={10} /> Stock faible
                    </p>
                  )}
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-[#0062a2] hover:bg-blue-50 rounded-xl transition-all">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">
            Affichage {(page - 1) * ITEMS_PAR_PAGE + 1}–{Math.min(page * ITEMS_PAR_PAGE, filtered.length)} sur {filtered.length} médicaments
          </p>
          <div className="flex items-center gap-2">
            <PageBtn icon={<ChevronLeft size={14} />}  onClick={() => setPage((p) => Math.max(1, p - 1))}          disabled={page === 1} />
            {Array.from({ length: totalPages }, (_, i) => (
              <PageBtn key={i} label={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)} />
            ))}
            <PageBtn icon={<ChevronRight size={14} />} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
          </div>
        </div>
      </div>

      {/* Bas de page — produits à fort mouvement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-[#0062a2]" /> Produits les plus vendus
          </h3>
          <div className="space-y-3">
            {[{ nom: "Paracétamol 500 mg", evol: "+12,5 %" }, { nom: "Amoxicilline 500 mg", evol: "+8,2 %" }, { nom: "Ibuprofène 400 mg", evol: "+5,1 %" }].map((p) => (
              <div key={p.nom} className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">{p.nom}</span>
                <span className="text-xs font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">{p.evol}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-[#0062a2] rounded-4xl p-6 text-white relative overflow-hidden flex items-center gap-6">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <h3 className="text-xl font-black font-['Manrope'] mb-2">Réapprovisionnement intelligent</h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              {enAlerte} médicament{enAlerte > 1 ? "s ont" : " a"} atteint le seuil d'alerte. Passez une commande maintenant pour éviter les ruptures.
            </p>
            <button className="mt-4 bg-white text-[#0062a2] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition flex items-center gap-2">
              Voir les alertes stock <AlertTriangle size={14} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

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
