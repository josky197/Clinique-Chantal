import { useNavigate } from "react-router-dom";
import {
  TrendingUp, TrendingDown, CreditCard, Clock,
  CheckCircle2, ChevronRight, MoreHorizontal,
  ArrowUpRight, ArrowDownRight,
} from "lucide-react";

const DERNIERES_TRANSACTIONS = [
  { id: 1, patient: "Alain Dupont",     service: "Consultation générale", montant: 15000,  mode: "Espèces",      date: "Aujourd'hui, 14 h 30", statut: "Payée" },
  { id: 2, patient: "Béatrice Martin",  service: "Cardiologie",           montant: 45000,  mode: "Assurance",    date: "Aujourd'hui, 11 h 00", statut: "Payée" },
  { id: 3, patient: "Charles Lefebvre", service: "Consultation générale", montant: 15000,  mode: "Carte",        date: "Aujourd'hui, 09 h 30", statut: "Payée" },
  { id: 4, patient: "Diane Petit",      service: "Pédiatrie",             montant: 20000,  mode: "Mobile Money", date: "Hier, 16 h 45",        statut: "Payée" },
  { id: 5, patient: "Édouard Moreau",   service: "Neurologie",            montant: 60000,  mode: "—",            date: "Hier, 15 h 00",        statut: "En attente" },
];

const RECETTES_SEMAINE = [
  { jour: "L",  montant: 180000 },
  { jour: "M",  montant: 220000 },
  { jour: "M",  montant: 95000  },
  { jour: "J",  montant: 310000 },
  { jour: "V",  montant: 255000, actif: true },
  { jour: "S",  montant: 40000,  muet: true },
  { jour: "D",  montant: 0,      muet: true },
];

const MAX_BARRE = Math.max(...RECETTES_SEMAINE.map((r) => r.montant));
const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";

// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardComptable() {
  const navigate = useNavigate();

  return (
    <main className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Suivi financier de la Clinique Chantal
          </p>
        </div>
        <button
          onClick={() => navigate("/rapports")}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0062a2] text-white rounded-2xl font-semibold text-sm hover:bg-[#004f82] transition shadow-lg shadow-blue-100"
        >
          Voir les rapports <ChevronRight size={16} />
        </button>
      </div>

      {/* KPI du jour */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard
          label="Recettes du jour"
          valeur={fmt(95000)}
          variation="+12%"
          hausse
          icone={<TrendingUp size={20} />}
          bg="bg-green-50 text-green-700"
        />
        <KpiCard
          label="Recettes du mois"
          valeur={fmt(1850000)}
          variation="+8%"
          hausse
          icone={<TrendingUp size={20} />}
          bg="bg-blue-50 text-[#0062a2]"
        />
        <KpiCard
          label="Factures en attente"
          valeur="5"
          variation={fmt(140000)}
          icone={<Clock size={20} />}
          bg="bg-yellow-50 text-yellow-600"
          urgent
        />
        <KpiCard
          label="Transactions aujourd'hui"
          valeur="12"
          icone={<CreditCard size={20} />}
          bg="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Graphique + transactions */}
        <div className="xl:col-span-2 space-y-6">
          {/* Graphique recettes semaine */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-800">Recettes hebdomadaires</h3>
                <p className="text-xs text-slate-400 mt-0.5">Semaine du 28 avr. — 04 mai 2025</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-800">{fmt(1100000)}</p>
                <p className="text-xs text-green-600 font-bold flex items-center justify-end gap-1 mt-0.5">
                  <ArrowUpRight size={12} /> +14% vs semaine dernière
                </p>
              </div>
            </div>
            <div className="flex items-end gap-3 h-36">
              {RECETTES_SEMAINE.map((r, i) => {
                const hauteur = MAX_BARRE > 0 ? `${(r.montant / MAX_BARRE) * 100}%` : "4px";
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col justify-end" style={{ height: "112px" }}>
                      <div
                        className={`w-full rounded-t-xl transition-all duration-700 min-h-[4px] ${
                          r.actif  ? "bg-[#0062a2]" :
                          r.muet   ? "bg-slate-100" :
                                     "bg-blue-100 hover:bg-blue-200"
                        }`}
                        style={{ height: hauteur }}
                      />
                    </div>
                    <span className={`text-[10px] font-bold ${r.actif ? "text-[#0062a2]" : "text-slate-300"}`}>
                      {r.jour}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dernières transactions */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-800">Dernières transactions</h3>
              <button
                onClick={() => navigate("/transactions")}
                className="text-xs font-semibold text-[#0062a2] hover:underline flex items-center gap-1"
              >
                Tout voir <ChevronRight size={13} />
              </button>
            </div>
            <div className="space-y-2">
              {DERNIERES_TRANSACTIONS.map((t) => (
                <TransactionRow key={t.id} transaction={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          {/* Répartition par mode */}
          <div className="bg-[#0062a2] rounded-4xl p-6 text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/5 rounded-full" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-6">
              Modes de paiement
            </h3>
            <div className="space-y-4">
              <ModeBar label="Espèces"      pct={42} couleur="bg-[#fecb00]" />
              <ModeBar label="Assurance"    pct={30} couleur="bg-white/40" />
              <ModeBar label="Carte"        pct={18} couleur="bg-white/25" />
              <ModeBar label="Mobile Money" pct={10} couleur="bg-white/15" />
            </div>
          </div>

          {/* Recettes par service */}
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-800 text-sm">Recettes par service</h3>
              <MoreHorizontal size={16} className="text-slate-300" />
            </div>
            <div className="space-y-4">
              <ServiceRow label="Consultation générale" montant={420000} total={1850000} />
              <ServiceRow label="Cardiologie"           montant={380000} total={1850000} />
              <ServiceRow label="Pharmacie"             montant={310000} total={1850000} />
              <ServiceRow label="Laboratoire"           montant={280000} total={1850000} />
              <ServiceRow label="Autres"                montant={460000} total={1850000} />
            </div>
          </div>

          {/* Alerte factures */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-4xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} className="text-yellow-600" />
              <h3 className="font-bold text-yellow-800 text-sm">Factures impayées</h3>
            </div>
            <p className="text-3xl font-black text-yellow-700">{fmt(140000)}</p>
            <p className="text-xs text-yellow-600 mt-1">5 factures en attente d'encaissement</p>
            <button
              onClick={() => navigate("/transactions")}
              className="mt-4 w-full py-2.5 bg-yellow-400 text-yellow-900 rounded-xl text-xs font-bold hover:bg-yellow-500 transition"
            >
              Voir les impayés
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const KpiCard = ({ label, valeur, variation, hausse, icone, bg, urgent }) => (
  <div className={`bg-white p-6 rounded-4xl border shadow-sm hover:shadow-md transition-shadow ${urgent ? "border-b-4 border-b-yellow-400 border-slate-100" : "border-slate-100"}`}>
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}>
        {label}
      </span>
      <div className={`${bg} p-2 rounded-xl`}>{icone}</div>
    </div>
    <div className="text-2xl font-black text-slate-800 leading-tight">{valeur}</div>
    {variation && (
      <p className={`text-xs font-bold mt-1 flex items-center gap-1 ${hausse ? "text-green-600" : "text-slate-400"}`}>
        {hausse ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {variation}
      </p>
    )}
  </div>
);

const TransactionRow = ({ transaction }) => (
  <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
        transaction.statut === "Payée" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
      }`}>
        {transaction.statut === "Payée" ? <CheckCircle2 size={16} /> : <Clock size={16} />}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{transaction.patient}</p>
        <p className="text-xs text-slate-400">{transaction.service} — {transaction.date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`text-sm font-black ${transaction.statut === "Payée" ? "text-slate-800" : "text-yellow-600"}`}>
        {fmt(transaction.montant)}
      </p>
      <p className="text-[10px] text-slate-400">{transaction.mode}</p>
    </div>
  </div>
);

const ModeBar = ({ label, pct, couleur }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <span className="text-xs font-medium text-white/70">{label}</span>
      <span className="text-xs font-black text-white">{pct}%</span>
    </div>
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div className={`h-full ${couleur} rounded-full`} style={{ width: `${pct}%` }} />
    </div>
  </div>
);

const ServiceRow = ({ label, montant, total }) => {
  const pct = Math.round((montant / total) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <span className="text-xs font-black text-slate-800">{fmt(montant)}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#0062a2] rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};
