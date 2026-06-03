import { useState } from "react";
import {
  ArrowDownCircle, ArrowUpCircle, Search,
  Plus, ChevronLeft, ChevronRight, X, Save,
} from "lucide-react";

const MOUVEMENTS = [
  { id: 1,  type: "Entrée",  medicament: "Amoxicilline 500 mg",   quantite: 500,  lot: "LOT-2026-014",  expiration: "12/2027", fournisseur: "COPHARMED",  motif: "Réapprovisionnement",  date: "2026-05-02", operateur: "Pharmacien" },
  { id: 2,  type: "Sortie",  medicament: "Paracétamol 500 mg",    quantite: 20,   lot: "LOT-2025-088",  expiration: "06/2027", fournisseur: "—",           motif: "Vente directe",        date: "2026-05-02", operateur: "Pharmacien" },
  { id: 3,  type: "Sortie",  medicament: "Amoxicilline 500 mg",   quantite: 6,    lot: "LOT-2026-014",  expiration: "12/2027", fournisseur: "—",           motif: "Dispensation ORD-8812",date: "2026-05-02", operateur: "Pharmacien" },
  { id: 4,  type: "Entrée",  medicament: "Lisinopril 10 mg",      quantite: 200,  lot: "LOT-2026-021",  expiration: "08/2027", fournisseur: "LABOREX",    motif: "Réapprovisionnement",  date: "2026-05-01", operateur: "Pharmacien" },
  { id: 5,  type: "Entrée",  medicament: "Ibuprofène 400 mg",     quantite: 300,  lot: "LOT-2026-019",  expiration: "11/2027", fournisseur: "COPHARMED",  motif: "Commande urgente",     date: "2026-05-01", operateur: "Pharmacien" },
  { id: 6,  type: "Sortie",  medicament: "Lisinopril 10 mg",      quantite: 30,   lot: "LOT-2026-021",  expiration: "08/2027", fournisseur: "—",           motif: "Dispensation ORD-8813",date: "2026-04-30", operateur: "Pharmacien" },
  { id: 7,  type: "Sortie",  medicament: "Métformine 500 mg",     quantite: 60,   lot: "LOT-2025-072",  expiration: "03/2027", fournisseur: "—",           motif: "Vente directe",        date: "2026-04-30", operateur: "Pharmacien" },
  { id: 8,  type: "Entrée",  medicament: "Ventoline 100 mcg",     quantite: 50,   lot: "LOT-2026-033",  expiration: "01/2027", fournisseur: "BAYER CI",   motif: "Réapprovisionnement",  date: "2026-04-29", operateur: "Pharmacien" },
];

const MEDICAMENTS = ["Amoxicilline 500 mg", "Paracétamol 500 mg", "Ibuprofène 400 mg", "Lisinopril 10 mg", "Métformine 500 mg", "Ventoline 100 mcg", "Oseltamivir 6 mg/mL"];
const FOURNISSEURS = ["COPHARMED", "LABOREX", "BAYER CI", "SANOFI CI"];
const MOTIFS_ENTREE = ["Réapprovisionnement", "Commande urgente", "Retour fournisseur", "Don"];
const MOTIFS_SORTIE = ["Vente directe", "Dispensation sur ordonnance", "Périmé / Retrait", "Transfert"];
const ITEMS_PAR_PAGE = 6;

const inputCls = "w-full px-4 py-2.5 bg-[#f0f4f6] border-none rounded-xl text-sm text-[#2c3436] placeholder:text-slate-400 focus:ring-2 focus:ring-[#0062a2]/20 focus:bg-white transition-all outline-none font-medium";

// ─────────────────────────────────────────────────────────────────────────────

export default function MouvementsStock() {
  const [mouvements, setMouvements] = useState(MOUVEMENTS);
  const [search, setSearch]         = useState("");
  const [typeFiltre, setType]       = useState("Tous");
  const [page, setPage]             = useState(1);
  const [showModal, setShowModal]   = useState(false);
  const [typeModal, setTypeModal]   = useState("Entrée");

  const filtered = mouvements.filter((m) => {
    const matchSearch = m.medicament.toLowerCase().includes(search.toLowerCase())
                     || m.lot.toLowerCase().includes(search.toLowerCase())
                     || m.motif.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFiltre === "Tous" || m.type === typeFiltre;
    return matchSearch && matchType;
  });

  const totalPages  = Math.max(1, Math.ceil(filtered.length / ITEMS_PAR_PAGE));
  const paginated   = filtered.slice((page - 1) * ITEMS_PAR_PAGE, page * ITEMS_PAR_PAGE);
  const nbEntrees   = mouvements.filter((m) => m.type === "Entrée").reduce((s, m) => s + m.quantite, 0);
  const nbSorties   = mouvements.filter((m) => m.type === "Sortie").reduce((s, m) => s + m.quantite, 0);

  const ajouterMouvement = (nouveau) => {
    setMouvements((prev) => [{ ...nouveau, id: Date.now(), operateur: "Pharmacien" }, ...prev]);
    setShowModal(false);
  };

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mouvements de stock</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Traçabilité complète des entrées et sorties
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setTypeModal("Sortie"); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 text-orange-600 border border-orange-200 rounded-2xl font-semibold text-sm hover:bg-orange-100 transition"
          >
            <ArrowUpCircle size={16} /> Sortie
          </button>
          <button
            onClick={() => { setTypeModal("Entrée"); setShowModal(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0062a2] text-white rounded-2xl font-semibold text-sm hover:bg-[#004f82] transition shadow-lg shadow-blue-100"
          >
            <ArrowDownCircle size={16} /> Entrée stock
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard label="Unités entrées (période)" valeur={nbEntrees.toLocaleString("fr-FR")} icone={<ArrowDownCircle size={20} />} bg="bg-green-50 text-green-700" />
        <KpiCard label="Unités sorties (période)" valeur={nbSorties.toLocaleString("fr-FR")} icone={<ArrowUpCircle size={20} />}  bg="bg-orange-50 text-orange-600" />
        <KpiCard label="Mouvements enregistrés"   valeur={mouvements.length}                  icone={<Search size={20} />}        bg="bg-blue-50 text-[#0062a2]" />
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5 space-y-3">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Médicament, lot, motif…"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all" />
          </div>
        </div>
        <div className="flex gap-2">
          {["Tous", "Entrée", "Sortie"].map((t) => (
            <button key={t} onClick={() => { setType(t); setPage(1); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                typeFiltre === t ? "bg-[#0062a2] text-white border-[#0062a2]" : "bg-white text-slate-500 border-slate-200 hover:border-[#0062a2]/40"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <Th>Type</Th>
              <Th>Médicament</Th>
              <Th>Qté</Th>
              <Th>Lot</Th>
              <Th>Expiration</Th>
              <Th>Motif</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginated.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl w-fit ${
                    m.type === "Entrée" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-600"
                  }`}>
                    {m.type === "Entrée" ? <ArrowDownCircle size={13} /> : <ArrowUpCircle size={13} />}
                    {m.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800 text-sm">{m.medicament}</p>
                  {m.fournisseur !== "—" && (
                    <p className="text-xs text-slate-400">{m.fournisseur}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-black ${m.type === "Entrée" ? "text-green-600" : "text-orange-600"}`}>
                    {m.type === "Entrée" ? "+" : "−"}{m.quantite}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">{m.lot}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{m.expiration}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{m.motif}</td>
                <td className="px-6 py-4 text-xs text-slate-400 font-medium">{m.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

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

      {showModal && (
        <ModalMouvement
          type={typeModal}
          medicaments={MEDICAMENTS}
          fournisseurs={FOURNISSEURS}
          motifs={typeModal === "Entrée" ? MOTIFS_ENTREE : MOTIFS_SORTIE}
          onClose={() => setShowModal(false)}
          onSave={ajouterMouvement}
        />
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ModalMouvement({ type, medicaments, fournisseurs, motifs, onClose, onSave }) {
  const isEntree = type === "Entrée";
  const [form, setForm] = useState({
    type,
    medicament: "", quantite: "", lot: "", expiration: "",
    fournisseur: "", motif: motifs[0],
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.medicament || !form.quantite || !form.lot) {
      alert("Médicament, quantité et numéro de lot sont obligatoires.");
      return;
    }
    onSave({ ...form, quantite: parseInt(form.quantite, 10) });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-4xl shadow-2xl w-full max-w-lg p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isEntree ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`}>
              {isEntree ? <ArrowDownCircle size={20} /> : <ArrowUpCircle size={20} />}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{isEntree ? "Entrée en stock" : "Sortie de stock"}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelCls}>Médicament <span className="text-red-500">*</span></label>
            <select name="medicament" value={form.medicament} onChange={handleChange} required className={inputCls}>
              <option value="">Sélectionner</option>
              {medicaments.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Quantité <span className="text-red-500">*</span></label>
              <input type="number" name="quantite" value={form.quantite} onChange={handleChange}
                placeholder="0" min={1} required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>N° de lot <span className="text-red-500">*</span></label>
              <input name="lot" value={form.lot} onChange={handleChange}
                placeholder="LOT-2026-XXX" required className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Date d'expiration</label>
              <input name="expiration" value={form.expiration} onChange={handleChange}
                placeholder="MM/AAAA" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Date opération</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className={inputCls} />
            </div>
          </div>
          {isEntree && (
            <div>
              <label className={labelCls}>Fournisseur</label>
              <select name="fournisseur" value={form.fournisseur} onChange={handleChange} className={inputCls}>
                <option value="">Sélectionner</option>
                {fournisseurs.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className={labelCls}>Motif</label>
            <select name="motif" value={form.motif} onChange={handleChange} className={inputCls}>
              {motifs.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 text-slate-700 bg-slate-100 rounded-xl font-semibold hover:bg-slate-200 transition text-sm">
              Annuler
            </button>
            <button type="submit"
              className={`px-6 py-2.5 text-white rounded-xl font-semibold flex items-center gap-2 transition text-sm ${isEntree ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"}`}>
              <Save size={15} /> Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const labelCls = "block text-[10px] font-black text-[#596063] uppercase tracking-widest mb-1.5";

const KpiCard = ({ label, valeur, icone, bg }) => (
  <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}>{label}</span>
      <div className={`${bg} p-2 rounded-xl`}>{icone}</div>
    </div>
    <div className="text-4xl font-black text-slate-800">{valeur}</div>
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
