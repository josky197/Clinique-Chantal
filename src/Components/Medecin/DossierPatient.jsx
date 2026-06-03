import React from "react";
import {
  FiPlus,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiEdit3,
  FiDownload,
  FiPieChart,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";
import { LuLayoutList } from "react-icons/lu";

const PATIENTS = [
  { id: "PAT-2025-0012", nom: "Dupont",   prenom: "Alain",    age: 40, sexe: "M", telephone: "06 12 34 56 78", derniereVisite: "28 avr. 2025", statut: "Actif" },
  { id: "PAT-2025-0013", nom: "Martin",   prenom: "Béatrice", age: 53, sexe: "F", telephone: "06 23 45 67 89", derniereVisite: "25 avr. 2025", statut: "Inactif" },
  { id: "PAT-2025-0014", nom: "Lefebvre", prenom: "Charles",  age: 35, sexe: "M", telephone: "06 34 56 78 90", derniereVisite: "20 avr. 2025", statut: "Actif" },
  { id: "PAT-2025-0015", nom: "Petit",    prenom: "Diane",    age: 5,  sexe: "F", telephone: "06 45 67 89 01", derniereVisite: "18 avr. 2025", statut: "Actif" },
];

// ─────────────────────────────────────────────────────────────────────────────

const MesPatients = () => {
  return (
    <main className="lg:ml-64 p-8 min-h-screen bg-[#fcfdfe] font-['Inter']">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black font-['Manrope'] text-[#2c3436] tracking-tight mb-3">
            Mes patients
          </h2>
          <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span className="text-[#0062a2]">1 284 patients au total</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <span>12 nouveaux aujourd'hui</span>
          </div>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-[#0062a2] to-[#004e82] text-white font-black text-xs uppercase tracking-[0.1em] rounded-2xl hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95 shadow-lg shadow-blue-100">
          <FiPlus className="text-lg" />
          Nouveau patient
        </button>
      </div>

      {/* Barre de filtres */}
      <div className="bg-white rounded-3xl p-4 mb-8 flex flex-wrap items-center gap-4 border border-slate-50 shadow-sm">
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] pl-4">
          Filtrer par :
        </span>
        <div className="flex gap-2">
          <FiltreBtn label="Tranche d'âge" />
          <FiltreBtn label="Sexe" />
          <FiltreBtn label="Statut" />
        </div>
        <div className="ml-auto flex items-center gap-2 pr-2">
          <BtnIcone icone={<LuLayoutList />} />
          <BtnIcone icone={<FiDownload />} />
        </div>
      </div>

      {/* Tableau des patients */}
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.03)] border border-slate-50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafb]/50">
                <Th label="Patient" />
                <Th label="Âge / Sexe" />
                <Th label="Téléphone" />
                <Th label="N° Dossier" />
                <Th label="Statut" />
                <Th label="Actions" align="right" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PATIENTS.map((p, i) => (
                <tr key={i} className="hover:bg-[#f8fafb] transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#0062a2] text-white flex items-center justify-center text-sm font-black shadow-md shrink-0">
                        {p.prenom[0]}{p.nom[0]}
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#2c3436]">
                          {p.prenom} {p.nom}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">
                          Dernière visite : {p.derniereVisite}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black font-['Manrope'] text-[#2c3436]">{p.age} ans</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-xs font-bold text-slate-400">
                        {p.sexe === "M" ? "Masculin" : "Féminin"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-black text-slate-600">{p.telephone}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black font-mono text-slate-400 border border-slate-100">
                      {p.id}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <BadgeStatut statut={p.statut} />
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <BtnAction icone={<FiEye />}   couleur="text-[#0062a2]" bg="hover:bg-blue-50" titre="Voir le dossier" />
                      <BtnAction icone={<FiEdit3 />} couleur="text-slate-400"  bg="hover:bg-slate-50" titre="Modifier" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-10 py-8 bg-[#f8fafb]/30 flex items-center justify-between border-t border-slate-50">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Affichage 1 à 10 sur 1 284 patients
          </span>
          <div className="flex items-center gap-2">
            <BtnPage icone={<FiChevronLeft />} desactive />
            <div className="flex gap-1.5 mx-2">
              <BtnPage label="1" actif />
              <BtnPage label="2" />
              <BtnPage label="3" />
              <span className="px-2 text-slate-300 font-black">...</span>
              <BtnPage label="129" />
            </div>
            <BtnPage icone={<FiChevronRight />} />
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Répartition par âge */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0062a2] shadow-inner">
              <FiPieChart className="text-xl" />
            </div>
            <h3 className="text-xs font-black font-['Manrope'] uppercase tracking-widest text-[#2c3436]">
              Répartition par âge
            </h3>
          </div>
          <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden flex shadow-inner">
            <div className="h-full bg-[#0062a2]"           style={{ width: "25%" }} />
            <div className="h-full bg-[#0062a2]/40"        style={{ width: "45%" }} />
            <div className="h-full bg-slate-200"           style={{ width: "30%" }} />
          </div>
          <div className="mt-8 flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <LegendItem couleur="bg-[#0062a2]"      label="0-18 ans" />
            <LegendItem couleur="bg-[#0062a2]/40"   label="19-45 ans" />
            <LegendItem couleur="bg-slate-200"      label="46 ans +" />
          </div>
        </div>

        {/* Volume de consultations */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
              <FiTrendingUp className="text-xl" />
            </div>
            <h3 className="text-xs font-black font-['Manrope'] uppercase tracking-widest text-[#2c3436]">
              Volume de consultations
            </h3>
          </div>
          <div className="flex items-end gap-2.5 h-16 mb-4">
            <Barre hauteur="40%" />
            <Barre hauteur="60%" />
            <Barre hauteur="30%" />
            <Barre hauteur="80%" opaque />
            <Barre hauteur="100%" actif />
            <Barre hauteur="70%" opaque />
            <Barre hauteur="45%" />
          </div>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            +8,4 % par rapport au mois dernier
          </p>
        </div>

        {/* CTA Nouveau dossier */}
        <div className="bg-gradient-to-br from-[#1a1f21] to-[#2c3436] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <FiShield className="absolute -right-6 -bottom-6 text-white/5 text-[10rem] group-hover:scale-110 transition-transform duration-700" />
          <h3 className="text-xs font-black font-['Manrope'] uppercase tracking-[0.2em] text-blue-400 mb-4">
            Nouveau dossier
          </h3>
          <p className="text-xs text-slate-400 font-bold leading-relaxed mb-8 relative z-10">
            Enregistrez un nouveau patient et créez son dossier médical complet en quelques étapes.
          </p>
          <button className="relative z-10 bg-white text-[#1a1f21] text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-white/10 transition-all active:scale-95">
            Créer un dossier
          </button>
        </div>
      </div>
    </main>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const FiltreBtn = ({ label }) => (
  <button className="bg-[#f8fafb] px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-transparent hover:border-blue-100 hover:text-[#0062a2] transition-all flex items-center gap-2">
    {label} <FiChevronDown />
  </button>
);

const BtnIcone = ({ icone }) => (
  <button className="p-3 text-slate-300 hover:text-[#0062a2] hover:bg-blue-50 rounded-xl transition-all">
    {React.cloneElement(icone, { size: 18 })}
  </button>
);

const Th = ({ label, align = "left" }) => (
  <th className={`px-8 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ${align === "right" ? "text-right" : ""}`}>
    {label}
  </th>
);

const BadgeStatut = ({ statut }) => (
  <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${statut === "Actif" ? "bg-blue-50 text-[#0062a2] border-blue-100" : "bg-slate-50 text-slate-400 border-slate-100"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${statut === "Actif" ? "bg-[#0062a2] shadow-[0_0_8px_rgba(0,98,162,0.4)]" : "bg-slate-300"}`} />
    {statut}
  </span>
);

const BtnAction = ({ icone, couleur, bg, titre }) => (
  <button title={titre} className={`p-2.5 rounded-xl transition-all ${couleur} ${bg}`}>
    {React.cloneElement(icone, { size: 18 })}
  </button>
);

const BtnPage = ({ label, icone, actif, desactive }) => (
  <button className={`w-9 h-9 flex items-center justify-center text-[10px] font-black rounded-xl transition-all ${actif ? "bg-[#0062a2] text-white shadow-lg shadow-blue-100" : "text-slate-400 hover:bg-white hover:text-[#0062a2] border border-transparent hover:border-slate-100"} ${desactive ? "opacity-20 cursor-not-allowed" : ""}`}>
    {icone || label}
  </button>
);

const LegendItem = ({ couleur, label }) => (
  <span className="flex items-center gap-2">
    <span className={`w-2 h-2 rounded-full ${couleur}`} />
    {label}
  </span>
);

const Barre = ({ hauteur, actif, opaque }) => (
  <div className={`flex-1 rounded-t-lg transition-all duration-500 ${actif ? "bg-[#0062a2]" : opaque ? "bg-[#0062a2]/40" : "bg-slate-100"}`}
    style={{ height: hauteur }} />
);

export default MesPatients;
