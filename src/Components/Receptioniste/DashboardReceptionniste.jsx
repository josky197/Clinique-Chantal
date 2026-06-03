import { useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  Plus,
  CheckCircle2,
  XCircle,
  ChevronRight,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Données fictives
const STATS = {
  rendezVousAujourdhui: 12,
  nouveauxPatients: 3,
  enAttente: 5,
  facturesEnAttente: 4,
};

const PROCHAINS_RDV = [
  { id: 1, patient: "Alain Dupont",    heure: "09:00", service: "Consultation générale", statut: "Confirmé",   telephone: "06 12 34 56 78" },
  { id: 2, patient: "Béatrice Martin", heure: "10:30", service: "Cardiologie",           statut: "En attente", telephone: "06 23 45 67 89" },
  { id: 3, patient: "Charles Lefebvre",heure: "11:15", service: "Consultation générale", statut: "Confirmé",   telephone: "06 34 56 78 90" },
  { id: 4, patient: "Diane Petit",     heure: "14:00", service: "Pédiatrie",             statut: "En attente", telephone: "06 45 67 89 01" },
  { id: 5, patient: "Édouard Moreau",  heure: "15:30", service: "Neurologie",            statut: "Confirmé",   telephone: "06 56 78 90 12" },
];

const FACTURES_EN_ATTENTE = [
  { id: 1, patient: "Sophie Laurent",  montant: "45 000 FCFA", service: "Consultation générale" },
  { id: 2, patient: "Marc Bernard",    montant: "85 000 FCFA", service: "Cardiologie" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardReceptionniste() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const dateLabel = new Date(selectedDate).toLocaleDateString("fr-FR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <main className="p-8 space-y-10 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-slate-500 mt-1 font-medium capitalize">{dateLabel}</p>
        </div>
        <button
          onClick={() => navigate("/ajout-patient")}
          className="flex items-center gap-2 px-6 py-3 bg-[#0062a2] text-white rounded-2xl font-semibold hover:bg-[#004f82] transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={18} />
          Nouveau patient
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          label="Rendez-vous aujourd'hui"
          value={STATS.rendezVousAujourdhui}
          sub="Total"
          icon={<Calendar size={20} />}
          bg="bg-blue-50 text-[#0062a2]"
        />
        <StatCard
          label="Nouveaux patients"
          value={STATS.nouveauxPatients}
          sub="Aujourd'hui"
          icon={<Users size={20} />}
          bg="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          label="En attente"
          value={STATS.enAttente}
          sub="À confirmer"
          icon={<Clock size={20} />}
          bg="bg-yellow-50 text-yellow-600"
        />
        <StatCard
          label="Factures en attente"
          value={STATS.facturesEnAttente}
          sub="À encaisser"
          icon={<CreditCard size={20} />}
          bg="bg-red-50 text-red-600"
          urgent
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Rendez-vous du jour */}
        <div className="xl:col-span-2 space-y-6">
          <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Rendez-vous du jour</h2>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/20"
                />
                <button
                  onClick={() => navigate("/gestion-rendez-vous")}
                  className="text-[#0062a2] text-sm font-semibold hover:underline flex items-center gap-1"
                >
                  Voir tout <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {PROCHAINS_RDV.map((rdv) => (
                <RendezVousItem key={rdv.id} rdv={rdv} />
              ))}
            </div>
          </section>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          {/* Actions rapides */}
          <aside className="bg-[#0062a2] rounded-[2rem] p-6 text-white space-y-3 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
              Actions rapides
            </h3>
            <QuickAction label="Nouveau patient"      onClick={() => navigate("/ajout-patient")} />
            <QuickAction label="Nouveau rendez-vous"  onClick={() => navigate("/gestion-rendez-vous")} />
            <QuickAction label="Liste des patients"   onClick={() => navigate("/liste-patients")} />
            <QuickAction label="Facturation"          onClick={() => navigate("/facturation")} highlight />
          </aside>

          {/* Factures en attente */}
          <aside className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-500" />
                Factures en attente
              </h3>
              <button
                onClick={() => navigate("/facturation")}
                className="text-[#0062a2] text-xs font-semibold hover:underline flex items-center gap-1"
              >
                Tout voir <ChevronRight size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {FACTURES_EN_ATTENTE.map((f) => (
                <FactureItem key={f.id} facture={f} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const StatCard = ({ label, value, sub, icon, bg, urgent }) => (
  <div className={`bg-white p-6 rounded-[2rem] border shadow-sm hover:shadow-md transition-shadow ${urgent ? "border-b-4 border-b-red-500 border-slate-100" : "border-slate-100"}`}>
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}>
        {sub}
      </span>
      <div className={`${bg} p-2 rounded-xl`}>{icon}</div>
    </div>
    <div className={`text-4xl font-black mb-1 ${urgent ? "text-red-600" : "text-slate-800"}`}>
      {value}
    </div>
    <p className="text-sm text-slate-400 font-medium">{label}</p>
  </div>
);

const RendezVousItem = ({ rdv }) => {
  const colors = {
    "Confirmé":   "bg-green-50 text-green-700",
    "En attente": "bg-yellow-50 text-yellow-700",
    "Annulé":     "bg-red-50 text-red-700",
  };
  return (
    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div className="min-w-[60px] text-center">
          <span className="text-lg font-black text-[#0062a2]">{rdv.heure}</span>
        </div>
        <div className="w-px h-10 bg-slate-200" />
        <div className="flex-1">
          <p className="font-bold text-slate-800 text-sm">{rdv.patient}</p>
          <p className="text-xs text-slate-400">{rdv.service} — {rdv.telephone}</p>
        </div>
        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${colors[rdv.statut] ?? "bg-slate-100 text-slate-600"}`}>
          {rdv.statut}
        </span>
      </div>
      <div className="flex gap-1 ml-3">
        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
          <CheckCircle2 size={15} />
        </button>
        <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <XCircle size={15} />
        </button>
      </div>
    </div>
  );
};

const QuickAction = ({ label, onClick, highlight }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
      highlight
        ? "bg-[#fecb00] text-[#0062a2] hover:brightness-95"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    {label}
    <ChevronRight size={14} />
  </button>
);

const FactureItem = ({ facture }) => (
  <div className="flex items-center justify-between p-3 bg-red-50/50 border border-red-100 rounded-xl">
    <div>
      <p className="text-sm font-bold text-slate-800">{facture.patient}</p>
      <p className="text-xs text-slate-400">{facture.service}</p>
    </div>
    <span className="text-sm font-black text-red-600">{facture.montant}</span>
  </div>
);
