import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Stethoscope, Activity, ClipboardList,
  FileText, Save, X, Plus, Trash2, ChevronDown,
} from "lucide-react";

const PATIENTS = [
  { id: "PAT-2025-0012", nom: "Dupont Alain",    age: 40 },
  { id: "PAT-2025-0013", nom: "Martin Béatrice",  age: 53 },
  { id: "PAT-2025-0014", nom: "Lefebvre Charles", age: 35 },
  { id: "PAT-2025-0015", nom: "Petit Diane",      age: 5  },
];

const ACTES = [
  "Consultation générale", "Consultation spécialisée", "ECG",
  "Radiographie", "Prise de sang", "Echographie", "Sutures",
  "Injection", "Soins infirmiers", "Vaccination",
];

const MEDICAMENTS = [
  "Paracétamol", "Amoxicilline", "Ibuprofène", "Metformine",
  "Lisinopril", "Atorvastatine", "Oméprazole", "Amlopdipine",
];

const inputCls = "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all";
const labelCls = "block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2";

// ─────────────────────────────────────────────────────────────────────────────

export default function NouvelleConsultation() {
  const navigate = useNavigate();

  const [patientId, setPatientId]   = useState("");
  const [motif, setMotif]           = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [facteurs, setFacteurs]     = useState("");
  const [notes, setNotes]           = useState("");
  const [actesChoisis, setActes]    = useState([]);
  const [loading, setLoading]       = useState(false);

  const [vitaux, setVitaux] = useState({
    tension: "", pouls: "", temperature: "", poids: "", taille: "",
  });

  const [lignesOrdonnance, setLignes] = useState([
    { medicament: "", dose: "", frequence: "", duree: "" },
  ]);

  const handleVitaux = (champ, val) =>
    setVitaux((prev) => ({ ...prev, [champ]: val }));

  const toggleActe = (acte) =>
    setActes((prev) =>
      prev.includes(acte) ? prev.filter((a) => a !== acte) : [...prev, acte]
    );

  const ajouterLigne = () =>
    setLignes((prev) => [...prev, { medicament: "", dose: "", frequence: "", duree: "" }]);

  const supprimerLigne = (i) =>
    setLignes((prev) => prev.filter((_, idx) => idx !== i));

  const handleLigne = (i, champ, val) =>
    setLignes((prev) => prev.map((l, idx) => idx === i ? { ...l, [champ]: val } : l));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId || !motif || !diagnostic) {
      alert("Veuillez remplir : patient, motif et diagnostic.");
      return;
    }
    setLoading(true);
    // TODO: appel API
    await new Promise((r) => setTimeout(r, 800));
    alert("Consultation enregistrée avec succès !");
    navigate("/gestion-consultation");
    setLoading(false);
  };

  return (
    <main className="p-8 animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Nouvelle consultation</h1>
            <p className="text-slate-500 mt-1 font-medium text-sm">
              Remplissez chaque section puis cliquez sur <strong>Clôturer</strong>.
            </p>
          </div>
          <button onClick={() => navigate(-1)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1 — Patient & motif */}
          <Bloc icone={<User size={18} />} titre="Patient & Motif">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Patient <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select value={patientId} onChange={(e) => setPatientId(e.target.value)}
                    required className={inputCls}>
                    <option value="">Sélectionner un patient</option>
                    {PATIENTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nom} — {p.age} ans ({p.id})
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Motif de consultation <span className="text-red-500">*</span></label>
                <input value={motif} onChange={(e) => setMotif(e.target.value)}
                  placeholder="ex. Douleurs thoraciques, suivi hypertension…"
                  required className={inputCls} />
              </div>
            </div>
          </Bloc>

          {/* Section 2 — Signes vitaux */}
          <Bloc icone={<Activity size={18} />} titre="Signes vitaux">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <VitalField label="Tension (mmHg)"  placeholder="120/80" champ="tension"     vitaux={vitaux} onChange={handleVitaux} />
              <VitalField label="Pouls (bpm)"      placeholder="72"     champ="pouls"       vitaux={vitaux} onChange={handleVitaux} />
              <VitalField label="Température (°C)" placeholder="37,0"   champ="temperature" vitaux={vitaux} onChange={handleVitaux} />
              <VitalField label="Poids (kg)"       placeholder="70"     champ="poids"       vitaux={vitaux} onChange={handleVitaux} />
              <VitalField label="Taille (cm)"      placeholder="175"    champ="taille"      vitaux={vitaux} onChange={handleVitaux} />
            </div>
          </Bloc>

          {/* Section 3 — Diagnostic */}
          <Bloc icone={<Stethoscope size={18} />} titre="Diagnostic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Diagnostic principal <span className="text-red-500">*</span></label>
                <input value={diagnostic} onChange={(e) => setDiagnostic(e.target.value)}
                  placeholder="ex. Hypertension artérielle essentielle"
                  required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Facteurs associés</label>
                <input value={facteurs} onChange={(e) => setFacteurs(e.target.value)}
                  placeholder="ex. Diabète type 2, Obésité"
                  className={inputCls} />
              </div>
            </div>
          </Bloc>

          {/* Section 4 — Actes médicaux */}
          <Bloc icone={<ClipboardList size={18} />} titre="Actes médicaux effectués">
            <div className="flex flex-wrap gap-2">
              {ACTES.map((acte) => (
                <button key={acte} type="button" onClick={() => toggleActe(acte)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    actesChoisis.includes(acte)
                      ? "bg-[#0062a2] text-white border-[#0062a2] shadow-sm"
                      : "bg-white text-slate-500 border-slate-200 hover:border-[#0062a2]/40"
                  }`}>
                  {acte}
                </button>
              ))}
            </div>
          </Bloc>

          {/* Section 5 — Ordonnance */}
          <Bloc icone={<FileText size={18} />} titre="Ordonnance">
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-3 mb-1">
                <span className={`col-span-4 ${labelCls}`}>Médicament</span>
                <span className={`col-span-2 ${labelCls}`}>Dosage</span>
                <span className={`col-span-3 ${labelCls}`}>Fréquence</span>
                <span className={`col-span-2 ${labelCls}`}>Durée</span>
              </div>
              {lignesOrdonnance.map((ligne, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-4">
                    <select value={ligne.medicament} onChange={(e) => handleLigne(i, "medicament", e.target.value)}
                      className={inputCls}>
                      <option value="">Sélectionner</option>
                      {MEDICAMENTS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input value={ligne.dose} onChange={(e) => handleLigne(i, "dose", e.target.value)}
                      placeholder="500 mg" className={inputCls} />
                  </div>
                  <div className="col-span-3">
                    <input value={ligne.frequence} onChange={(e) => handleLigne(i, "frequence", e.target.value)}
                      placeholder="2 fois/jour" className={inputCls} />
                  </div>
                  <div className="col-span-2">
                    <input value={ligne.duree} onChange={(e) => handleLigne(i, "duree", e.target.value)}
                      placeholder="7 jours" className={inputCls} />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    {lignesOrdonnance.length > 1 && (
                      <button type="button" onClick={() => supprimerLigne(i)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition">
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button type="button" onClick={ajouterLigne}
                className="flex items-center gap-2 text-xs font-bold text-[#0062a2] hover:underline mt-1">
                <Plus size={14} /> Ajouter un médicament
              </button>
            </div>
          </Bloc>

          {/* Section 6 — Notes cliniques */}
          <Bloc icone={<FileText size={18} />} titre="Notes cliniques">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
              rows={4} placeholder="Observations, recommandations, points de suivi…"
              className={`${inputCls} resize-none`} />
          </Bloc>

          {/* Actions */}
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
                <><Save size={16} /> Clôturer la consultation</>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const Bloc = ({ icone, titre, children }) => (
  <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 space-y-4">
    <h3 className="flex items-center gap-2 text-xs font-bold text-[#0062a2] uppercase tracking-wider">
      {icone} {titre}
    </h3>
    {children}
  </div>
);

const VitalField = ({ label, placeholder, champ, vitaux, onChange }) => (
  <div>
    <label className={labelCls}>{label}</label>
    <input value={vitaux[champ]} onChange={(e) => onChange(champ, e.target.value)}
      placeholder={placeholder} className={inputCls} />
  </div>
);
