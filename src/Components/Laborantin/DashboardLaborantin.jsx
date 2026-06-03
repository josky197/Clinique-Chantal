import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlaskConical, Clock, CheckCircle2, AlertCircle,
  Search, ChevronRight, Play, FileText, Zap,
} from "lucide-react";

const EXAMENS = [
  { id: 1,  patient: "Alain Dupont",     dossier: "PAT-2025-0012", type: "Analyse sanguine", medecin: "Dr. Moore",  heure: "08 h 30", priorite: "Normale", statut: "En attente" },
  { id: 2,  patient: "Béatrice Martin",  dossier: "PAT-2025-0013", type: "ECBU",             medecin: "Dr. Dupont", heure: "09 h 00", priorite: "Urgente", statut: "En attente" },
  { id: 3,  patient: "Charles Lefebvre", dossier: "PAT-2025-0014", type: "Glycémie",         medecin: "Dr. Moore",  heure: "09 h 30", priorite: "Normale", statut: "En cours"  },
  { id: 4,  patient: "Diane Petit",      dossier: "PAT-2025-0015", type: "NFS",              medecin: "Dr. Vance",  heure: "10 h 00", priorite: "Urgente", statut: "En attente" },
  { id: 5,  patient: "Édouard Moreau",   dossier: "PAT-2025-0016", type: "Bilan hépatique",  medecin: "Dr. Smith",  heure: "10 h 30", priorite: "Normale", statut: "Terminé"   },
];

const STATUT_STYLE = {
  "En attente": "bg-yellow-50 text-yellow-700",
  "En cours":   "bg-blue-50 text-[#0062a2]",
  "Terminé":    "bg-green-50 text-green-700",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardLaborantin() {
  const navigate = useNavigate();
  const [examens, setExamens] = useState(EXAMENS);
  const [search, setSearch]   = useState("");

  const filtered = examens.filter((e) =>
    e.patient.toLowerCase().includes(search.toLowerCase()) ||
    e.type.toLowerCase().includes(search.toLowerCase())
  );

  const demarrer   = (id) => setExamens((prev) => prev.map((e) => e.id === id ? { ...e, statut: "En cours" } : e));
  const finaliser  = (id) => setExamens((prev) => prev.map((e) => e.id === id ? { ...e, statut: "Terminé" } : e));

  const enAttente = examens.filter((e) => e.statut === "En attente").length;
  const enCours   = examens.filter((e) => e.statut === "En cours").length;
  const termines  = examens.filter((e) => e.statut === "Terminé").length;
  const urgents   = examens.filter((e) => e.priorite === "Urgente" && e.statut !== "Terminé").length;

  return (
    <main className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Examens et analyses du laboratoire
          </p>
        </div>
        <button
          onClick={() => navigate("/examens")}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0062a2] text-white rounded-2xl font-semibold text-sm hover:bg-[#004f82] transition shadow-lg shadow-blue-100"
        >
          Voir tous les examens <ChevronRight size={16} />
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard label="En attente" valeur={enAttente}  icone={<Clock size={20} />}        bg="bg-yellow-50 text-yellow-600" />
        <StatCard label="En cours"   valeur={enCours}    icone={<FlaskConical size={20} />}  bg="bg-blue-50 text-[#0062a2]" />
        <StatCard label="Terminés"   valeur={termines}   icone={<CheckCircle2 size={20} />}  bg="bg-green-50 text-green-600" />
        <StatCard label="Urgents"    valeur={urgents}    icone={<AlertCircle size={20} />}   bg="bg-red-50 text-red-600" urgent />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* File d'attente */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-800">File d'attente du jour</h2>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Patient, type d'examen…"
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all w-52"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((ex) => (
              <ExamenRow
                key={ex.id}
                examen={ex}
                onDemarrer={() => demarrer(ex.id)}
                onFinaliser={() => navigate(`/saisie-resultats/${ex.id}`)}
                onVoir={() => navigate(`/saisie-resultats/${ex.id}`)}
              />
            ))}
            {filtered.length === 0 && (
              <div className="bg-white rounded-4xl border border-slate-100 p-12 text-center text-slate-400">
                <FlaskConical size={36} className="mx-auto mb-3 opacity-20" />
                <p className="font-medium text-sm">Aucun examen trouvé</p>
              </div>
            )}
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          {/* Urgences */}
          <div className="bg-[#0062a2] rounded-4xl p-6 text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/5 rounded-full" />
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 mb-5">
              <Zap size={14} className="fill-[#fecb00] text-[#fecb00]" />
              Examens urgents
            </h3>
            <div className="space-y-4">
              {examens
                .filter((e) => e.priorite === "Urgente" && e.statut !== "Terminé")
                .map((e) => (
                  <div key={e.id} className="bg-white/10 rounded-2xl p-4 border border-white/10">
                    <p className="font-bold text-sm">{e.patient}</p>
                    <p className="text-white/60 text-xs mt-0.5">{e.type} — {e.heure}</p>
                    <span className={`mt-2 inline-block text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                      e.statut === "En cours" ? "bg-blue-400/30 text-blue-100" : "bg-yellow-400/30 text-yellow-100"
                    }`}>
                      {e.statut}
                    </span>
                  </div>
                ))}
              {urgents === 0 && (
                <p className="text-white/40 text-sm font-medium">Aucune urgence active</p>
              )}
            </div>
          </div>

          {/* Résumé par type */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 text-sm mb-5">Examens par type</h3>
            <div className="space-y-3">
              {[
                { label: "Analyses sanguines", nb: 2, color: "bg-blue-500" },
                { label: "ECBU",               nb: 1, color: "bg-purple-500" },
                { label: "Glycémie",           nb: 1, color: "bg-orange-400" },
                { label: "NFS",                nb: 1, color: "bg-green-500" },
              ].map((t) => (
                <div key={t.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${t.color}`} />
                    <span className="text-sm text-slate-600 font-medium">{t.label}</span>
                  </div>
                  <span className="text-xs font-black text-slate-400">{t.nb}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const StatCard = ({ label, valeur, icone, bg, urgent }) => (
  <div className={`bg-white p-6 rounded-4xl border shadow-sm hover:shadow-md transition-shadow ${urgent ? "border-b-4 border-b-red-400 border-slate-100" : "border-slate-100"}`}>
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}>
        {label}
      </span>
      <div className={`${bg} p-2 rounded-xl`}>{icone}</div>
    </div>
    <div className={`text-4xl font-black ${urgent ? "text-red-600" : "text-slate-800"}`}>
      {valeur}
    </div>
  </div>
);

const ExamenRow = ({ examen, onDemarrer, onFinaliser, onVoir }) => (
  <div className={`bg-white rounded-4xl border border-slate-100 shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow ${examen.priorite === "Urgente" ? "border-l-4 border-l-red-400" : ""}`}>
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
        examen.statut === "Terminé" ? "bg-green-50 text-green-600" :
        examen.statut === "En cours" ? "bg-blue-50 text-[#0062a2]" :
        "bg-yellow-50 text-yellow-600"
      }`}>
        <FlaskConical size={18} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="font-bold text-slate-800 text-sm">{examen.patient}</p>
          {examen.priorite === "Urgente" && (
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100">
              Urgent
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          {examen.type} — {examen.medecin} — {examen.heure}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg hidden sm:block ${STATUT_STYLE[examen.statut]}`}>
        {examen.statut}
      </span>
      {examen.statut === "En attente" && (
        <button onClick={onDemarrer}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0062a2] text-white text-xs font-bold rounded-xl hover:bg-[#004f82] transition">
          <Play size={12} /> Démarrer
        </button>
      )}
      {examen.statut === "En cours" && (
        <button onClick={onFinaliser}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition">
          <CheckCircle2 size={12} /> Saisir résultats
        </button>
      )}
      {examen.statut === "Terminé" && (
        <button onClick={onVoir}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition">
          <FileText size={12} /> Voir
        </button>
      )}
    </div>
  </div>
);
