import { useState } from "react";
import { FlaskConical, Clock, CheckCircle2, AlertCircle, Search, Filter, FileText, TestTube } from "lucide-react";

function DashboardLaborantin() {
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = {
    examensEnAttente: 8,
    examensEnCours: 3,
    examensTermines: 24,
    examensUrgents: 2,
  };

  const examens = [
    {
      id: 1,
      patient: "Alain Dupont",
      type: "Analyse sanguine",
      dateDemande: "2024-01-15",
      dateEchantillon: "2024-01-15",
      statut: "En attente",
      priorite: "Normale",
      medecin: "Dr. Martin",
    },
    {
      id: 2,
      patient: "Béatrice Martin",
      type: "ECBU",
      dateDemande: "2024-01-15",
      dateEchantillon: "2024-01-15",
      statut: "En cours",
      priorite: "Urgente",
      medecin: "Dr. Martin",
    },
    {
      id: 3,
      patient: "Charles Lefebvre",
      type: "Glycémie",
      dateDemande: "2024-01-15",
      dateEchantillon: "2024-01-15",
      statut: "Terminé",
      priorite: "Normale",
      medecin: "Dr. Martin",
    },
    {
      id: 4,
      patient: "Diane Petit",
      type: "NFS",
      dateDemande: "2024-01-15",
      dateEchantillon: "2024-01-15",
      statut: "En attente",
      priorite: "Urgente",
      medecin: "Dr. Martin",
    },
  ];

  const filteredExamens = examens.filter((examen) => {
    const matchesStatus = statusFilter === "Tous" || examen.statut === statusFilter;
    const matchesSearch =
      examen.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      examen.type.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const getStatutColor = (statut) => {
    switch (statut) {
      case "Terminé":
        return "bg-green-100 text-green-800";
      case "En cours":
        return "bg-blue-100 text-blue-800";
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPrioriteColor = (priorite) => {
    return priorite === "Urgente"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Tableau de Bord Laboratoire
            </h1>
            <p className="text-gray-600">
              Gérez les examens et analyses en laboratoire
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">En attente</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.examensEnAttente}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">En cours</p>
                <p className="text-3xl font-bold text-blue-600">{stats.examensEnCours}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Terminés</p>
                <p className="text-3xl font-bold text-green-600">{stats.examensTermines}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Urgents</p>
                <p className="text-3xl font-bold text-red-600">{stats.examensUrgents}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Tous">Tous</option>
                <option value="En attente">En attente</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Patient, type d'examen..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Liste des examens */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Examens ({filteredExamens.length})
          </h2>

          <div className="space-y-3">
            {filteredExamens.map((examen) => (
              <div
                key={examen.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <TestTube className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{examen.patient}</h3>
                    <p className="text-sm text-gray-600">{examen.type}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Demandé par {examen.medecin} • {examen.dateDemande}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPrioriteColor(
                        examen.priorite
                      )}`}
                    >
                      {examen.priorite}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(
                        examen.statut
                      )}`}
                    >
                      {examen.statut}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {examen.statut === "En attente" && (
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm">
                      Démarrer
                    </button>
                  )}
                  {examen.statut === "En cours" && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Finaliser
                    </button>
                  )}
                  {examen.statut === "Terminé" && (
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Voir résultats
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLaborantin;


