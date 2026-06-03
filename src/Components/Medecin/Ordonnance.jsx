import { useState } from "react";
import {
  Plus, Printer, Search, ChevronRight,
  FileText, Pill, Calendar, CheckCircle2,
} from "lucide-react";

const MOCK_ORDONNANCES = [
  { id: "ORD-2025-0041", patient: "Alain Dupont",     dossier: "PAT-2025-0012", date: "01 mai 2025",  validite: "31 mai 2025",  statut: "Active",   medicaments: [{ nom: "Metformine", dose: "500 mg", freq: "2 fois/jour", duree: "30 jours" }, { nom: "Lisinopril", dose: "10 mg", freq: "1 fois/jour", duree: "30 jours" }] },
  { id: "ORD-2025-0038", patient: "Béatrice Martin",  dossier: "PAT-2025-0013", date: "28 avr. 2025", validite: "28 mai 2025",  statut: "Active",   medicaments: [{ nom: "Atorvastatine", dose: "20 mg", freq: "1 fois/soir", duree: "30 jours" }] },
  { id: "ORD-2025-0029", patient: "Charles Lefebvre", dossier: "PAT-2025-0014", date: "15 avr. 2025", validite: "15 mai 2025",  statut: "Expirée",  medicaments: [{ nom: "Amoxicilline", dose: "1 g", freq: "3 fois/jour", duree: "7 jours" }] },
  { id: "ORD-2025-0021", patient: "Diane Petit",      dossier: "PAT-2025-0015", date: "01 avr. 2025", validite: "30 avr. 2025", statut: "Dispensée", medicaments: [{ nom: "Ibuprofène", dose: "200 mg", freq: "3 fois/jour", duree: "5 jours" }] },
];

const STATUT_STYLE = {
  "Active":    "bg-green-50 text-green-700 border-green-100",
  "Expirée":   "bg-red-50 text-red-600 border-red-100",
  "Dispensée": "bg-blue-50 text-[#0062a2] border-blue-100",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Ordonnance() {
  const [search, setSearch]             = useState("");
  const [filtre, setFiltre]             = useState("Tous");
  const [ordonnanceOuverte, setOuverte] = useState(null);

  const filtered = MOCK_ORDONNANCES.filter((o) => {
    const matchSearch = o.patient.toLowerCase().includes(search.toLowerCase())
                     || o.id.toLowerCase().includes(search.toLowerCase());
    const matchFiltre = filtre === "Tous" || o.statut === filtre;
    return matchSearch && matchFiltre;
  });

  const actives   = MOCK_ORDONNANCES.filter((o) => o.statut === "Active").length;
  const dispensees = MOCK_ORDONNANCES.filter((o) => o.statut === "Dispensée").length;
  const expirees  = MOCK_ORDONNANCES.filter((o) => o.statut === "Expirée").length;

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Ordonnances</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Historique et gestion des prescriptions
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#0062a2] text-white rounded-2xl font-semibold hover:bg-[#004f82] transition shadow-lg shadow-blue-100">
          <Plus size={18} /> Nouvelle ordonnance
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Ordonnances actives"   valeur={actives}    icone={<FileText size={20} />} bg="bg-green-50 text-green-700" />
        <StatCard label="Dispensées"            valeur={dispensees} icone={<CheckCircle2 size={20} />} bg="bg-blue-50 text-[#0062a2]" />
        <StatCard label="Expirées"              valeur={expirees}   icone={<Calendar size={20} />}  bg="bg-red-50 text-red-600" urgent />
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par patient ou numéro d'ordonnance…"
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all" />
        </div>
        <div className="flex gap-2">
          {["Tous", "Active", "Dispensée", "Expirée"].map((s) => (
            <button key={s} onClick={() => setFiltre(s)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${filtre === s ? "bg-[#0062a2] text-white border-[#0062a2]" : "bg-white text-slate-500 border-slate-200 hover:border-[#0062a2]/40"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {filtered.map((ord) => (
          <div key={ord.id}
            className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#0062a2] text-white flex items-center justify-center shrink-0">
                  <Pill size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-slate-800">{ord.patient}</p>
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                      {ord.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Émise le {ord.date} — Valide jusqu'au {ord.validite}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg border ${STATUT_STYLE[ord.statut]}`}>
                  {ord.statut}
                </span>
                <button onClick={() => setOuverte(ordonnanceOuverte?.id === ord.id ? null : ord)}
                  className="p-2 text-slate-400 hover:text-[#0062a2] hover:bg-blue-50 rounded-xl transition">
                  <ChevronRight size={16} className={`transition-transform ${ordonnanceOuverte?.id === ord.id ? "rotate-90" : ""}`} />
                </button>
                <button className="p-2 text-slate-400 hover:text-[#0062a2] hover:bg-blue-50 rounded-xl transition" title="Imprimer">
                  <Printer size={16} />
                </button>
              </div>
            </div>

            {/* Détail dépliable */}
            {ordonnanceOuverte?.id === ord.id && (
              <div className="mt-5 pt-5 border-t border-slate-50">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      {["Médicament", "Dosage", "Fréquence", "Durée"].map((h) => (
                        <th key={h} className="pb-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {ord.medicaments.map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 pr-6 font-bold text-slate-800 text-sm">{m.nom}</td>
                        <td className="py-3 pr-6 text-sm text-slate-500">{m.dose}</td>
                        <td className="py-3 pr-6 text-sm text-slate-500">{m.freq}</td>
                        <td className="py-3 text-sm font-bold text-[#0062a2]">{m.duree}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const StatCard = ({ label, valeur, icone, bg, urgent }) => (
  <div className={`bg-white p-6 rounded-4xl border shadow-sm hover:shadow-md transition-shadow ${urgent ? "border-b-4 border-b-red-400 border-slate-100" : "border-slate-100"}`}>
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}>
        {label}
      </span>
      <div className={`${bg} p-2 rounded-xl`}>{icone}</div>
    </div>
    <div className="text-4xl font-black text-slate-800">{valeur}</div>
  </div>
);
