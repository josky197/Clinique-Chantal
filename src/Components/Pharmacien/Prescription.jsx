import { useState } from "react";
import {
  ClipboardList, Clock, CheckCircle2,
  ChevronLeft, ChevronRight, Check,
} from "lucide-react";

const PRESCRIPTIONS = [
  { id: "#ORD-2026-8812", patient: "Jean-Pierre Martin",  dossier: "P-9920", medecin: "Dr. Moore",  statut: "URGENT",   attente: "18 min", urgent: true  },
  { id: "#ORD-2026-8813", patient: "Marie-Louise Dupont", dossier: "P-4431", medecin: "Dr. Dupont", statut: "STANDARD", attente: "05 min", urgent: false },
  { id: "#ORD-2026-8814", patient: "Amir Konan",          dossier: "P-2019", medecin: "Dr. Moore",  statut: "STANDARD", attente: "02 min", urgent: false },
  { id: "#ORD-2026-8815", patient: "Fatou Traoré",        dossier: "P-3312", medecin: "Dr. Vance",  statut: "URGENT",   attente: "25 min", urgent: true  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Prescription() {
  const [filtre, setFiltre]         = useState("tous");
  const [validees, setValidees]     = useState([]);

  const filtered = filtre === "urgent"
    ? PRESCRIPTIONS.filter((p) => p.urgent)
    : PRESCRIPTIONS;

  const valider = (id) =>
    setValidees((prev) => prev.includes(id) ? prev : [...prev, id]);

  const enAttente   = PRESCRIPTIONS.filter((p) => !validees.includes(p.id)).length;
  const tempsMoyen  = "12 min";
  const nbValidees  = validees.length;

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ordonnances</h1>
        <p className="text-slate-500 mt-1 font-medium text-sm">
          Files d'attente prioritaires et standard
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icone={<ClipboardList size={20} />}
          label="En attente"
          valeur={enAttente}
          tag="Temps réel"
          couleurBord="border-l-[#0062a2]"
          couleurIcone="bg-blue-50 text-[#0062a2]"
        />
        <StatCard
          icone={<Clock size={20} />}
          label="Temps moyen de préparation"
          valeur={tempsMoyen}
          tag="Performance"
          couleurBord="border-l-purple-500"
          couleurIcone="bg-purple-50 text-purple-600"
        />
        <StatCard
          icone={<CheckCircle2 size={20} />}
          label="Validées aujourd'hui"
          valeur={nbValidees + 148}
          tag="Aujourd'hui"
          couleurBord="border-l-green-500"
          couleurIcone="bg-green-50 text-green-600"
        />
      </div>

      {/* Tableau */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Détail des ordonnances</h2>
          <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl">
            <FiltreBtn label="Tous les statuts" actif={filtre === "tous"}   onClick={() => setFiltre("tous")} />
            <FiltreBtn label="Urgentes"          actif={filtre === "urgent"} onClick={() => setFiltre("urgent")} urgent />
          </div>
        </div>

        <div className="bg-white rounded-4xl overflow-hidden shadow-sm border border-slate-100">
          <table className="w-full text-left">
            <thead className="bg-[#f8fafb] border-b border-slate-50">
              <tr>
                {["ID Ordonnance", "Patient", "Médecin prescripteur", "Statut", "Temps d'attente", "Action"].map((h, i) => (
                  <th key={h} className={`px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ${i === 5 ? "text-right" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((row) => {
                const estValidee = validees.includes(row.id);
                return (
                  <tr key={row.id} className="hover:bg-[#f8fafb]/80 transition-colors">
                    <td className="px-6 py-5 font-bold text-[#0062a2] font-mono text-sm">{row.id}</td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-[#2c3436]">{row.patient}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        ID : {row.dossier}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 font-semibold">{row.medecin}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 text-[10px] font-black rounded-full tracking-wider ${
                        row.urgent ? "bg-red-100 text-red-700" : "bg-blue-100 text-[#0062a2]"
                      }`}>
                        {row.statut}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`flex items-center gap-2 ${row.urgent ? "text-red-500" : "text-slate-500"}`}>
                        <Clock size={14} />
                        <span className="text-sm font-bold">{row.attente}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => valider(row.id)}
                        disabled={estValidee}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          estValidee
                            ? "bg-green-50 text-green-600 cursor-default"
                            : "bg-[#0062a2]/5 text-[#0062a2] hover:bg-[#0062a2] hover:text-white"
                        }`}
                      >
                        <Check size={15} />
                        {estValidee ? "Validée" : "Valider"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pied de tableau */}
          <div className="px-6 py-4 bg-[#f8fafb] border-t border-slate-50 flex justify-between items-center">
            <span className="text-xs text-slate-400 font-medium">
              Affichage de {filtered.length} sur {PRESCRIPTIONS.length} ordonnances
            </span>
            <div className="flex gap-2">
              <PageBtn icon={<ChevronLeft size={14} />} disabled />
              <PageBtn icon={<ChevronRight size={14} />} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const StatCard = ({ icone, label, valeur, tag, couleurBord, couleurIcone }) => (
  <div className={`bg-white p-6 rounded-4xl shadow-sm border-l-4 ${couleurBord} border border-slate-100`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${couleurIcone}`}>{icone}</div>
      <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{tag}</span>
    </div>
    <h3 className="text-3xl font-black text-[#2c3436]">{valeur}</h3>
    <p className="text-sm font-medium text-slate-500 mt-1">{label}</p>
  </div>
);

const FiltreBtn = ({ label, actif, onClick, urgent }) => (
  <button onClick={onClick}
    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
      actif ? (urgent ? "bg-red-500 text-white shadow-md" : "bg-[#0062a2] text-white shadow-md") : "text-slate-500 hover:text-[#0062a2]"
    }`}>
    {label}
  </button>
);

const PageBtn = ({ icon, disabled }) => (
  <button disabled={disabled}
    className="p-2 text-slate-400 hover:bg-white hover:text-[#0062a2] rounded-lg transition-all border border-transparent hover:border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed">
    {icon}
  </button>
);
