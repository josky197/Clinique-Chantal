import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FlaskConical, Save, X, AlertTriangle,
  CheckCircle2, ArrowLeft, Info,
} from "lucide-react";

// Données de l'examen (en production : chargé via API avec l'ID)
const EXAMENS_DATA = {
  1: { patient: "Alain Dupont",     dossier: "PAT-2025-0012", type: "Analyse sanguine", medecin: "Dr. Moore",  date: "01/05/2025", priorite: "Normale" },
  2: { patient: "Béatrice Martin",  dossier: "PAT-2025-0013", type: "ECBU",             medecin: "Dr. Dupont", date: "01/05/2025", priorite: "Urgente"  },
  3: { patient: "Charles Lefebvre", dossier: "PAT-2025-0014", type: "Glycémie",         medecin: "Dr. Moore",  date: "01/05/2025", priorite: "Normale"  },
  4: { patient: "Diane Petit",      dossier: "PAT-2025-0015", type: "NFS",              medecin: "Dr. Vance",  date: "01/05/2025", priorite: "Urgente"  },
};

// Paramètres par type d'examen avec plages normales
const PARAMETRES = {
  "Analyse sanguine": [
    { id: "glucose",      label: "Glucose",          unite: "mmol/L",  min: 3.9, max: 6.1  },
    { id: "cholesterol",  label: "Cholestérol total", unite: "mmol/L",  min: 0,   max: 5.2  },
    { id: "triglycerides",label: "Triglycérides",    unite: "mmol/L",  min: 0,   max: 1.7  },
    { id: "creatinine",   label: "Créatinine",       unite: "µmol/L",  min: 62,  max: 115  },
    { id: "uree",         label: "Urée",             unite: "mmol/L",  min: 2.5, max: 7.6  },
  ],
  "NFS": [
    { id: "globules_rouges", label: "Globules rouges",   unite: "×10¹²/L", min: 4.5, max: 5.9  },
    { id: "hemoglobine",     label: "Hémoglobine",       unite: "g/dL",    min: 13.5,max: 17.5 },
    { id: "hematocrite",     label: "Hématocrite",       unite: "%",       min: 41,  max: 53   },
    { id: "globules_blancs", label: "Globules blancs",   unite: "×10⁹/L",  min: 4.0, max: 11.0 },
    { id: "plaquettes",      label: "Plaquettes",        unite: "×10⁹/L",  min: 150, max: 400  },
  ],
  "Glycémie": [
    { id: "glycemie_jeun",   label: "Glycémie à jeun",  unite: "mmol/L",  min: 3.9, max: 5.5  },
    { id: "hba1c",           label: "HbA1c",            unite: "%",       min: 0,   max: 5.7  },
  ],
  "ECBU": [
    { id: "leucocytes",  label: "Leucocytes",   unite: "/µL",  min: 0,   max: 10   },
    { id: "hematies",    label: "Hématies",     unite: "/µL",  min: 0,   max: 5    },
    { id: "nitrites",    label: "Nitrites",     unite: "",     type: "select", options: ["Négatif", "Positif"] },
    { id: "germe",       label: "Germe isolé",  unite: "",     type: "text",   placeholder: "ex. E. coli" },
  ],
  "Bilan hépatique": [
    { id: "alat",        label: "ALAT",         unite: "UI/L", min: 7,   max: 56   },
    { id: "asat",        label: "ASAT",         unite: "UI/L", min: 10,  max: 40   },
    { id: "bilirubine",  label: "Bilirubine tot.", unite: "µmol/L", min: 5, max: 17 },
    { id: "ggt",         label: "GGT",          unite: "UI/L", min: 9,   max: 48   },
  ],
  "Ionogramme": [
    { id: "sodium",      label: "Sodium (Na⁺)", unite: "mmol/L", min: 136, max: 145 },
    { id: "potassium",   label: "Potassium (K⁺)", unite: "mmol/L", min: 3.5, max: 5.1 },
    { id: "chlore",      label: "Chlore (Cl⁻)", unite: "mmol/L", min: 98, max: 107  },
    { id: "bicarbonate", label: "Bicarbonates",  unite: "mmol/L", min: 22, max: 29  },
  ],
};

const inputCls = "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all";

// ─────────────────────────────────────────────────────────────────────────────

export default function SaisieResultats() {
  const { id } = useParams();
  const navigate = useNavigate();

  const examen = EXAMENS_DATA[Number(id)] ?? EXAMENS_DATA[3];
  const parametres = PARAMETRES[examen.type] ?? PARAMETRES["Glycémie"];

  const initialValues = Object.fromEntries(parametres.map((p) => [p.id, ""]));
  const [valeurs, setValeurs]       = useState(initialValues);
  const [commentaire, setCommentaire] = useState("");
  const [loading, setLoading]       = useState(false);

  const handleChange = (id, val) => setValeurs((prev) => ({ ...prev, [id]: val }));

  const isAnormal = (param) => {
    if (!param.min && !param.max) return false;
    const val = parseFloat(valeurs[param.id]);
    if (isNaN(val)) return false;
    return val < param.min || val > param.max;
  };

  const nbAnormaux = parametres.filter(isAnormal).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: appel API
    await new Promise((r) => setTimeout(r, 700));
    alert(`Résultats transmis au ${examen.medecin} avec succès !`);
    navigate("/examens");
    setLoading(false);
  };

  return (
    <main className="p-8 animate-in fade-in duration-700">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Saisie des résultats</h1>
            <p className="text-slate-500 mt-0.5 text-sm font-medium">
              {examen.type} — {examen.patient}
            </p>
          </div>
        </div>

        {/* Carte patient */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0062a2] text-white flex items-center justify-center shrink-0">
                <FlaskConical size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-800">{examen.patient}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {examen.dossier} — Prescrit par {examen.medecin} le {examen.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {examen.priorite === "Urgente" && (
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase px-3 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-100">
                  <AlertTriangle size={12} /> Urgent
                </span>
              )}
              <span className="text-[10px] font-bold uppercase px-3 py-1.5 rounded-xl bg-blue-50 text-[#0062a2]">
                {examen.type}
              </span>
            </div>
          </div>
        </div>

        {/* Alerte valeurs anormales */}
        {nbAnormaux > 0 && (
          <div className="flex items-center gap-3 px-5 py-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
            <AlertTriangle size={16} className="shrink-0" />
            {nbAnormaux} valeur{nbAnormaux > 1 ? "s" : ""} en dehors des normes — vérifiez avant de valider.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tableau de saisie */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Paramètres — {examen.type}
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {parametres.map((param) => {
                const anormal = isAnormal(param);
                return (
                  <div key={param.id} className={`px-6 py-4 flex items-center gap-6 ${anormal ? "bg-red-50/30" : ""}`}>
                    {/* Indicateur */}
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      valeurs[param.id] === "" ? "bg-slate-200" :
                      anormal ? "bg-red-500 animate-pulse" : "bg-green-500"
                    }`} />

                    {/* Libellé */}
                    <div className="w-44 shrink-0">
                      <p className="text-sm font-bold text-slate-700">{param.label}</p>
                      {param.min !== undefined && param.max !== undefined && (
                        <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <Info size={10} />
                          Norme : {param.min} – {param.max} {param.unite}
                        </p>
                      )}
                    </div>

                    {/* Champ de saisie */}
                    <div className="flex-1">
                      {param.type === "select" ? (
                        <select value={valeurs[param.id]}
                          onChange={(e) => handleChange(param.id, e.target.value)}
                          className={inputCls}>
                          <option value="">Sélectionner</option>
                          {param.options.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : param.type === "text" ? (
                        <input type="text" value={valeurs[param.id]}
                          onChange={(e) => handleChange(param.id, e.target.value)}
                          placeholder={param.placeholder ?? ""}
                          className={inputCls} />
                      ) : (
                        <input type="number" step="any" value={valeurs[param.id]}
                          onChange={(e) => handleChange(param.id, e.target.value)}
                          placeholder="—"
                          className={`${inputCls} ${anormal ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`} />
                      )}
                    </div>

                    {/* Unité + statut */}
                    <div className="w-24 text-right shrink-0">
                      {param.unite && (
                        <span className="text-xs text-slate-400 font-medium">{param.unite}</span>
                      )}
                      {anormal && (
                        <span className="block text-[10px] font-bold text-red-500 mt-0.5">Anormal</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Commentaire */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
              Commentaire du laborantin
            </label>
            <textarea value={commentaire} onChange={(e) => setCommentaire(e.target.value)}
              rows={3} placeholder="Observations, remarques, recommandations…"
              className={`${inputCls} resize-none`} />
          </div>

          {/* Récap avant envoi */}
          <div className="bg-slate-50 rounded-2xl px-5 py-4 flex items-center gap-3 text-sm text-slate-600">
            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
            Les résultats seront transmis directement à <strong className="mx-1">{examen.medecin}</strong>
            et rattachés au dossier <strong className="ml-1">{examen.dossier}</strong>.
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => navigate(-1)}
              className="px-6 py-3 text-slate-700 bg-slate-100 rounded-2xl font-semibold hover:bg-slate-200 transition">
              Annuler
            </button>
            <button type="submit" disabled={loading}
              className="px-8 py-3 bg-[#0062a2] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-[#004f82] transition shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Envoi…</>
              ) : (
                <><Save size={16} /> Valider et transmettre</>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
