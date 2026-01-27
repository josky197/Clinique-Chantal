import { useState } from "react";
import { Calendar, Users, Clock, Plus, Search, Filter, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardReceptionniste() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // Données de démonstration
  const stats = {
    rendezVousAujourdhui: 12,
    nouveauxPatients: 3,
    enAttente: 5,
    confirmes: 7,
  };

  const rendezVous = [
    {
      id: 1,
      patient: "Alain Dupont",
      heure: "09:00",
      service: "Consultation générale",
      statut: "Confirmé",
      telephone: "06 12 34 56 78",
    },
    {
      id: 2,
      patient: "Béatrice Martin",
      heure: "10:30",
      service: "Cardiologie",
      statut: "En attente",
      telephone: "06 23 45 67 89",
    },
    {
      id: 3,
      patient: "Charles Lefebvre",
      heure: "11:15",
      service: "Consultation générale",
      statut: "Confirmé",
      telephone: "06 34 56 78 90",
    },
    {
      id: 4,
      patient: "Diane Petit",
      heure: "14:00",
      service: "Pédiatrie",
      statut: "En attente",
      telephone: "06 45 67 89 01",
    },
    {
      id: 5,
      patient: "Édouard Moreau",
      heure: "15:30",
      service: "Consultation générale",
      statut: "Confirmé",
      telephone: "06 56 78 90 12",
    },
  ];

  const getStatutColor = (statut) => {
    switch (statut) {
      case "Confirmé":
        return "bg-green-100 text-green-800";
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      case "Annulé":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Tableau de Bord Réceptionniste
            </h1>
            <p className="text-gray-600">
              Gérez les rendez-vous et les nouveaux patients
            </p>
          </div>
          <button
            onClick={() => navigate("/ajout-patient")}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Nouveau Patient
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rendez-vous aujourd'hui</p>
                <p className="text-3xl font-bold text-gray-900">{stats.rendezVousAujourdhui}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nouveaux patients</p>
                <p className="text-3xl font-bold text-gray-900">{stats.nouveauxPatients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">En attente</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.enAttente}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Confirmés</p>
                <p className="text-3xl font-bold text-green-600">{stats.confirmes}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Rendez-vous du jour */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Rendez-vous du jour
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(selectedDate).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtrer
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {rendezVous.map((rdv) => (
              <div
                key={rdv.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-center min-w-[80px]">
                    <div className="text-2xl font-bold text-gray-900">{rdv.heure}</div>
                  </div>
                  <div className="h-12 w-px bg-gray-300"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{rdv.patient}</h3>
                    <p className="text-sm text-gray-600">{rdv.service}</p>
                    <p className="text-xs text-gray-500 mt-1">{rdv.telephone}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(
                      rdv.statut
                    )}`}
                  >
                    {rdv.statut}
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardReceptionniste;

