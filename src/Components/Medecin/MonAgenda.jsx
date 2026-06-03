import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, User, CheckCircle2, XCircle } from "lucide-react";

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const RDV_SEMAINE = {
  0: [
    { heure: "09:00", patient: "Alain Dupont",    motif: "Suivi hypertension",    statut: "Confirmé",   duree: 30 },
    { heure: "10:30", patient: "Béatrice Martin",  motif: "Résultats cardio",      statut: "Confirmé",   duree: 45 },
    { heure: "14:00", patient: "Charles Lefebvre", motif: "Consultation générale", statut: "En attente", duree: 30 },
    { heure: "15:30", patient: "Marc Bernard",     motif: "Renouvellement ordo.",  statut: "Confirmé",   duree: 20 },
  ],
  1: [
    { heure: "08:30", patient: "Diane Petit",      motif: "Pédiatrie — vaccin",    statut: "Confirmé",   duree: 20 },
    { heure: "11:00", patient: "Sophie Laurent",   motif: "Bilan sanguin",         statut: "Annulé",     duree: 30 },
  ],
  2: [
    { heure: "09:30", patient: "Édouard Moreau",   motif: "Neurologie — suivi",    statut: "Confirmé",   duree: 60 },
    { heure: "13:00", patient: "Alain Dupont",     motif: "ECG de contrôle",       statut: "En attente", duree: 45 },
  ],
  3: [
    { heure: "10:00", patient: "Claire Rousseau",  motif: "Dermatologie",          statut: "Confirmé",   duree: 30 },
  ],
  4: [
    { heure: "08:00", patient: "Béatrice Martin",  motif: "Post-opératoire",       statut: "Confirmé",   duree: 45 },
    { heure: "14:30", patient: "Marc Bernard",     motif: "Consultation urgente",  statut: "Confirmé",   duree: 30 },
  ],
  5: [],
  6: [],
};

const STATUT_STYLE = {
  "Confirmé":   "border-l-[#0062a2] bg-blue-50",
  "En attente": "border-l-yellow-400 bg-yellow-50",
  "Annulé":     "border-l-red-400 bg-red-50/40 opacity-60",
};

const STATUT_BADGE = {
  "Confirmé":   "bg-blue-50 text-[#0062a2]",
  "En attente": "bg-yellow-50 text-yellow-700",
  "Annulé":     "bg-red-50 text-red-500",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function MonAgenda() {
  const [jourActif, setJourActif] = useState(0);
  const [semaine] = useState("28 avr. — 04 mai 2025");

  const rdvDuJour = RDV_SEMAINE[jourActif] ?? [];
  const confirmes  = rdvDuJour.filter((r) => r.statut === "Confirmé").length;
  const attente    = rdvDuJour.filter((r) => r.statut === "En attente").length;

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mon agenda</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Semaine du {semaine}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm">
            <ChevronLeft size={18} className="text-slate-600" />
          </button>
          <span className="text-sm font-bold text-slate-600 min-w-36 text-center">{semaine}</span>
          <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm">
            <ChevronRight size={18} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* Onglets jours */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-2 flex gap-1 overflow-x-auto">
        {JOURS.map((jour, i) => {
          const nbRdv = (RDV_SEMAINE[i] ?? []).length;
          return (
            <button key={i} onClick={() => setJourActif(i)}
              className={`flex-1 min-w-16 flex flex-col items-center py-3 rounded-3xl transition-all ${
                jourActif === i
                  ? "bg-[#0062a2] text-white shadow-md shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-50"
              }`}>
              <span className="text-[11px] font-bold uppercase tracking-wider">{jour}</span>
              {nbRdv > 0 && (
                <span className={`mt-1 text-[10px] font-black px-2 py-0.5 rounded-full ${jourActif === i ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {nbRdv}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Planning du jour */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-800">
              {JOURS[jourActif]} — <span className="text-slate-400 font-medium">{rdvDuJour.length} rendez-vous</span>
            </h2>
          </div>

          {rdvDuJour.length === 0 ? (
            <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-16 text-center text-slate-400">
              <CheckCircle2 size={36} className="mx-auto mb-4 opacity-20" />
              <p className="font-medium">Aucun rendez-vous ce jour</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rdvDuJour.map((rdv, i) => (
                <div key={i} className={`bg-white rounded-4xl border-l-4 border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow ${STATUT_STYLE[rdv.statut]}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-14">
                        <span className="text-lg font-black text-[#0062a2]">{rdv.heure}</span>
                        <p className="text-[10px] text-slate-400 font-medium">{rdv.duree} min</p>
                      </div>
                      <div className="w-px h-10 bg-slate-200" />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#0062a2] text-white flex items-center justify-center font-black text-sm shrink-0">
                          {rdv.patient.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{rdv.patient}</p>
                          <p className="text-xs text-slate-400">{rdv.motif}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${STATUT_BADGE[rdv.statut]}`}>
                        {rdv.statut}
                      </span>
                      {rdv.statut !== "Annulé" && (
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition" title="Annuler">
                          <XCircle size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Résumé du jour */}
        <div className="space-y-5">
          <div className="bg-[#0062a2] rounded-4xl p-6 text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/5 rounded-full" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-6">
              Résumé du jour
            </h3>
            <div className="space-y-4">
              <ResumeItem icone={<CheckCircle2 size={16} />} label="Confirmés"  valeur={confirmes}  couleur="text-green-300" />
              <ResumeItem icone={<Clock size={16} />}         label="En attente" valeur={attente}    couleur="text-yellow-300" />
              <ResumeItem icone={<User size={16} />}          label="Total"      valeur={rdvDuJour.length} couleur="text-white" />
            </div>
          </div>

          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Prochains jours</h3>
            <div className="space-y-3">
              {JOURS.map((jour, i) => {
                const nb = (RDV_SEMAINE[i] ?? []).length;
                if (nb === 0 || i === jourActif) return null;
                return (
                  <button key={i} onClick={() => setJourActif(i)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-semibold text-slate-600">{jour}</span>
                    <span className="text-xs font-bold text-[#0062a2] bg-blue-50 px-2 py-0.5 rounded-lg">
                      {nb} RDV
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const ResumeItem = ({ icone, label, valeur, couleur }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-white/70">
      {icone}
      <span className="text-xs font-medium">{label}</span>
    </div>
    <span className={`text-lg font-black ${couleur}`}>{valeur}</span>
  </div>
);
