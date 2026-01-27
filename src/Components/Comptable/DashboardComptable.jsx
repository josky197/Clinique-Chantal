import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Receipt, Calendar, Search, Download, Filter } from "lucide-react";

function DashboardComptable() {
  const [periode, setPeriode] = useState("mois");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = {
    revenusMois: 125000,
    depensesMois: 45000,
    benefice: 80000,
    facturesEnAttente: 12,
    variationRevenus: "+15%",
    variationDepenses: "-5%",
  };

  const transactions = [
    {
      id: 1,
      type: "Facture",
      patient: "Alain Dupont",
      montant: 15000,
      date: "2024-01-15",
      statut: "Payé",
      service: "Consultation générale",
    },
    {
      id: 2,
      type: "Facture",
      patient: "Béatrice Martin",
      montant: 25000,
      date: "2024-01-15",
      statut: "En attente",
      service: "Cardiologie",
    },
    {
      id: 3,
      type: "Dépense",
      description: "Achat matériel médical",
      montant: -12000,
      date: "2024-01-14",
      statut: "Payé",
    },
    {
      id: 4,
      type: "Facture",
      patient: "Charles Lefebvre",
      montant: 8000,
      date: "2024-01-14",
      statut: "Payé",
      service: "Laboratoire",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      (transaction.patient || transaction.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.service?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getStatutColor = (statut) => {
    switch (statut) {
      case "Payé":
        return "bg-green-100 text-green-800";
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      case "Impayé":
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
              Tableau de Bord Comptable
            </h1>
            <p className="text-gray-600">
              Gérez les finances et la comptabilité de la clinique
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="jour">Aujourd'hui</option>
              <option value="semaine">Cette semaine</option>
              <option value="mois">Ce mois</option>
              <option value="annee">Cette année</option>
            </select>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Revenus ({periode})</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.revenusMois.toLocaleString()} FCFA
            </p>
            <p className="text-sm text-green-600 mt-1">{stats.variationRevenus}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Dépenses ({periode})</p>
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.depensesMois.toLocaleString()} FCFA
            </p>
            <p className="text-sm text-red-600 mt-1">{stats.variationDepenses}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Bénéfice net</p>
              <DollarSign className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-3xl font-bold text-teal-600">
              {stats.benefice.toLocaleString()} FCFA
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Factures en attente</p>
              <Receipt className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.facturesEnAttente}</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher une transaction..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtrer
            </button>
          </div>
        </div>

        {/* Liste des transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Transactions récentes
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Service</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Montant</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Statut</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.type === "Facture"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {transaction.patient || transaction.description}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transaction.service || "-"}
                    </td>
                    <td
                      className={`py-3 px-4 text-sm text-right font-medium ${
                        transaction.montant > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.montant > 0 ? "+" : ""}
                      {transaction.montant.toLocaleString()} FCFA
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(
                          transaction.statut
                        )}`}
                      >
                        {transaction.statut}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <button className="text-teal-600 hover:text-teal-700">
                        Voir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardComptable;


