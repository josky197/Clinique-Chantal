import { useState } from "react";
import {
  Truck, Plus, Search, Phone, Mail,
  CheckCircle2, Clock, X, Save, Package,
  ChevronDown, ChevronUp,
} from "lucide-react";

const FOURNISSEURS = [
  { id: 1, nom: "COPHARMED",   specialite: "Antibiotiques, Analgésiques",     contact: "20 31 45 60",  email: "contact@copharmed.ci",   ville: "Abidjan", statut: "Actif",   nbCommandes: 12 },
  { id: 2, nom: "LABOREX",     specialite: "Médicaments généraux",             contact: "20 22 33 44",  email: "orders@laborex.ci",      ville: "Abidjan", statut: "Actif",   nbCommandes: 8  },
  { id: 3, nom: "BAYER CI",    specialite: "Cardiovasculaire, Respiratoire",   contact: "20 33 55 77",  email: "bayer.ci@bayer.com",     ville: "Abidjan", statut: "Actif",   nbCommandes: 5  },
  { id: 4, nom: "SANOFI CI",   specialite: "Vaccins, Antiviraux",              contact: "20 44 66 88",  email: "sanofi.ci@sanofi.com",   ville: "Abidjan", statut: "Inactif", nbCommandes: 2  },
];

const COMMANDES = [
  { id: "CMD-2026-0031", fournisseur: "COPHARMED", date: "2026-05-02", livraison: "2026-05-07", statut: "En cours",  total: 185000, articles: [{ nom: "Amoxicilline 500 mg", qte: 500, prix: 6200 }, { nom: "Ibuprofène 400 mg", qte: 300, prix: 1800 }] },
  { id: "CMD-2026-0030", fournisseur: "LABOREX",   date: "2026-04-28", livraison: "2026-05-03", statut: "Livrée",   total: 92000,  articles: [{ nom: "Paracétamol 500 mg", qte: 1000, prix: 1500 }, { nom: "Lisinopril 10 mg", qte: 200, prix: 3200 }] },
  { id: "CMD-2026-0029", fournisseur: "BAYER CI",  date: "2026-04-25", livraison: "2026-04-30", statut: "Livrée",   total: 148000, articles: [{ nom: "Ventoline 100 mcg", qte: 50, prix: 18000 }, { nom: "Atorvastatine 20 mg", qte: 200, prix: 5800 }] },
  { id: "CMD-2026-0028", fournisseur: "COPHARMED", date: "2026-04-20", livraison: "2026-04-25", statut: "Livrée",   total: 210000, articles: [{ nom: "Amoxicilline 500 mg", qte: 1000, prix: 6200 }, { nom: "Paracétamol 500 mg", qte: 2000, prix: 1500 }] },
  { id: "CMD-2026-0027", fournisseur: "LABOREX",   date: "2026-04-15", livraison: "2026-04-22", statut: "En attente", total: 55000, articles: [{ nom: "Métformine 500 mg", qte: 500, prix: 3500 }] },
];

const STATUT_CMD_STYLE = {
  "Livrée":     "bg-green-50 text-green-700",
  "En cours":   "bg-blue-50 text-[#0062a2]",
  "En attente": "bg-yellow-50 text-yellow-700",
  "Annulée":    "bg-slate-100 text-slate-500",
};

const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";
const inputCls = "w-full px-4 py-2.5 bg-[#f0f4f6] border-none rounded-xl text-sm text-[#2c3436] placeholder:text-slate-400 focus:ring-2 focus:ring-[#0062a2]/20 focus:bg-white transition-all outline-none font-medium";

// ─────────────────────────────────────────────────────────────────────────────

export default function Fournisseurs() {
  const [onglet, setOnglet]             = useState("fournisseurs");
  const [searchFourn, setSearchFourn]   = useState("");
  const [searchCmd, setSearchCmd]       = useState("");
  const [statutCmd, setStatutCmd]       = useState("Tous");
  const [cmdOuverte, setCmdOuverte]     = useState(null);
  const [showModalCmd, setShowModalCmd] = useState(false);

  const fournisseursFiltres = FOURNISSEURS.filter((f) =>
    f.nom.toLowerCase().includes(searchFourn.toLowerCase()) ||
    f.specialite.toLowerCase().includes(searchFourn.toLowerCase())
  );

  const commandesFiltrees = COMMANDES.filter((c) => {
    const matchSearch = c.fournisseur.toLowerCase().includes(searchCmd.toLowerCase())
                     || c.id.toLowerCase().includes(searchCmd.toLowerCase());
    const matchStatut = statutCmd === "Tous" || c.statut === statutCmd;
    return matchSearch && matchStatut;
  });

  const nbEnCours  = COMMANDES.filter((c) => c.statut === "En cours").length;
  const totalAchats = COMMANDES.filter((c) => c.statut === "Livrée").reduce((s, c) => s + c.total, 0);

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Fournisseurs</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Gestion des fournisseurs, commandes et réceptions
          </p>
        </div>
        <button
          onClick={() => setShowModalCmd(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0062a2] text-white rounded-2xl font-semibold text-sm hover:bg-[#004f82] transition shadow-lg shadow-blue-100"
        >
          <Plus size={16} /> Nouvelle commande
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard label="Fournisseurs actifs"     valeur={FOURNISSEURS.filter((f) => f.statut === "Actif").length} icone={<Truck size={20} />}        bg="bg-blue-50 text-[#0062a2]" />
        <KpiCard label="Commandes en cours"      valeur={nbEnCours}                                               icone={<Clock size={20} />}        bg="bg-yellow-50 text-yellow-600" urgent={nbEnCours > 0} />
        <KpiCard label="Total achats (livrés)"   valeur={fmt(totalAchats)}                                        icone={<Package size={20} />}      bg="bg-green-50 text-green-700" />
      </div>

      {/* Onglets */}
      <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl w-fit">
        <OngletBtn label="Fournisseurs" actif={onglet === "fournisseurs"} onClick={() => setOnglet("fournisseurs")} />
        <OngletBtn label="Commandes"    actif={onglet === "commandes"}    onClick={() => setOnglet("commandes")} />
      </div>

      {/* ── Onglet Fournisseurs ── */}
      {onglet === "fournisseurs" && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={searchFourn} onChange={(e) => setSearchFourn(e.target.value)}
              placeholder="Nom, spécialité…"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fournisseursFiltres.map((f) => (
              <div key={f.id} className={`bg-white rounded-4xl border shadow-sm p-6 ${f.statut === "Actif" ? "border-slate-100" : "border-slate-100 opacity-60"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0062a2] text-white flex items-center justify-center font-black text-sm">
                      {f.nom.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-black text-slate-800">{f.nom}</p>
                      <p className="text-xs text-slate-400">{f.ville}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${f.statut === "Actif" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {f.statut}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4 font-medium">{f.specialite}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Phone size={12} className="text-[#0062a2]" /> {f.contact}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail size={12} className="text-[#0062a2]" /> {f.email}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{f.nbCommandes} commandes passées</span>
                  <button
                    onClick={() => setShowModalCmd(true)}
                    className="text-xs font-bold text-[#0062a2] hover:underline flex items-center gap-1"
                  >
                    <Plus size={12} /> Commander
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Onglet Commandes ── */}
      {onglet === "commandes" && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={searchCmd} onChange={(e) => setSearchCmd(e.target.value)}
                placeholder="Fournisseur, numéro de commande…"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["Tous", "En attente", "En cours", "Livrée"].map((s) => (
                <button key={s} onClick={() => setStatutCmd(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    statutCmd === s ? "bg-[#0062a2] text-white border-[#0062a2]" : "bg-white text-slate-500 border-slate-200 hover:border-[#0062a2]/40"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {commandesFiltrees.map((cmd) => (
              <div key={cmd.id} className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-2xl bg-[#0062a2] text-white flex items-center justify-center font-black text-xs shrink-0">
                      {cmd.fournisseur.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-slate-800">{cmd.fournisseur}</p>
                        <span className="font-mono text-[10px] text-[#0062a2] bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                          {cmd.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Commande : {cmd.date} — Livraison prévue : {cmd.livraison}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-800">{fmt(cmd.total)}</p>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg ${STATUT_CMD_STYLE[cmd.statut]}`}>
                        {cmd.statut}
                      </span>
                    </div>
                    <button
                      onClick={() => setCmdOuverte(cmdOuverte === cmd.id ? null : cmd.id)}
                      className="p-2 text-slate-400 hover:text-[#0062a2] hover:bg-blue-50 rounded-xl transition"
                    >
                      {cmdOuverte === cmd.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                  </div>
                </div>

                {cmdOuverte === cmd.id && (
                  <div className="px-5 pb-5 border-t border-slate-50 pt-4">
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          {["Médicament", "Quantité commandée", "Prix unitaire", "Total"].map((h) => (
                            <th key={h} className="pb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {cmd.articles.map((a, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 pr-6 text-sm font-bold text-slate-800">{a.nom}</td>
                            <td className="py-2.5 pr-6 text-sm text-slate-500">{a.qte} unités</td>
                            <td className="py-2.5 pr-6 text-sm text-slate-500">{fmt(a.prix)}</td>
                            <td className="py-2.5 text-sm font-black text-[#0062a2]">{fmt(a.prix * a.qte)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showModalCmd && (
        <ModalNouvelleCommande
          fournisseurs={FOURNISSEURS.filter((f) => f.statut === "Actif").map((f) => f.nom)}
          onClose={() => setShowModalCmd(false)}
          onSave={() => setShowModalCmd(false)}
        />
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ModalNouvelleCommande({ fournisseurs, onClose, onSave }) {
  const [form, setForm] = useState({
    fournisseur: "", dateCommande: new Date().toISOString().split("T")[0], dateLivraison: "",
  });
  const [lignes, setLignes] = useState([{ medicament: "", quantite: "", prixUnitaire: "" }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLigne = (i, champ, val) =>
    setLignes((prev) => prev.map((l, idx) => idx === i ? { ...l, [champ]: val } : l));

  const ajouterLigne = () =>
    setLignes((prev) => [...prev, { medicament: "", quantite: "", prixUnitaire: "" }]);

  const supprimerLigne = (i) =>
    setLignes((prev) => prev.filter((_, idx) => idx !== i));

  const total = lignes.reduce((s, l) => s + (parseFloat(l.prixUnitaire) || 0) * (parseInt(l.quantite) || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fournisseur) { alert("Sélectionnez un fournisseur."); return; }
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-4xl shadow-2xl w-full max-w-2xl p-8 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Nouvelle commande fournisseur</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Fournisseur <span className="text-red-500">*</span></label>
              <select name="fournisseur" value={form.fournisseur} onChange={handleChange} required className={inputCls}>
                <option value="">Sélectionner</option>
                {fournisseurs.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Date de commande</label>
              <input type="date" name="dateCommande" value={form.dateCommande} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Livraison prévue</label>
              <input type="date" name="dateLivraison" value={form.dateLivraison} onChange={handleChange} className={inputCls} />
            </div>
          </div>

          {/* Lignes de commande */}
          <div>
            <div className="grid grid-cols-12 gap-2 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span className="col-span-5">Médicament</span>
              <span className="col-span-3">Quantité</span>
              <span className="col-span-3">Prix unitaire (FCFA)</span>
            </div>
            {lignes.map((l, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 mb-2 items-center">
                <input value={l.medicament} onChange={(e) => handleLigne(i, "medicament", e.target.value)}
                  placeholder="Amoxicilline 500 mg…" className={`col-span-5 ${inputCls}`} />
                <input type="number" value={l.quantite} onChange={(e) => handleLigne(i, "quantite", e.target.value)}
                  placeholder="100" min={1} className={`col-span-3 ${inputCls}`} />
                <input type="number" value={l.prixUnitaire} onChange={(e) => handleLigne(i, "prixUnitaire", e.target.value)}
                  placeholder="6200" min={0} className={`col-span-3 ${inputCls}`} />
                <button type="button" onClick={() => supprimerLigne(i)}
                  disabled={lignes.length === 1}
                  className="col-span-1 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition disabled:opacity-30">
                  <X size={14} />
                </button>
              </div>
            ))}
            <button type="button" onClick={ajouterLigne}
              className="flex items-center gap-1.5 text-xs font-bold text-[#0062a2] hover:underline mt-1">
              <Plus size={13} /> Ajouter un médicament
            </button>
          </div>

          {total > 0 && (
            <div className="flex justify-between items-center py-3 border-t border-slate-100">
              <span className="text-sm font-bold text-slate-500">Total estimé</span>
              <span className="text-lg font-black text-[#0062a2]">{fmt(total)}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 text-slate-700 bg-slate-100 rounded-xl font-semibold hover:bg-slate-200 transition text-sm">
              Annuler
            </button>
            <button type="submit"
              className="px-6 py-2.5 bg-[#0062a2] text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-[#004f82] transition text-sm">
              <Save size={15} /> Envoyer la commande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const labelCls = "block text-[10px] font-black text-[#596063] uppercase tracking-widest mb-1.5";

const KpiCard = ({ label, valeur, icone, bg, urgent }) => (
  <div className={`bg-white p-6 rounded-4xl border shadow-sm ${urgent ? "border-b-4 border-b-yellow-400 border-slate-100" : "border-slate-100"}`}>
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}>{label}</span>
      <div className={`${bg} p-2 rounded-xl`}>{icone}</div>
    </div>
    <div className="text-2xl font-black text-slate-800">{valeur}</div>
  </div>
);

const OngletBtn = ({ label, actif, onClick }) => (
  <button onClick={onClick}
    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${actif ? "bg-[#0062a2] text-white shadow-md" : "text-slate-500 hover:text-[#0062a2]"}`}>
    {label}
  </button>
);
