import React from "react";
import {
  FiUsers, FiClock, FiCheckCircle, FiAlertCircle,
  FiCalendar, FiRefreshCw, FiEye, FiEdit2,
  FiChevronLeft, FiChevronRight, FiZap,
  FiMoreHorizontal, FiArrowRight,
} from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const CONSULTATIONS = [
  { id: "#PAT-9821", nom: "Elena Gilbert",    medecin: "Dr. Moore",  initiale: "JV", date: "24 oct. 2023", heure: "10 h 30", apercu: "Suivi post-opératoire après intervention cardiaque…", statut: "Terminée", couleur: "bg-green-50 text-green-700 border-green-100", urgent: false },
  { id: "#PAT-5542", nom: "Stefan Salvatore", medecin: "Dr. Smith",  initiale: "SM", date: "24 oct. 2023", heure: "11 h 15", apercu: "Gêne pulmonaire aiguë et allergie saisonnière",         statut: "En attente", couleur: "bg-orange-50 text-orange-700 border-orange-100", urgent: false },
  { id: "#PAT-1229", nom: "Bonnie Bennett",   medecin: "Dr. Moore",  initiale: "JV", date: "24 oct. 2023", heure: "13 h 00", apercu: "Constantes instables, évaluation cardiovasculaire urgente", statut: "Urgent", couleur: "bg-red-500 text-white border-transparent", urgent: true },
];

// ─────────────────────────────────────────────────────────────────────────────

const GestionConsultation = () => {
  return (
    <div className="flex flex-1 p-8 gap-8 bg-[#f8fafb] min-h-screen font-['Inter'] overflow-x-hidden">
      {/* Colonne principale */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Titre & onglets */}
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#2c3436] font-['Manrope']">
                Consultations
              </h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
                Flux clinique
              </p>
            </div>
            <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
              <OngletBtn label="Aujourd'hui" actif />
              <OngletBtn label="Semaine" />
              <OngletBtn label="Mois" />
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-4 gap-6">
            <CarteStatut label="Total aujourd'hui" valeur="42" icone={<FiUsers />}        couleur="text-blue-600"    bg="bg-blue-50" />
            <CarteStatut label="En attente"         valeur="15" icone={<FiClock />}        couleur="text-orange-600"  bg="bg-orange-50" />
            <CarteStatut label="Terminées"          valeur="24" icone={<FiCheckCircle />}  couleur="text-emerald-600" bg="bg-emerald-50" />
            <CarteStatut label="Urgentes"           valeur="03" icone={<FiAlertCircle />}  couleur="text-red-600"     bg="bg-red-50" urgent />
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white border border-slate-100 p-4 rounded-[1.5rem] shadow-sm flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center gap-3 bg-[#f8fafb] px-4 py-2 rounded-xl border border-slate-100">
              <FiCalendar className="text-slate-400" />
              <span className="text-xs text-slate-600 font-black">12 — 19 oct. 2023</span>
            </div>
            <div className="h-6 w-px bg-slate-100" />
            <SelectFiltre options={["Tous les médecins", "Dr. Moore", "Dr. Smith"]} />
            <div className="h-6 w-px bg-slate-100" />
            <SelectFiltre options={["Tous les statuts", "Terminée", "En attente", "Urgent"]} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-[#0062a2] hover:bg-blue-50 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
            <FiRefreshCw /> Réinitialiser
          </button>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100">
          <table className="w-full text-left">
            <thead className="bg-[#f8fafb] border-b border-slate-50">
              <tr>
                <Th label="Patient" />
                <Th label="Médecin" />
                <Th label="Horaire" />
                <Th label="Aperçu diagnostic" />
                <Th label="Statut" />
                <Th label="Actions" align="right" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {CONSULTATIONS.map((c, i) => (
                <tr key={i} className={`group transition-all ${c.urgent ? "bg-red-50/30" : "hover:bg-[#f8fafb]"}`}>
                  <td className="px-6 py-5 relative">
                    {c.urgent && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />}
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#0062a2] text-white flex items-center justify-center font-black text-sm shadow-sm">
                        {c.nom.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#2c3436]">{c.nom}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black ${c.initiale === "JV" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"}`}>
                        {c.initiale}
                      </div>
                      <p className="text-xs font-bold text-slate-600">{c.medecin}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-black text-[#2c3436]">{c.date}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{c.heure}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs text-slate-500 max-w-[220px] truncate font-medium">{c.apercu}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${c.couleur}`}>
                      {c.statut}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-1">
                      <BtnAction icone={<FiEye />} />
                      <BtnAction icone={<FiEdit2 />} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-8 py-5 bg-[#f8fafb] flex items-center justify-between border-t border-slate-50">
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Lignes :</span>
              <select className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-[11px] font-black outline-none shadow-sm focus:ring-2 focus:ring-blue-100">
                <option>10</option>
                <option>25</option>
              </select>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-[11px] text-slate-400 font-black tracking-widest uppercase">
                1 – 10 sur 248 éléments
              </span>
              <div className="flex items-center gap-2">
                <BtnPage icone={<FiChevronLeft />} desactive />
                <div className="flex gap-1.5">
                  <BtnPage label="1" actif />
                  <BtnPage label="2" />
                  <BtnPage label="3" />
                </div>
                <BtnPage icone={<FiChevronRight />} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre latérale droite */}
      <div className="w-80 flex flex-col gap-8 shrink-0">
        {/* Alertes urgentes */}
        <div className="bg-[#1a1f21] p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
          <h4 className="text-[10px] font-black mb-8 flex items-center gap-3 uppercase tracking-[0.25em] text-blue-400">
            <FiZap className="text-lg fill-blue-400" />
            Alertes urgentes
          </h4>
          <div className="space-y-8">
            <Alerte
              titre="Résultat de labo critique"
              desc="Bonnie Bennett (#PAT-1229) : glycémie élevée détectée."
              heure="Il y a 2 min"
              type="erreur"
            />
            <Alerte
              titre="Conflit d'agenda"
              desc="Chevauchement détecté pour Dr. Moore à 14 h 00."
              heure="Il y a 15 min"
              type="info"
            />
          </div>
          <button className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
            Voir toutes les alertes
          </button>
        </div>

        {/* Charge hebdomadaire */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
          <div className="flex justify-between items-center mb-10">
            <h4 className="text-[10px] font-black text-[#2c3436] uppercase tracking-[0.2em]">
              Charge hebdomadaire
            </h4>
            <FiMoreHorizontal className="text-slate-300 cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
          <div className="h-32 flex items-end justify-between gap-2 px-1">
            <Barre hauteur="60%" label="L" />
            <Barre hauteur="80%" label="M" />
            <Barre hauteur="45%" label="M" actif />
            <Barre hauteur="90%" label="J" />
            <Barre hauteur="70%" label="V" />
            <Barre hauteur="30%" label="S" muet />
            <Barre hauteur="25%" label="D" muet />
          </div>
          <div className="mt-10 pt-8 border-t border-slate-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                Durée moy. de consultation
              </span>
              <span className="text-xs font-black text-[#2c3436]">18 min 42 s</span>
            </div>
            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0062a2] to-[#5eb0ff] w-3/4 rounded-full shadow-lg shadow-blue-100" />
            </div>
          </div>
        </div>

        {/* Assistant */}
        <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100/50 relative overflow-hidden group">
          <p className="text-[9px] font-black text-[#0062a2] uppercase tracking-[0.2em] mb-2">
            Assistant clinique
          </p>
          <p className="text-[11px] text-[#596063] font-bold leading-relaxed mb-6">
            Besoin d'aide pour la documentation clinique ou la gestion des files ?
          </p>
          <button className="text-[10px] font-black text-[#0062a2] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
            Lancer l'assistant <FiArrowRight className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const CarteStatut = ({ label, valeur, icone, couleur, bg, urgent }) => (
  <div className={`bg-white px-6 py-5 rounded-[2rem] shadow-sm border border-slate-50 flex items-center justify-between hover:scale-[1.02] transition-all cursor-default ${urgent ? "border-b-4 border-b-red-500" : ""}`}>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h4 className={`text-2xl font-black font-['Manrope'] mt-1 ${urgent ? "text-red-500" : "text-[#2c3436]"}`}>{valeur}</h4>
    </div>
    <div className={`w-12 h-12 ${bg} ${couleur} rounded-[1.2rem] flex items-center justify-center text-xl shadow-inner`}>
      {icone}
    </div>
  </div>
);

const OngletBtn = ({ label, actif }) => (
  <button className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${actif ? "bg-[#0062a2] text-white shadow-lg shadow-blue-100" : "text-slate-400 hover:text-[#0062a2]"}`}>
    {label}
  </button>
);

const SelectFiltre = ({ options }) => (
  <select className="bg-transparent border-none text-[10px] font-black text-slate-600 uppercase tracking-widest focus:ring-0 py-0 cursor-pointer outline-none">
    {options.map((o, i) => <option key={i}>{o}</option>)}
  </select>
);

const Th = ({ label, align = "left" }) => (
  <th className={`px-6 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ${align === "right" ? "text-right" : ""}`}>
    {label}
  </th>
);

const BtnAction = ({ icone }) => (
  <button className="p-2.5 text-slate-300 hover:text-[#0062a2] hover:bg-blue-50 rounded-xl transition-all">
    {React.cloneElement(icone, { size: 18 })}
  </button>
);

const BtnPage = ({ label, icone, actif, desactive }) => (
  <button className={`w-8 h-8 flex items-center justify-center text-[10px] font-black rounded-lg transition-all ${actif ? "bg-[#0062a2] text-white shadow-md" : "text-slate-400 hover:bg-white hover:text-[#0062a2] border border-transparent hover:border-slate-100"} ${desactive ? "opacity-20 cursor-not-allowed" : ""}`}>
    {icone || label}
  </button>
);

const Alerte = ({ titre, desc, heure, type }) => (
  <div className="flex gap-4 relative">
    <div className={`w-1 h-full absolute -left-4 rounded-full ${type === "erreur" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"}`} />
    <div>
      <p className="text-xs font-black leading-tight text-white">{titre}</p>
      <p className="text-[10px] text-slate-400 mt-2 leading-relaxed font-medium">{desc}</p>
      <p className="text-[9px] text-slate-500 mt-2 font-black uppercase tracking-widest">{heure}</p>
    </div>
  </div>
);

const Barre = ({ hauteur, label, actif, muet }) => (
  <div className="flex-1 flex flex-col items-center gap-3 group">
    <div className={`w-full bg-slate-50 rounded-t-xl relative h-full overflow-hidden ${muet ? "opacity-30" : ""}`}>
      <div className={`absolute bottom-0 w-full rounded-t-xl transition-all duration-700 ${actif ? "bg-[#0062a2]" : "bg-blue-500/20 group-hover:bg-blue-500/40"}`}
        style={{ height: hauteur }} />
    </div>
    <span className={`text-[10px] font-black ${actif ? "text-[#0062a2]" : "text-slate-300"}`}>{label}</span>
  </div>
);

export default GestionConsultation;
