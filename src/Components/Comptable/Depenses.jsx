import { useState } from "react";
import {
  Plus, Search, Trash2, X, Save,
  ChevronLeft, ChevronRight, TrendingDown,
  Users, Pill, Zap, MoreHorizontal,
} from "lucide-react";

const CATEGORIES = [
  { id: "salaires",    label: "Salaires",            icone: Users,        couleur: "bg-blue-50 text-[#0062a2]" },
  { id: "medicaments", label: "Achats médicaments",  icone: Pill,         couleur: "bg-purple-50 text-purple-600" },
  { id: "charges",     label: "Charges fixes",       icone: Zap,          couleur: "bg-yellow-50 text-yellow-600" },
  { id: "autres",      label: "Autres",              icone: MoreHorizontal, couleur: "bg-slate-100 text-slate-500" },
];

const MOCK_DEPENSES = [
  { id: 1,  libelle: "Salaire Dr. Moore",           categorie: "salaires",    montant: 450000, date: "2026-05-01", responsable: "RH",         note: "Mai 2026" },
  { id: 2,  libelle: "Salaire Dr. Dupont",          categorie: "salaires",    montant: 420000, date: "2026-05-01", responsable: "RH",         note: "Mai 2026" },
  { id: 3,  libelle: "Salaire réceptioniste",       categorie: "salaires",    montant: 180000, date: "2026-05-01", responsable: "RH",         note: "Mai 2026" },
  { id: 4,  libelle: "Achat Amoxicilline 500mg",    categorie: "medicaments", montant: 85000,  date: "2026-05-02", responsable: "Pharmacien", note: "Réappro. stock" },
  { id: 5,  libelle: "Achat Paracétamol 1000mg",    categorie: "medicaments", montant: 42000,  date: "2026-05-02", responsable: "Pharmacien", note: "Réappro. stock" },
  { id: 6,  libelle: "Loyer local clinique",        categorie: "charges",     montant: 350000, date: "2026-05-01", responsable: "Direction",  note: "Mai 2026" },
  { id: 7,  libelle: "Facture électricité CIE",     categorie: "charges",     montant: 95000,  date: "2026-04-30", responsable: "Admin",      note: "Avril 2026" },
  { id: 8,  libelle: "Maintenance équipements",     categorie: "charges",     montant: 60000,  date: "2026-04-28", responsable: "Technique",  note: "" },
  { id: 9,  libelle: "Fournitures de bureau",       categorie: "autres",      montant: 18000,  date: "2026-04-25", responsable: "Admin",      note: "" },
];

const ITEMS_PAR_PAGE = 6;
const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";

const inputCls = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all";

// ─────────────────────────────────────────────────────────────────────────────

export default function Depenses() {
  const [depenses, setDepenses]     = useState(MOCK_DEPENSES);
  const [search, setSearch]         = useState("");
  const [catFiltre, setCatFiltre]   = useState("Toutes");
  const [page, setPage]             = useState(1);
  const [showModal, setShowModal]   = useState(false);

  const filtered = depenses.filter((d) => {
    const matchSearch = d.libelle.toLowerCase().includes(search.toLowerCase())
                     || d.responsable.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFiltre === "Toutes" || d.categorie === catFiltre;
    return matchSearch && matchCat;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PAR_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PAR_PAGE, page * ITEMS_PAR_PAGE);

  const totalParCategorie = CATEGORIES.map((c) => ({
    ...c,
    total: depenses.filter((d) => d.categorie === c.id).reduce((s, d) => s + d.montant, 0),
  }));
  const totalGeneral = depenses.reduce((s, d) => s + d.montant, 0);

  const supprimerDepense = (id) =>
    setDepenses((prev) => prev.filter((d) => d.id !== id));

  const ajouterDepense = (nouvelle) => {
    setDepenses((prev) => [...prev, { ...nouvelle, id: Date.now() }]);
    setShowModal(false);
  };

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestion des dépenses</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Total du mois :{" "}
            <span className="font-black text-red-600">{fmt(totalGeneral)}</span>
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0062a2] text-white rounded-2xl font-semibold text-sm hover:bg-[#004f82] transition shadow-lg shadow-blue-100"
        >
          <Plus size={16} /> Nouvelle dépense
        </button>
      </div>

      {/* Cartes par catégorie */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {totalParCategorie.map((c) => (
          <button
            key={c.id}
            onClick={() => { setCatFiltre(catFiltre === c.id ? "Toutes" : c.id); setPage(1); }}
            className={`bg-white p-5 rounded-4xl border shadow-sm hover:shadow-md transition-all text-left ${catFiltre === c.id ? "border-[#0062a2] ring-2 ring-[#0062a2]/10" : "border-slate-100"}`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 ${c.couleur}`}>
              <c.icone size={18} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{c.label}</p>
            <p className="text-xl font-black text-slate-800 mt-1">{fmt(c.total)}</p>
            <div className="mt-3 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0062a2] rounded-full"
                style={{ width: `${totalGeneral > 0 ? (c.total / totalGeneral) * 100 : 0}%` }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Libellé, responsable…"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <FiltreBtn label="Toutes" actif={catFiltre === "Toutes"} onClick={() => { setCatFiltre("Toutes"); setPage(1); }} />
            {CATEGORIES.map((c) => (
              <FiltreBtn key={c.id} label={c.label} actif={catFiltre === c.id} onClick={() => { setCatFiltre(c.id); setPage(1); }} />
            ))}
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        {paginated.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <TrendingDown size={36} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium">Aucune dépense trouvée</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <Th>Libellé</Th>
                <Th>Catégorie</Th>
                <Th>Date</Th>
                <Th>Responsable</Th>
                <Th>Note</Th>
                <Th>Montant</Th>
                <Th align="right" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.map((d) => {
                const cat = CATEGORIES.find((c) => c.id === d.categorie);
                return (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 text-sm">{d.libelle}</p>
                    </td>
                    <td className="px-6 py-4">
                      {cat && (
                        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${cat.couleur}`}>
                          {cat.label}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">{d.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{d.responsable}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 italic">{d.note || "—"}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-red-600">{fmt(d.montant)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => supprimerDepense(d.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
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
              <PageBtn icon={<ChevronLeft size={14} />}  onClick={() => setPage((p) => Math.max(1, p - 1))}          disabled={page === 1} />
              {Array.from({ length: totalPages }, (_, i) => (
                <PageBtn key={i} label={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)} />
              ))}
              <PageBtn icon={<ChevronRight size={14} />} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
            </div>
          </div>
        )}
      </div>

      {/* Modal nouvelle dépense */}
      {showModal && (
        <ModalNouvelleDepense
          onClose={() => setShowModal(false)}
          onSave={ajouterDepense}
        />
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ModalNouvelleDepense({ onClose, onSave }) {
  const [form, setForm] = useState({
    libelle: "", categorie: "", montant: "",
    date: new Date().toISOString().split("T")[0],
    responsable: "", note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.libelle || !form.categorie || !form.montant) {
      alert("Libellé, catégorie et montant sont obligatoires.");
      return;
    }
    onSave({ ...form, montant: parseInt(form.montant, 10) });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-4xl shadow-2xl w-full max-w-lg p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Nouvelle dépense</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelCls}>Libellé <span className="text-red-500">*</span></label>
            <input name="libelle" value={form.libelle} onChange={handleChange}
              placeholder="ex. Salaire Dr. Moore, Achat Amoxicilline…" required className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Catégorie <span className="text-red-500">*</span></label>
              <select name="categorie" value={form.categorie} onChange={handleChange} required className={inputCls}>
                <option value="">Sélectionner</option>
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Montant (FCFA) <span className="text-red-500">*</span></label>
              <input type="number" name="montant" value={form.montant} onChange={handleChange}
                placeholder="ex. 45000" required min={0} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Responsable</label>
              <input name="responsable" value={form.responsable} onChange={handleChange}
                placeholder="ex. RH, Admin…" className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Note</label>
            <input name="note" value={form.note} onChange={handleChange}
              placeholder="Remarque optionnelle" className={inputCls} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 text-slate-700 bg-slate-100 rounded-xl font-semibold hover:bg-slate-200 transition text-sm">
              Annuler
            </button>
            <button type="submit"
              className="px-6 py-2.5 bg-[#0062a2] text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-[#004f82] transition text-sm">
              <Save size={15} /> Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const labelCls = "block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2";

const Th = ({ children, align = "left" }) => (
  <th className={`px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${align === "right" ? "text-right" : ""}`}>
    {children}
  </th>
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
