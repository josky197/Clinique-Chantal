import React from "react";
import {
  MoreHorizontal,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DashboardContent = () => {
  return (
    <main className="p-8 space-y-10 animate-in fade-in duration-700">
      {/* Welcome Message */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Bonjour, Dr. Moore. Voici votre journée en un coup d'œil.
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Mardi, 24 Octobre — Ciel dégagé à Lyon.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column (Main Stats & Patient) */}
        <div className="xl:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Rendez-vous prévus"
              value="8"
              sub="Aujourd'hui"
              bg="bg-blue-50 text-blue-600"
            />
            <StatCard
              label="Rapports à finaliser"
              value="3"
              sub="En attente"
              bg="bg-purple-50 text-purple-600"
            />
            <StatCard
              label="Moyenne patients"
              value="4.8/5"
              sub="Satisfaction"
              bg="bg-yellow-50 text-yellow-600"
            />
          </div>

          {/* Prochain Patient Card */}
          <section>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-slate-800 text-lg">
                Prochain Patient
              </h3>
              <button className="text-blue-600 text-sm font-semibold hover:underline">
                Détails du dossier
              </button>
            </div>

            <div className="bg-[#005a9c] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-white/20 shadow-xl"
                  alt="Patient"
                />
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex gap-2 mb-3 justify-center lg:justify-start">
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-bold tracking-widest uppercase">
                      14:30
                    </span>
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-bold tracking-widest uppercase">
                      Salle 402
                    </span>
                  </div>
                  <h4 className="text-3xl font-bold mb-1 tracking-tight">
                    Jean-Pierre Martin
                  </h4>
                  <p className="text-blue-100/80 mb-8 font-medium">
                    Consultation générale — Suivi post-opératoire
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <button className="bg-white text-[#005a9c] px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-50 transition-all">
                      Lancer la visite
                    </button>
                    <button className="bg-blue-400/20 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-400/30 transition-all">
                      Repousser de 15m
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full lg:w-40">
                  <VitalBox label="Tension" value="12/8" />
                  <VitalBox label="Poids" value="78 kg" />
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-white opacity-[0.03] rounded-full"></div>
            </div>
          </section>

          {/* Planning */}
          <section>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-slate-800 text-lg">
                Planning de la journée
              </h3>
              <div className="flex gap-2">
                <button className="p-2 bg-white border border-slate-100 rounded-lg shadow-sm">
                  <ChevronLeft size={16} />
                </button>
                <button className="p-2 bg-white border border-slate-100 rounded-lg shadow-sm">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <ScheduleItem
                time="15:15"
                name="Sophie Laurent"
                note="Neurologie — Première visite"
                status="Confirmé"
              />
              <ScheduleItem
                time="16:00"
                name="Marc Dupont"
                note="Contrôle IRM"
                status="Retard 10m"
                color="red"
              />
            </div>
          </section>
        </div>

        {/* Right Column (Notes & Files) */}
        <div className="space-y-8">
          <aside className="bg-indigo-50/50 rounded-[2.5rem] p-8 border border-indigo-100/50">
            <h3 className="font-bold text-slate-800 mb-6 flex justify-between items-center">
              Notes & Rappels{" "}
              <MoreHorizontal
                size={18}
                className="text-slate-400 cursor-pointer"
              />
            </h3>
            <ul className="space-y-4">
              <TodoItem text="Appeler Labo Central (Martin)" checked />
              <TodoItem text="Vérifier planning vacances" />
              <TodoItem text="Commander nouveaux stocks" />
            </ul>
            <button className="mt-8 text-indigo-600 font-bold text-sm flex items-center gap-2">
              <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                +
              </span>
              Ajouter une note rapide
            </button>
          </aside>

          <aside className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Fichiers Récents</h3>
            <div className="space-y-4">
              <FileItem name="IRM_Brain_Laurent.pdf" date="Envoyé il y a 2h" />
              <FileItem name="Ordonnance_Martin.docx" date="Modifié ce matin" />
            </div>
            <button className="w-full mt-6 py-3 text-slate-400 font-medium text-sm border-2 border-dashed border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
              Voir tous les documents
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
};

// --- Sous-composants utilitaires ---

const StatCard = ({ label, value, sub, bg }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <span
        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}
      >
        {sub}
      </span>
    </div>
    <div className="text-4xl font-black text-slate-800 mb-1">{value}</div>
    <p className="text-sm text-slate-400 font-medium">{label}</p>
  </div>
);

const VitalBox = ({ label, value }) => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-4 text-center">
    <p className="text-[10px] uppercase font-bold text-blue-100/60 mb-1">
      {label}
    </p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const ScheduleItem = ({ time, name, note, status, color }) => (
  <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-6">
      <span className="font-bold text-slate-400 w-12">{time}</span>
      <div
        className={`w-1.5 h-10 rounded-full ${color === "red" ? "bg-red-500" : "bg-blue-500"}`}
      ></div>
      <div>
        <p className="font-bold text-slate-800">{name}</p>
        <p className="text-xs text-slate-400">{note}</p>
      </div>
    </div>
    <span
      className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${color === "red" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"}`}
    >
      {status}
    </span>
  </div>
);

const TodoItem = ({ text, checked }) => (
  <li className="flex items-center gap-4 text-sm font-medium text-slate-700">
    <div
      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${checked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200"}`}
    >
      {checked && "✓"}
    </div>
    <span className={checked ? "line-through opacity-40" : ""}>{text}</span>
  </li>
);

const FileItem = ({ name, date }) => (
  <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer">
    <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
      <FileText size={20} />
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-sm font-bold text-slate-800 truncate">{name}</p>
      <p className="text-[10px] text-slate-400">{date}</p>
    </div>
  </div>
);

export default DashboardContent;
