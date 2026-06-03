import React from "react";
import {
  FiCalendar, FiClock, FiFileText, FiActivity,
  FiAlertTriangle, FiHeart, FiThermometer,
  FiDroplet, FiArrowRight, FiCheck,
} from "react-icons/fi";
import { GiPill } from "react-icons/gi";
import { MdMedicalInformation, MdHistory } from "react-icons/md";

// ─────────────────────────────────────────────────────────────────────────────

const DetailConsultation = () => {
  return (
    <main className="lg:pl-64 pt-24 pb-32 min-h-screen px-4 md:px-8 max-w-7xl mx-auto bg-[#fcfdfe] font-['Inter']">
      {/* En-tête */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black font-['Manrope'] text-[#2c3436] tracking-tight">
            Détail de la consultation
          </h1>
          <p className="text-slate-400 text-sm font-medium mt-2 flex items-center gap-2">
            <FiClock className="text-[#0062a2]" />
            Dossier créé le 12 oct. 2023 à 09 h 45
          </p>
        </div>
        <span className="bg-emerald-50 text-emerald-600 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-emerald-100 shadow-sm">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Terminée
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Colonne gauche */}
        <div className="lg:col-span-8 space-y-8">
          {/* Carte patient */}
          <section className="bg-white rounded-[2rem] p-8 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden border border-slate-50">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#0062a2]" />
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <div className="w-24 h-24 rounded-3xl bg-[#0062a2] text-white flex items-center justify-center text-3xl font-black shadow-xl shrink-0">
                JM
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <InfoBloc label="Nom du patient" valeur="Jean-Pierre Martin" gras />
                <InfoBloc label="Identité" valeur="62 ans, Masculin" sousValeur="#PAT-2025-0012" />
                <InfoBloc label="Dernière visite" valeur="12 oct. 2023" />
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.15em]">
                    Actes médicaux
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Etiquette label="Consultation" />
                    <Etiquette label="ECG" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Diagnostic & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-[#f0f4f6] rounded-[2rem] p-8 space-y-6 border border-white/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <MdMedicalInformation className="text-xl text-[#0062a2]" />
                </div>
                <h3 className="font-black text-[#2c3436] uppercase text-xs tracking-widest">
                  Diagnostic
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                    Diagnostic principal
                  </p>
                  <div className="bg-gradient-to-br from-[#0062a2] to-[#004e82] text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 flex items-center justify-between">
                    Hypertension artérielle
                    <FiCheck className="text-white/50" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                    Facteurs associés
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <BadgeSecondaire label="Diabète type 2" />
                    <BadgeSecondaire label="Asthme" />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-50 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiFileText className="text-xl text-[#0062a2]" />
                  </div>
                  <h3 className="font-black text-[#2c3436] uppercase text-xs tracking-widest">
                    Notes cliniques
                  </h3>
                </div>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  Patient présentant une hypertension modérée. Recommandation : marche quotidienne de 30 min et réduction du sel. Glycémie stable.
                </p>
              </div>
              <p className="text-[10px] text-slate-300 italic mt-6 font-bold uppercase tracking-tighter">
                Dicté par — Dr. Moore
              </p>
            </section>
          </div>

          {/* Ordonnance */}
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-50">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <GiPill className="text-xl text-purple-500" />
                </div>
                <h3 className="font-black text-[#2c3436] uppercase text-xs tracking-widest">
                  Ordonnance
                </h3>
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] bg-slate-50 px-4 py-1.5 rounded-full">
                Valable jusqu'au déc. 2025
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <Th label="Médicament" />
                    <Th label="Dosage" />
                    <Th label="Fréquence" />
                    <Th label="Durée" align="right" />
                  </tr>
                </thead>
                <tbody>
                  <LigneOrdonnance nom="Metformine"  dose="500 mg" freq="2 fois/jour"  duree="60 jours" />
                  <LigneOrdonnance nom="Lisinopril"  dose="10 mg"  freq="1 fois/jour"  duree="30 jours" />
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Colonne droite */}
        <div className="lg:col-span-4 space-y-8">
          {/* Signes vitaux */}
          <section className="bg-[#1a1f21] rounded-[2.5rem] p-8 shadow-2xl text-white">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black uppercase text-[10px] tracking-[0.2em] text-blue-400">
                Signes vitaux
              </h3>
              <span className="text-[9px] font-black text-white/50 bg-white/10 px-3 py-1 rounded-lg uppercase">
                À la consultation
              </span>
            </div>
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Tension artérielle
                  </p>
                  <FiAlertTriangle className="text-red-500 animate-pulse text-lg" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-['Manrope'] text-red-500">145/92</span>
                  <span className="text-xs text-slate-500 font-bold">mmHg</span>
                </div>
                <div className="mt-4 text-[9px] font-black text-red-400 uppercase tracking-[0.2em] bg-red-500/10 py-1.5 px-4 rounded-full w-fit border border-red-500/20">
                  Élevée / Critique
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Fréquence cardiaque
                  </p>
                  <FiHeart className="text-emerald-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-['Manrope'] text-emerald-400">78</span>
                  <span className="text-xs text-slate-500 font-bold">bpm</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <VitalMini icone={<FiThermometer />} label="Temp."  valeur="36,8" unite="°C" />
                <VitalMini icone={<FiDroplet />}     label="Sat. O2" valeur="98"   unite="%" />
              </div>
            </div>
          </section>

          {/* Historique récent */}
          <section className="p-6">
            <h3 className="font-black text-[#2c3436] uppercase text-[10px] tracking-[0.2em] mb-10 flex items-center gap-3">
              <MdHistory className="text-lg text-[#0062a2]" />
              Historique récent
            </h3>
            <div className="space-y-10">
              <EvenementTimeline titre="Consultation générale"    meta="15 août 2025 — Dr. Moore"    actif />
              <EvenementTimeline titre="Résultats de laboratoire" meta="02 juil. 2025 — Labo central" />
              <EvenementTimeline titre="Appel de suivi"           meta="20 juin 2025 — Infirmière"    dernier />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const InfoBloc = ({ label, valeur, sousValeur, gras }) => (
  <div className="space-y-1">
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{label}</p>
    <p className={`text-slate-700 ${gras ? "text-lg font-black" : "text-sm font-bold"}`}>
      {valeur}{" "}
      {sousValeur && <span className="text-slate-300 ml-2 font-medium">{sousValeur}</span>}
    </p>
  </div>
);

const Etiquette = ({ label }) => (
  <span className="text-[10px] font-black px-3 py-1 bg-blue-50 text-[#0062a2] rounded-lg border border-blue-100 uppercase tracking-tighter">
    {label}
  </span>
);

const BadgeSecondaire = ({ label }) => (
  <span className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-100 shadow-sm">
    {label}
  </span>
);

const Th = ({ label, align = "left" }) => (
  <th className={`px-4 py-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ${align === "right" ? "text-right" : ""}`}>
    {label}
  </th>
);

const LigneOrdonnance = ({ nom, dose, freq, duree }) => (
  <tr className="bg-[#f8fafb]/50 hover:bg-[#f8fafb] transition-all group">
    <td className="px-5 py-5 font-black text-[#2c3436] rounded-l-2xl group-hover:text-[#0062a2]">{nom}</td>
    <td className="px-5 py-5 text-sm font-bold text-slate-500">{dose}</td>
    <td className="px-5 py-5 text-sm font-bold text-slate-500">{freq}</td>
    <td className="px-5 py-5 text-sm font-black text-[#0062a2] text-right rounded-r-2xl">{duree}</td>
  </tr>
);

const VitalMini = ({ icone, label, valeur, unite }) => (
  <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-blue-400 text-xs">{icone}</span>
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-xl font-black font-['Manrope'] text-white">{valeur}</span>
      <span className="text-[9px] text-slate-500 font-bold">{unite}</span>
    </div>
  </div>
);

const EvenementTimeline = ({ titre, meta, actif, dernier }) => (
  <div className="flex gap-6 group">
    <div className="flex flex-col items-center">
      <div className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${actif ? "bg-[#0062a2] ring-8 ring-blue-50" : "bg-slate-200"}`} />
      {!dernier && <div className="w-0.5 h-14 bg-slate-100 mt-2 rounded-full" />}
    </div>
    <div className="-mt-1">
      <p className={`text-sm ${actif ? "font-black text-[#2c3436]" : "font-bold text-slate-400"}`}>{titre}</p>
      <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tight mt-1">{meta}</p>
    </div>
  </div>
);

export default DetailConsultation;
