import { useState } from "react";
import { Save, Camera, Mail, Phone, MapPin, Award, Clock } from "lucide-react";

const SPECIALITES = [
  "Médecine générale", "Cardiologie", "Neurologie", "Pédiatrie",
  "Gynécologie", "Dermatologie", "Ophtalmologie", "ORL",
];

const JOURS_SEMAINE = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const inputCls = "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all";
const labelCls = "block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2";

// ─────────────────────────────────────────────────────────────────────────────

export default function MonProfil() {
  const [profil, setProfil] = useState({
    prenom: "Moore",
    nom: "Dr.",
    specialite: "Médecine générale",
    email: "dr.moore@clinique-chantal.com",
    telephone: "+225 07 00 00 00 00",
    bureau: "Salle 204",
    bio: "Médecin généraliste avec 15 ans d'expérience. Spécialisé dans le suivi des maladies chroniques et la médecine préventive.",
    dureeConsultation: "30",
  });

  const [disponibilites, setDispo] = useState({
    Lundi: { actif: true, debut: "08:00", fin: "17:00" },
    Mardi: { actif: true, debut: "08:00", fin: "17:00" },
    Mercredi: { actif: true, debut: "08:00", fin: "12:00" },
    Jeudi: { actif: true, debut: "08:00", fin: "17:00" },
    Vendredi: { actif: true, debut: "08:00", fin: "16:00" },
    Samedi: { actif: false, debut: "09:00", fin: "12:00" },
  });

  const [loading, setLoading] = useState(false);

  const handleProfil = (champ, val) =>
    setProfil((prev) => ({ ...prev, [champ]: val }));

  const handleDispo = (jour, champ, val) =>
    setDispo((prev) => ({ ...prev, [jour]: { ...prev[jour], [champ]: val } }));

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    alert("Profil mis à jour avec succès !");
    setLoading(false);
  };

  return (
    <main className="p-8 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* En-tête */}
        <h1 className="text-3xl font-bold text-slate-900">Mon profil</h1>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar + identité */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-3xl bg-[#0062a2] text-white flex items-center justify-center text-3xl font-black shadow-lg">
                  DM
                </div>
                <button type="button"
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm hover:bg-slate-50 transition">
                  <Camera size={14} className="text-slate-600" />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800">Dr. Moore</h2>
                <p className="text-sm text-slate-400 font-medium">{profil.specialite}</p>
                <span className="inline-block mt-2 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  Actif
                </span>
              </div>
            </div>
          </div>

          {/* Informations personnelles */}
          <Bloc icone={<Award size={18} />} titre="Informations professionnelles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Prénom</label>
                <input value={profil.prenom} onChange={(e) => handleProfil("prenom", e.target.value)}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Nom</label>
                <input value={profil.nom} onChange={(e) => handleProfil("nom", e.target.value)}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Spécialité</label>
                <select value={profil.specialite} onChange={(e) => handleProfil("specialite", e.target.value)}
                  className={inputCls}>
                  {SPECIALITES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Bureau / Salle</label>
                <input value={profil.bureau} onChange={(e) => handleProfil("bureau", e.target.value)}
                  placeholder="ex. Salle 204" className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Biographie</label>
                <textarea value={profil.bio} onChange={(e) => handleProfil("bio", e.target.value)}
                  rows={3} className={`${inputCls} resize-none`} />
              </div>
            </div>
          </Bloc>

          {/* Contact */}
          <Bloc icone={<Mail size={18} />} titre="Coordonnées">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>
                  <Mail size={12} className="inline mr-1" /> Adresse e-mail
                </label>
                <input type="email" value={profil.email}
                  onChange={(e) => handleProfil("email", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>
                  <Phone size={12} className="inline mr-1" /> Téléphone
                </label>
                <input type="tel" value={profil.telephone}
                  onChange={(e) => handleProfil("telephone", e.target.value)} className={inputCls} />
              </div>
            </div>
          </Bloc>

          {/* Disponibilités */}
          <Bloc icone={<Clock size={18} />} titre="Disponibilités & horaires">
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-3 mb-1">
                <span className={`col-span-3 ${labelCls}`}>Jour</span>
                <span className={`col-span-2 ${labelCls}`}>Actif</span>
                <span className={`col-span-3 ${labelCls}`}>Début</span>
                <span className={`col-span-3 ${labelCls}`}>Fin</span>
              </div>
              {JOURS_SEMAINE.map((jour) => (
                <div key={jour} className="grid grid-cols-12 gap-3 items-center">
                  <span className="col-span-3 text-sm font-semibold text-slate-700">{jour}</span>
                  <div className="col-span-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer"
                        checked={disponibilites[jour].actif}
                        onChange={(e) => handleDispo(jour, "actif", e.target.checked)} />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:ring-2 peer-focus:ring-[#0062a2]/20 rounded-full peer peer-checked:bg-[#0062a2] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                    </label>
                  </div>
                  <div className="col-span-3">
                    <input type="time" value={disponibilites[jour].debut}
                      disabled={!disponibilites[jour].actif}
                      onChange={(e) => handleDispo(jour, "debut", e.target.value)}
                      className={`${inputCls} ${!disponibilites[jour].actif ? "opacity-40 cursor-not-allowed" : ""}`} />
                  </div>
                  <div className="col-span-3">
                    <input type="time" value={disponibilites[jour].fin}
                      disabled={!disponibilites[jour].actif}
                      onChange={(e) => handleDispo(jour, "fin", e.target.value)}
                      className={`${inputCls} ${!disponibilites[jour].actif ? "opacity-40 cursor-not-allowed" : ""}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <label className={labelCls + " mb-0"}>Durée par défaut d'une consultation</label>
                <select value={profil.dureeConsultation}
                  onChange={(e) => handleProfil("dureeConsultation", e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15">
                  {["15", "20", "30", "45", "60"].map((d) => (
                    <option key={d} value={d}>{d} minutes</option>
                  ))}
                </select>
              </div>
            </div>
          </Bloc>

          {/* Bouton */}
          <div className="flex justify-end">
            <button type="submit" disabled={loading}
              className="px-8 py-3 bg-[#0062a2] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-[#004f82] transition shadow-lg shadow-blue-100 disabled:opacity-50">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Enregistrement…</>
              ) : (
                <><Save size={16} /> Enregistrer les modifications</>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const Bloc = ({ icone, titre, children }) => (
  <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 space-y-4">
    <h3 className="flex items-center gap-2 text-xs font-bold text-[#0062a2] uppercase tracking-wider">
      {icone} {titre}
    </h3>
    {children}
  </div>
);
