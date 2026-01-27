import { useState } from "react";
import { Pill, AlertTriangle, Package, Search, Plus, Filter, ShoppingCart, TrendingDown } from "lucide-react";

function DashboardPharmacien() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categorieFilter, setCategorieFilter] = useState("Tous");

  const stats = {
    medicamentsStock: 156,
    medicamentsFaibleStock: 12,
    medicamentsRupture: 3,
    prescriptionsAujourdhui: 8,
  };

  const medicaments = [
    {
      id: 1,
      nom: "Paracétamol 1000mg",
      categorie: "Antalgique",
      stock: 45,
      seuilAlerte: 20,
      prixUnitaire: 500,
      dateExpiration: "2025-06-30",
    },
    {
      id: 2,
      nom: "Amoxicilline 500mg",
      categorie: "Antibiotique",
      stock: 8,
      seuilAlerte: 15,
      prixUnitaire: 1200,
      dateExpiration: "2024-12-31",
    },
    {
      id: 3,
      nom: "Ibuprofène 400mg",
      categorie: "Anti-inflammatoire",
      stock: 0,
      seuilAlerte: 10,
      prixUnitaire: 800,
      dateExpiration: "2025-03-15",
    },
    {
      id: 4,
      nom: "Aspirine 500mg",
      categorie: "Antalgique",
      stock: 32,
      seuilAlerte: 20,
      prixUnitaire: 400,
      dateExpiration: "2025-08-20",
    },
  ];

  const prescriptions = [
    {
      id: 1,
      patient: "Alain Dupont",
      medecin: "Dr. Martin",
      medicaments: ["Paracétamol 1000mg", "Amoxicilline 500mg"],
      date: "2024-01-15",
      statut: "En attente",
    },
    {
      id: 2,
      patient: "Béatrice Martin",
      medecin: "Dr. Martin",
      medicaments: ["Ibuprofène 400mg"],
      date: "2024-01-15",
      statut: "Préparée",
    },
  ];

  const categories = ["Tous", "Antalgique", "Antibiotique", "Anti-inflammatoire", "Autre"];

  const filteredMedicaments = medicaments.filter((med) => {
    const matchesCategorie = categorieFilter === "Tous" || med.categorie === categorieFilter;
    const matchesSearch = med.nom.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategorie && matchesSearch;
  });

  const getStockStatus = (stock, seuilAlerte) => {
    if (stock === 0) return { color: "bg-red-100 text-red-800", label: "Rupture" };
    if (stock <= seuilAlerte) return { color: "bg-yellow-100 text-yellow-800", label: "Faible" };
    return { color: "bg-green-100 text-green-800", label: "Disponible" };
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Tableau de Bord Pharmacie
            </h1>
            <p className="text-gray-600">
              Gérez le stock de médicaments et les prescriptions
            </p>
          </div>
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Ajouter médicament
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Médicaments en stock</p>
                <p className="text-3xl font-bold text-gray-900">{stats.medicamentsStock}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Stock faible</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.medicamentsFaibleStock}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rupture de stock</p>
                <p className="text-3xl font-bold text-red-600">{stats.medicamentsRupture}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Prescriptions aujourd'hui</p>
                <p className="text-3xl font-bold text-blue-600">{stats.prescriptionsAujourdhui}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Prescriptions en attente */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Prescriptions en attente
          </h2>
          <div className="space-y-3">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{prescription.patient}</h3>
                  <p className="text-sm text-gray-600">
                    {prescription.medecin} • {prescription.date}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {prescription.medicaments.map((med, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      prescription.statut === "Préparée"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {prescription.statut}
                  </span>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm">
                    Préparer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock des médicaments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Stock des médicaments</h2>
          </div>

          {/* Filtres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un médicament..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <select
                value={categorieFilter}
                onChange={(e) => setCategorieFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Liste des médicaments */}
          <div className="space-y-3">
            {filteredMedicaments.map((med) => {
              const stockStatus = getStockStatus(med.stock, med.seuilAlerte);
              return (
                <div
                  key={med.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Pill className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{med.nom}</h3>
                      <p className="text-sm text-gray-600">{med.categorie}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Expire le {med.dateExpiration} • {med.prixUnitaire.toLocaleString()} FCFA/unité
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{med.stock} unités</p>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${stockStatus.color}`}
                      >
                        {stockStatus.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm">
                      Réapprovisionner
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPharmacien;


