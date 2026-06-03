import { useState } from "react";
import {
  User, Phone, Mail, MapPin, Calendar,
  Clock, Stethoscope, Save, X, Shield, AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  "Consultation générale", "Cardiologie", "Pédiatrie",
  "Gynécologie", "Dermatologie", "Ophtalmologie",
  "ORL", "Neurologie", "Radiologie", "Laboratoire",
];

const generateNumeroDossier = () => {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 9000) + 1000);
  return `PAT-${year}-${num}`;
};

// ─────────────────────────────────────────────────────────────────────────────

export default function AjoutPatient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [numeroDossier] = useState(generateNumeroDossier);

  const [formData, setFormData] = useState({
    prenom: "", nom: "", sexe: "", dateNaissance: "",
    adresse: "", telephone: "", email: "",
    contactUrgenceNom: "", contactUrgenceTelephone: "",
    assuranceNom: "", assuranceNumero: "",
  });

  const [serviceSelectionne, setServiceSelectionne] = useState("");
  const [priseRendezVous, setPriseRendezVous]   = useState(false);
  const [dateRendezVous, setDateRendezVous]     = useState("");
  const [heureRendezVous, setHeureRendezVous]   = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { prenom, nom, sexe, dateNaissance, telephone } = formData;
    if (!prenom || !nom || !sexe || !dateNaissance || !telephone || !serviceSelectionne) {
      alert("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }
    if (priseRendezVous && (!dateRendezVous || !heureRendezVous)) {
      alert("Veuillez renseigner la date et l'heure du rendez-vous.");
      setLoading(false);
      return;
    }

    const payload = {
      numeroDossier,
      ...formData,
      service: serviceSelectionne,
      rendezVous: priseRendezVous ? { date: dateRendezVous, heure: heureRendezVous } : null,
    };

    try {
      // TODO: remplacer par l'appel API réel
      await new Promise((r) => setTimeout(r, 800));
      console.log("Patient enregistré :", payload);
      alert(`Patient enregistré avec succès !\nN° de dossier : ${numeroDossier}`);
      navigate("/liste-patients");
    } catch {
      alert("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Nouveau patient</h1>
            <p className="text-slate-500 mt-1 font-medium">
              Numéro de dossier attribué :{" "}
              <span className="font-black text-[#0062a2]">{numeroDossier}</span>
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1 : Informations personnelles */}
          <FormSection icon={<User size={18} />} title="Informations personnelles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Prénom" required>
                <input name="prenom" value={formData.prenom} onChange={handleChange}
                  placeholder="Jean" required className={inputCls} />
              </Field>
              <Field label="Nom" required>
                <input name="nom" value={formData.nom} onChange={handleChange}
                  placeholder="Dupont" required className={inputCls} />
              </Field>
              <Field label="Sexe" required>
                <select name="sexe" value={formData.sexe} onChange={handleChange}
                  required className={inputCls}>
                  <option value="">Sélectionner</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                  <option value="Autre">Autre</option>
                </select>
              </Field>
              <Field label="Date de naissance" required>
                <input type="date" name="dateNaissance" value={formData.dateNaissance}
                  onChange={handleChange} max={new Date().toISOString().split("T")[0]}
                  required className={inputCls} />
              </Field>
            </div>
          </FormSection>

          {/* Section 2 : Contact */}
          <FormSection icon={<Phone size={18} />} title="Informations de contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Adresse" className="md:col-span-2">
                <input name="adresse" value={formData.adresse} onChange={handleChange}
                  placeholder="123 Rue de la Santé, Abidjan" className={inputCls} />
              </Field>
              <Field label="Téléphone" required>
                <input type="tel" name="telephone" value={formData.telephone}
                  onChange={handleChange} placeholder="+225 07 00 00 00 00"
                  required className={inputCls} />
              </Field>
              <Field label="Email">
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="patient@email.com" className={inputCls} />
              </Field>
            </div>
          </FormSection>

          {/* Section 3 : Contact urgence */}
          <FormSection icon={<AlertTriangle size={18} />} title="Contact d'urgence">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nom complet">
                <input name="contactUrgenceNom" value={formData.contactUrgenceNom}
                  onChange={handleChange} placeholder="Marie Dupont" className={inputCls} />
              </Field>
              <Field label="Téléphone">
                <input type="tel" name="contactUrgenceTelephone"
                  value={formData.contactUrgenceTelephone} onChange={handleChange}
                  placeholder="+225 05 00 00 00 00" className={inputCls} />
              </Field>
            </div>
          </FormSection>

          {/* Section 4 : Assurance */}
          <FormSection icon={<Shield size={18} />} title="Assurance / Mutuelle">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nom de l'assurance">
                <input name="assuranceNom" value={formData.assuranceNom}
                  onChange={handleChange} placeholder="MUGEFCI, CNPS..." className={inputCls} />
              </Field>
              <Field label="Numéro de police / adhérent">
                <input name="assuranceNumero" value={formData.assuranceNumero}
                  onChange={handleChange} placeholder="A-0000000" className={inputCls} />
              </Field>
            </div>
          </FormSection>

          {/* Section 5 : Service & Rendez-vous */}
          <FormSection icon={<Stethoscope size={18} />} title="Redirection & Rendez-vous">
            <div className="space-y-4">
              <Field label="Service" required>
                <select value={serviceSelectionne} onChange={(e) => setServiceSelectionne(e.target.value)}
                  required className={inputCls}>
                  <option value="">Sélectionner un service</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                <input type="checkbox" checked={priseRendezVous}
                  onChange={(e) => setPriseRendezVous(e.target.checked)}
                  className="w-4 h-4 accent-[#0062a2]" />
                <span className="text-sm font-semibold text-slate-700">
                  Prendre un rendez-vous maintenant
                </span>
              </label>

              {priseRendezVous && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-1">
                  <Field label="Date du rendez-vous" required icon={<Calendar size={14} />}>
                    <input type="date" value={dateRendezVous}
                      onChange={(e) => setDateRendezVous(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required={priseRendezVous} className={inputCls} />
                  </Field>
                  <Field label="Heure" required icon={<Clock size={14} />}>
                    <input type="time" value={heureRendezVous}
                      onChange={(e) => setHeureRendezVous(e.target.value)}
                      required={priseRendezVous} className={inputCls} />
                  </Field>
                </div>
              )}
            </div>
          </FormSection>

          {/* Boutons */}
          <div className="flex justify-end gap-4 pt-2">
            <button type="button" onClick={() => navigate(-1)}
              className="px-6 py-3 text-slate-700 bg-slate-100 rounded-2xl font-semibold hover:bg-slate-200 transition">
              Annuler
            </button>
            <button type="submit" disabled={loading}
              className="px-8 py-3 bg-[#0062a2] text-white rounded-2xl font-semibold flex items-center gap-2 hover:bg-[#004f82] transition shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Enregistrement...</>
              ) : (
                <><Save size={16} /> Enregistrer le patient</>
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

const inputCls =
  "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0062a2]/20 focus:border-[#0062a2] transition";

const FormSection = ({ icon, title, children }) => (
  <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 space-y-4">
    <h3 className="text-sm font-bold text-[#0062a2] flex items-center gap-2 uppercase tracking-wider">
      {icon} {title}
    </h3>
    {children}
  </div>
);

const Field = ({ label, required, icon, children, className = "" }) => (
  <div className={className}>
    <label className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
      {icon} {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);
