import React from "react";
import {
  Pill,
  Package,
  ClipboardList,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

const DashboardPharmacien = () => {
  return (
    <main className="p-8 space-y-10 animate-in fade-in duration-700">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Bonjour, Pharmacien. Voici votre tableau de bord.
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Gestion du stock, des ordonnances et des dispensations.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Colonne gauche */}
        <div className="xl:col-span-2 space-y-8">
          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Médicaments en stock"
              value="284"
              sub="Disponible"
              icon={<Pill size={20} />}
              bg="bg-blue-50 text-[#0062a2]"
            />
            <StatCard
              label="Ordonnances du jour"
              value="17"
              sub="À traiter"
              icon={<ClipboardList size={20} />}
              bg="bg-yellow-50 text-yellow-600"
            />
            <StatCard
              label="Dispensations"
              value="12"
              sub="Effectuées"
              icon={<ShoppingCart size={20} />}
              bg="bg-green-50 text-green-600"
            />
            <StatCard
              label="Ruptures de stock"
              value="5"
              sub="Urgent"
              icon={<AlertTriangle size={20} />}
              bg="bg-red-50 text-red-600"
              urgent
            />
          </div>

          {/* Alertes de stock */}
          <section>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-slate-800 text-lg">
                Alertes de stock
              </h3>
              <button className="text-[#0062a2] text-sm font-semibold hover:underline flex items-center gap-1">
                Tout voir <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <StockAlertItem
                name="Amoxicilline 500mg"
                quantity={8}
                threshold={20}
                status="Critique"
              />
              <StockAlertItem
                name="Paracétamol 1000mg"
                quantity={15}
                threshold={30}
                status="Faible"
              />
              <StockAlertItem
                name="Ibuprofène 400mg"
                quantity={3}
                threshold={20}
                status="Critique"
              />
            </div>
          </section>

          {/* Ordonnances récentes */}
          <section>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-slate-800 text-lg">
                Ordonnances récentes
              </h3>
              <button className="text-[#0062a2] text-sm font-semibold hover:underline flex items-center gap-1">
                Voir toutes <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <OrdonnanceItem
                patient="Jean-Pierre Martin"
                medecin="Dr. Moore"
                date="Aujourd'hui, 14:30"
                status="En attente"
              />
              <OrdonnanceItem
                patient="Sophie Laurent"
                medecin="Dr. Dupont"
                date="Aujourd'hui, 11:00"
                status="Dispensée"
                done
              />
              <OrdonnanceItem
                patient="Marc Bernard"
                medecin="Dr. Vance"
                date="Hier, 16:45"
                status="Dispensée"
                done
              />
            </div>
          </section>
        </div>

        {/* Colonne droite */}
        <div className="space-y-8">
          {/* Tendances des ventes */}
          <aside className="bg-[#0062a2] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full" />
            <h3 className="font-bold text-white/80 mb-2 flex justify-between items-center text-sm uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <TrendingUp size={16} />
                Activité hebdo
              </span>
              <MoreHorizontal size={18} className="text-white/40 cursor-pointer" />
            </h3>
            <p className="text-4xl font-black mt-4 mb-1">89</p>
            <p className="text-white/60 text-sm font-medium mb-8">
              Dispensations cette semaine
            </p>
            <div className="h-20 flex items-end gap-1.5">
              <MiniBar height="60%" />
              <MiniBar height="80%" />
              <MiniBar height="45%" />
              <MiniBar height="90%" />
              <MiniBar height="70%" active />
              <MiniBar height="30%" muted />
              <MiniBar height="25%" muted />
            </div>
            <div className="flex justify-between mt-3">
              {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                <span key={i} className="text-[10px] font-bold text-white/30 flex-1 text-center">
                  {d}
                </span>
              ))}
            </div>
          </aside>

          {/* Médicaments populaires */}
          <aside className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex justify-between items-center">
              Top médicaments
              <MoreHorizontal size={18} className="text-slate-400 cursor-pointer" />
            </h3>
            <div className="space-y-4">
              <TopMedItem name="Paracétamol 500mg" count={34} percent={85} />
              <TopMedItem name="Amoxicilline 500mg" count={22} percent={55} />
              <TopMedItem name="Ibuprofène 400mg" count={19} percent={48} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

// --- Sous-composants utilitaires ---

const StatCard = ({ label, value, sub, icon, bg, urgent }) => (
  <div
    className={`bg-white p-6 rounded-4xl border shadow-sm hover:shadow-md transition-shadow ${
      urgent ? "border-b-4 border-b-red-500 border-slate-100" : "border-slate-100"
    }`}
  >
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

const StockAlertItem = ({ name, quantity, threshold, status }) => {
  const isCritical = status === "Critique";
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-10 rounded-full ${isCritical ? "bg-red-500" : "bg-yellow-400"}`} />
        <div>
          <p className="font-bold text-slate-800 text-sm">{name}</p>
          <p className="text-xs text-slate-400">
            {quantity} unités restantes — seuil : {threshold}
          </p>
        </div>
      </div>
      <span
        className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${
          isCritical ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
};

const OrdonnanceItem = ({ patient, medecin, date, status, done }) => (
  <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${done ? "bg-green-50 text-green-600" : "bg-blue-50 text-[#0062a2]"}`}>
        {patient.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-slate-800 text-sm">{patient}</p>
        <p className="text-xs text-slate-400">
          {medecin} — {date}
        </p>
      </div>
    </div>
    <span
      className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${
        done ? "bg-green-50 text-green-600" : "bg-blue-50 text-[#0062a2]"
      }`}
    >
      {status}
    </span>
  </div>
);

const MiniBar = ({ height, active, muted }) => (
  <div className="flex-1 flex flex-col justify-end h-full">
    <div
      className={`w-full rounded-t-lg transition-all ${
        active ? "bg-[#fecb00]" : muted ? "bg-white/10" : "bg-white/30"
      }`}
      style={{ height }}
    />
  </div>
);

const TopMedItem = ({ name, count, percent }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold text-slate-700">{name}</span>
      <span className="text-xs text-slate-400 font-medium">{count} disp.</span>
    </div>
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#0062a2] rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default DashboardPharmacien;
