import React from "react";
import {
  FiCamera, FiShield, FiPhone, FiMail,
  FiMapPin, FiX, FiAlertCircle, FiArrowRight,
} from "react-icons/fi";
import { MdOutlineEmergencyShare } from "react-icons/md";

// ─────────────────────────────────────────────────────────────────────────────

const ProfilPatient = () => {
  return (
    <main className="lg:ml-72 flex-1 p-8 md:p-12 pb-32 bg-[#fcfdfe] min-h-screen font-['Inter']">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <header className="mb-16">
          <h1 className="text-4xl font-black font-['Manrope'] text-[#2c3436] tracking-tight mb-3">
            Profil du patient
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 bg-blue-50 text-[#0062a2] font-mono text-[10px] rounded-full font-black border border-blue-100 shadow-sm">
              ID : PAT-2025-0012
            </span>
            <span className="text-slate-400 text-xs font-medium italic">
              Créé le 24 oct. 2023
            </span>
          </div>
        </header>

        <form className="space-y-24">
          {/* Section 1 : Informations personnelles */}
          <section id="personnel" className="space-y-10">
            <EnteteSection numero="1" titre="Informations personnelles" badge="Identité" />
            <div className="grid grid-cols-12 gap-10 items-start">
              {/* Photo */}
              <div className="col-span-12 sm:col-span-3 flex flex-col items-center gap-4 group">
                <div className="w-36 h-36 rounded-[2.5rem] bg-slate-50 flex items-center justify-center relative overflow-hidden border-2 border-dashed border-slate-200 group-hover:border-[#0062a2] transition-all duration-500 shadow-inner">
                  <FiCamera className="text-4xl text-slate-300 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-[#0062a2]/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-[2px]">
                    <span className="text-[#0062a2] font-black text-[10px] uppercase tracking-widest">
                      Ajouter une photo
                    </span>
                  </div>
                </div>
                <p className="text-[9px] font-black text-slate-300 text-center uppercase tracking-widest leading-tight">
                  JPG ou PNG.<br />Max 2 Mo.
                </p>
              </div>

              {/* Champs */}
              <div className="col-span-12 sm:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <Libelle label="Nom complet" required />
                  <input type="text" placeholder="ex. Jean-Pierre Martin" className={inputCls} />
                  <FiAlertCircle className="absolute right-4 top-[52px] text-red-400 text-xs" />
                </div>
                <div>
                  <Libelle label="Date de naissance" />
                  <input type="date" className={inputCls} />
                </div>
                <div className="md:col-span-2">
                  <Libelle label="Sexe" />
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <RadioSexe id="feminin"    label="Féminin"   nom="sexe" />
                    <RadioSexe id="masculin"   label="Masculin"  nom="sexe" />
                    <RadioSexe id="autre"      label="Autre"     nom="sexe" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 : Coordonnées */}
          <section id="contact" className="space-y-10">
            <EnteteSection numero="2" titre="Coordonnées" badge="Contact" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <Libelle label="Téléphone principal" icone={<FiPhone />} />
                  <input type="tel" placeholder="+225 07 00 00 00 00" className={inputCls} />
                </div>
                <div>
                  <Libelle label="Adresse e-mail" icone={<FiMail />} />
                  <input type="email" placeholder="patient@clinique.com" className={inputCls} />
                </div>
              </div>
              <div>
                <Libelle label="Adresse de résidence" icone={<FiMapPin />} />
                <textarea rows="5" placeholder="Rue, Ville, Code postal"
                  className={`${inputCls} resize-none`} />
              </div>
            </div>
          </section>

          {/* Section 3 : Administratif & Urgence */}
          <section id="administratif" className="space-y-10">
            <EnteteSection numero="3" titre="Administratif & Urgence" badge="Conformité" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 p-8 bg-[#f8fafb] rounded-[2rem] space-y-8 border border-slate-50">
                <h4 className="text-[10px] font-black text-[#2c3436] flex items-center gap-3 uppercase tracking-[0.2em]">
                  <FiShield className="text-blue-500" />
                  Assurance / Mutuelle
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Libelle label="Nom de l'assurance" petit />
                    <select className={inputCls}>
                      <option>MUGEFCI</option>
                      <option>CNPS</option>
                      <option>Sanlam</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Libelle label="N° de police / adhérent" petit />
                    <input type="text" className={inputCls} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 bg-[#f8fafb] rounded-[2rem] space-y-8 border border-slate-50">
                <h4 className="text-[10px] font-black text-[#2c3436] flex items-center gap-3 uppercase tracking-[0.2em]">
                  <MdOutlineEmergencyShare className="text-red-400 text-base" />
                  Contact d'urgence
                </h4>
                <div className="space-y-6">
                  <div>
                    <Libelle label="Nom complet" petit />
                    <input type="text" className={inputCls} />
                  </div>
                  <div>
                    <Libelle label="Téléphone" petit />
                    <input type="tel" className={inputCls} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 : Antécédents médicaux */}
          <section id="medical" className="space-y-10">
            <EnteteSection numero="4" titre="Antécédents médicaux" badge="Contexte clinique" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <CarteHistorique label="Allergies" couleur="red">
                <Etiquette label="Arachides"   type="erreur" />
                <Etiquette label="Pénicilline" type="erreur" />
                <button className="px-4 py-1.5 border border-dashed border-slate-200 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-slate-50 hover:text-slate-500 transition-all">
                  + Ajouter
                </button>
              </CarteHistorique>

              <CarteHistorique label="Maladies chroniques" couleur="blue">
                <Etiquette label="Asthme"      type="primaire" />
                <Etiquette label="Diabète T2"  type="primaire" />
                <button className="px-4 py-1.5 border border-dashed border-slate-200 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-slate-50 hover:text-slate-500 transition-all">
                  + Ajouter
                </button>
              </CarteHistorique>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                <ZoneHistorique label="Antécédents chirurgicaux"    placeholder="ex. Appendicectomie (2015)…" />
                <ZoneHistorique label="Médicaments en cours"        placeholder="ex. Metformine 500 mg/jour…" />
              </div>
            </div>
          </section>

          {/* Bouton enregistrer */}
          <div className="pt-10 flex justify-end">
            <button className="group flex items-center gap-4 bg-[#1a1f21] text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#0062a2] transition-all shadow-2xl shadow-slate-200">
              Enregistrer les modifications
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const inputCls = "w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-[#2c3436] placeholder:text-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-[#0062a2] transition-all outline-none shadow-sm";

const EnteteSection = ({ numero, titre, badge }) => (
  <div className="flex items-end justify-between border-b-2 border-slate-50 pb-6">
    <div className="flex items-center gap-4">
      <span className="w-8 h-8 rounded-xl bg-[#1a1f21] text-white flex items-center justify-center text-xs font-black">{numero}</span>
      <h3 className="text-xl font-black font-['Manrope'] text-[#2c3436] tracking-tight">{titre}</h3>
    </div>
    <span className="text-[10px] text-[#0062a2] font-black uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-md">{badge}</span>
  </div>
);

const Libelle = ({ label, required, icone, petit }) => (
  <label className={`flex items-center gap-2 font-black text-[#2c3436] uppercase tracking-widest mb-3 ml-1 ${petit ? "text-[9px] text-slate-400" : "text-[10px]"}`}>
    {icone && <span className="text-blue-500">{icone}</span>}
    {label}
    {required && <span className="text-red-400 ml-1 opacity-50">*</span>}
  </label>
);

const RadioSexe = ({ id, label, nom }) => (
  <label className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-slate-100 rounded-2xl cursor-pointer hover:border-blue-100 transition-all has-[:checked]:border-[#0062a2] has-[:checked]:bg-blue-50 group shadow-sm">
    <input type="radio" name={nom} id={id} className="hidden" />
    <span className="text-xs font-black text-slate-400 group-has-[:checked]:text-[#0062a2] uppercase tracking-widest">{label}</span>
  </label>
);

const CarteHistorique = ({ label, children }) => (
  <div className="space-y-4">
    <Libelle label={label} />
    <div className="bg-white border border-slate-50 p-6 rounded-[2rem] min-h-[140px] flex flex-wrap gap-3 content-start shadow-sm">
      {children}
    </div>
  </div>
);

const Etiquette = ({ label, type }) => (
  <span className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 shadow-sm ${type === "erreur" ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"}`}>
    {label}
    <FiX className="cursor-pointer hover:scale-125 transition-transform" />
  </span>
);

const ZoneHistorique = ({ label, placeholder }) => (
  <div className="space-y-4">
    <Libelle label={label} />
    <textarea placeholder={placeholder} rows="4"
      className="w-full bg-white border border-slate-50 rounded-[2rem] px-6 py-5 text-sm font-bold text-[#2c3436] placeholder:text-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-[#0062a2] transition-all outline-none shadow-sm resize-none" />
  </div>
);

export default ProfilPatient;
