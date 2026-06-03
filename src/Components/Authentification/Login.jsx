import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Stethoscope,
  ClipboardList,
  Activity,
  Users,
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

// ─────────────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    clinicId: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Identifiants incorrects. Veuillez réessayer.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white font-['Poppins']">
      {/* ── Panneau gauche ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex lg:w-[58%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
            alt="Clinique"
            className="w-full h-full object-cover"
          />
          {/* Superposition dégradée */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0062a2]/95 via-[#0062a2]/80 to-[#004f82]/90" />
          {/* Cercles décoratifs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#fecb00]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 bg-[#fecb00] rounded-2xl flex items-center justify-center shadow-lg">
            <Stethoscope
              size={22}
              className="text-[#0062a2]"
              strokeWidth={2.5}
            />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Clinique Chantal
          </span>
        </div>

        {/* Accroche centrale */}
        <div className="relative z-10 space-y-8 max-w-lg">
          <div className="space-y-4">
            <span className="inline-block text-[#fecb00] text-xs font-bold uppercase tracking-[0.25em]">
              Système de gestion médicale
            </span>
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              La santé de vos patients,{" "}
              <span className="text-[#fecb00]">organisée</span> au quotidien.
            </h1>
            <p className="text-white/60 text-base leading-relaxed">
              Une plateforme centralisée pour les médecins, pharmaciens,
              réceptionnistes et laborantins de la clinique.
            </p>
          </div>

          {/* Fonctionnalités */}
          <div className="space-y-4">
            <Feature
              icon={<ClipboardList size={18} />}
              label="Dossiers patients centralisés et sécurisés"
            />
            <Feature
              icon={<Activity size={18} />}
              label="Suivi des consultations en temps réel"
            />
            <Feature
              icon={<Users size={18} />}
              label="Accès multi-rôles avec permissions dédiées"
            />
          </div>
        </div>

        {/* Bas de page */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-2.5">
            {[10, 20, 30].map((u) => (
              <img
                key={u}
                src={`https://i.pravatar.cc/80?u=${u}`}
                alt="Praticien"
                className="w-9 h-9 rounded-full border-2 border-[#0062a2] object-cover"
              />
            ))}
          </div>
          <p className="text-white/50 text-xs font-medium uppercase tracking-widest">
            Rejoignez 500+ praticiens
          </p>
        </div>
      </aside>

      {/* ── Panneau droit (formulaire) ─────────────────────────────── */}
      <main className="flex-1 flex flex-col justify-center items-center px-8 md:px-16 py-12 bg-[#fafcff]">
        <div className="w-full max-w-md space-y-10">
          {/* Logo mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-10 h-10 bg-[#0062a2] rounded-2xl flex items-center justify-center">
              <Stethoscope
                size={20}
                className="text-[#fecb00]"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-bold text-lg text-[#0062a2]">
              Clinique Chantal
            </span>
          </div>

          {/* En-tête */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Bon retour 👋
            </h2>
            <p className="text-slate-500 text-sm">
              Connectez-vous à votre espace de travail.
            </p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium">
              <Shield size={16} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* <InputField
              id="clinicId"
              label="Identifiant de la clinique"
              type="text"
              placeholder="ex : CHANTAL-01"
              icon={<Building2 size={17} />}
              value={formData.clinicId}
              onChange={handleChange}
              required
            /> */}

            <InputField
              id="email"
              label="Adresse e-mail"
              type="email"
              placeholder="nom@clinique-chantal.com"
              icon={<Mail size={17} />}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-[11px] font-bold text-slate-500 uppercase tracking-widest"
                >
                  Mot de passe
                </label>
                <button
                  type="button"
                  className="text-xs text-[#0062a2] font-semibold hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0062a2] transition-colors">
                  <Lock size={17} />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#0062a2] text-white font-bold rounded-2xl hover:bg-[#004f82] active:scale-[0.98] transition-all shadow-lg shadow-[#0062a2]/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connexion en cours…
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={18} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Séparateur */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
              Accès autorisé uniquement
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          {/* Bas de formulaire */}
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            En vous connectant vous acceptez notre{" "}
            <a
              href="#"
              className="text-[#0062a2] font-semibold hover:underline"
            >
              politique de confidentialité
            </a>{" "}
            et les{" "}
            <a
              href="#"
              className="text-[#0062a2] font-semibold hover:underline"
            >
              conditions d'utilisation
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const InputField = ({
  id,
  label,
  type,
  placeholder,
  icon,
  value,
  onChange,
  required,
}) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="text-[11px] font-bold text-slate-500 uppercase tracking-widest"
    >
      {label}
    </label>
    <div className="relative group">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0062a2] transition-colors">
        {icon}
      </span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all"
      />
    </div>
  </div>
);

const Feature = ({ icon, label }) => (
  <div className="flex items-center gap-4">
    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#fecb00] shrink-0">
      {icon}
    </div>
    <span className="text-white/75 text-sm font-medium">{label}</span>
  </div>
);
