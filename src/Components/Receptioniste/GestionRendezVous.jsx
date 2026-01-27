import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  XCircle,
  Edit,
  Phone,
  Mail,
} from "lucide-react";

function GestionRendezVous() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [serviceFilter, setServiceFilter] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const services = [
    "Consultation générale",
    "Cardiologie",
    "Pédiatrie",
    "Gynécologie",
    "Dermatologie",
    "Ophtalmologie",
  ];

  const rendezVous = [
    {
      id: 1,
      patient: "Alain Dupont",
      telephone: "06 12 34 56 78",
      email: "alain.dupont@email.com",
      heure: "09:00",
      service: "Consultation générale",
      statut: "Confirmé",
      date: new Date().toISOString().split("T")[0],
      notes: "Première consultation",
    },
    {
      id: 2,
      patient: "Béatrice Martin",
      telephone: "06 23 45 67 89",
      email: "beatrice.martin@email.com",
      heure: "10:30",
      service: "Cardiologie",
      statut: "En attente",
      date: new Date().toISOString().split("T")[0],
      notes: "Suivi cardiaque",
    },
    {
      id: 3,
      patient: "Charles Lefebvre",
      telephone: "06 34 56 78 90",
      email: "charles.lefebvre@email.com",
      heure: "11:15",
      service: "Consultation générale",
      statut: "Confirmé",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    },
    {
      id: 4,
      patient: "Diane Petit",
      telephone: "06 45 67 89 01",
      email: "diane.petit@email.com",
      heure: "14:00",
      service: "Pédiatrie",
      statut: "En attente",
      date: new Date().toISOString().split("T")[0],
      notes: "Enfant de 5 ans",
    },
  ];

  const filteredRendezVous = rendezVous.filter((rdv) => {
    const matchesDate = rdv.date === selectedDate;
    const matchesStatus = statusFilter === "Tous" || rdv.statut === statusFilter;
    const matchesService = serviceFilter === "Tous" || rdv.service === serviceFilter;
    const matchesSearch =
      rdv.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rdv.telephone.includes(searchTerm);

    return matchesDate && matchesStatus && matchesService && matchesSearch;
  });

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
              Gestion des Rendez-vous
            </h1>
            <p className="text-gray-600">
              Planifiez et gérez les rendez-vous des patients
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Nouveau Rendez-vous
          </button>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
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
                <option value="Confirmé">Confirmé</option>
                <option value="En attente">En attente</option>
                <option value="Annulé">Annulé</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Tous">Tous</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom, téléphone..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Liste des rendez-vous */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Rendez-vous ({filteredRendezVous.length})
          </h2>

          <div className="space-y-3">
            {filteredRendezVous.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Aucun rendez-vous trouvé pour cette date</p>
              </div>
            ) : (
              filteredRendezVous.map((rdv) => (
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
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {rdv.telephone}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {rdv.email}
                        </span>
                      </div>
                      {rdv.notes && (
                        <p className="text-xs text-gray-500 mt-1 italic">{rdv.notes}</p>
                      )}
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
                    <button
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      title="Confirmer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Annuler"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GestionRendezVous;

