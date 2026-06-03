import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, Info, ChevronDown } from "lucide-react";

const FORMES = ["Comprimé", "Gélule", "Suspension buvable", "Injectable", "Crème / Pommade", "Inhalateur", "Sirop", "Suppositoire"];
const CATEGORIES = ["Antibiotique", "Analgésique", "Antiviral", "Antihistaminique", "Antidépresseur", "Antidiabétique", "Cardiovasculaire", "Respiratoire", "Vaccin", "Autre"];

const inputCls = "w-full px-4 py-3 bg-[#f0f4f6] border-none rounded-xl text-sm text-[#2c3436] placeholder:text-slate-400 focus:ring-2 focus:ring-[#0062a2]/20 focus:bg-white transition-all outline-none font-medium";
const labelCls = "block text-[10px] font-black text-[#596063] uppercase tracking-widest mb-2";

// ─────────────────────────────────────────────────────────────────────────────

export default function AjoutMedicament() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: "", dosage: "", forme: "Comprimé", categorie: "Antibiotique",
    prixAchat: "", prixVente: "", stockInitial: "", dateExpiration: "",
    fournisseur: "", description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nom || !form.dosage || !form.prixVente || !form.stockInitial) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setLoading(true);
    // TODO: appel API
    await new Promise((r) => setTimeout(r, 600));
    alert(`Médicament "${form.nom} ${form.dosage}" ajouté avec succès !`);
    navigate("/medicaments");
    setLoading(false);
  };

  return (
    <main className="p-8 animate-in fade-in duration-700">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Nouveau médicament</h1>
            <p className="text-slate-500 mt-1 font-medium text-sm">
              Ajoutez un produit à l'inventaire de la pharmacie.
            </p>
          </div>
          <button onClick={() => navigate(-1)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1 : Informations générales */}
          <Bloc titre="Informations générales">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Nom du médicament <span className="text-red-500">*</span></label>
                <input name="nom" value={form.nom} onChange={handleChange}
                  placeholder="ex. Amoxicilline" required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Dosage <span className="text-red-500">*</span></label>
                <input name="dosage" value={form.dosage} onChange={handleChange}
                  placeholder="ex. 500 mg" required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Forme galénique</label>
                <div className="relative">
                  <select name="forme" value={form.forme} onChange={handleChange} className={inputCls}>
                    {FORMES.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Catégorie</label>
                <div className="relative">
                  <select name="categorie" value={form.categorie} onChange={handleChange} className={inputCls}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Description / Indication</label>
                <textarea name="description" value={form.description} onChange={handleChange}
                  rows={2} placeholder="Indication thérapeutique principale…"
                  className={`${inputCls} resize-none`} />
              </div>
            </div>
          </Bloc>

          {/* Section 2 : Stock & Logistique */}
          <Bloc titre="Stock & Logistique">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Prix d'achat (FCFA) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="number" name="prixAchat" value={form.prixAchat} onChange={handleChange}
                    placeholder="0" min={0} required className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Prix de vente (FCFA) <span className="text-red-500">*</span></label>
                <input type="number" name="prixVente" value={form.prixVente} onChange={handleChange}
                  placeholder="0" min={0} required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Stock initial <span className="text-red-500">*</span></label>
                <input type="number" name="stockInitial" value={form.stockInitial} onChange={handleChange}
                  placeholder="0" min={0} required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Date d'expiration</label>
                <input type="date" name="dateExpiration" value={form.dateExpiration} onChange={handleChange}
                  className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Fournisseur</label>
                <input name="fournisseur" value={form.fournisseur} onChange={handleChange}
                  placeholder="ex. COPHARMED, LABOREX, BAYER CI…" className={inputCls} />
              </div>
            </div>
          </Bloc>

          {/* Note informative */}
          <div className="flex items-start gap-3 px-4 py-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl">
            <Info size={16} className="text-[#0062a2] shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              L'ajout de ce médicament sera enregistré dans l'inventaire et visible immédiatement par le gestionnaire de stock.
            </p>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-4 pt-2">
            <button type="button" onClick={() => navigate(-1)}
              className="px-6 py-3 text-slate-700 bg-slate-100 rounded-2xl font-semibold hover:bg-slate-200 transition">
              Annuler
            </button>
            <button type="submit" disabled={loading}
              className="px-8 py-3 bg-[#0062a2] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-[#004f82] transition shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Enregistrement…</>
              ) : (
                <><Save size={16} /> Ajouter à l'inventaire</>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const Bloc = ({ titre, children }) => (
  <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 space-y-4">
    <div className="flex items-center gap-2">
      <div className="w-1 h-4 bg-[#0062a2] rounded-full" />
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{titre}</h3>
    </div>
    {children}
  </div>
);
