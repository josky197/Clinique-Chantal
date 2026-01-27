// src/components/PatientManagement.jsx
import { Download, Filter, Search } from "lucide-react";
import React, { useState } from "react";

export default function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  // Données statiques (à remplacer par une API si nécessaire)
  const patients = [
    {
      id: 1,
      fullName: "Alain Dubois",
      lastVisit: "15/06/2024",
      status: "Actif",
    },
    {
      id: 2,
      fullName: "Béatrice Martin",
      lastVisit: "12/06/2024",
      status: "Actif",
    },
    {
      id: 3,
      fullName: "Charles Lefebvre",
      lastVisit: "01/03/2024",
      status: "Inactif",
    },
    {
      id: 4,
      fullName: "Diane Petit",
      lastVisit: "28/05/2024",
      status: "Actif",
    },
    {
      id: 5,
      fullName: "Édouard Moreau",
      lastVisit: "18/06/2024",
      status: "Actif",
    },
    // Ajoutez plus de patients si nécessaire
  ];

  const stats = {
    totalPatients: 256,
    activePatients: 198,
    consultations: 42,
    totalChange: "+12% ce mois-ci",
    activeChange: "+5% ce mois-ci",
    consultChange: "+20% vs mois dernier",
  };

  // Filtrer les patients par recherche
  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Gestion des Patients</h1>
          <p className="text-gray-600">
            Gérez les dossiers, suivez les visites et ajoutez de nouveaux
            patients.
          </p>
        </div>
        <button className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition">
          + Nouveau Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium">Patients Totaux</h3>
          <p className="text-3xl font-bold">{stats.totalPatients}</p>
          <p className="text-teal-500">{stats.totalChange}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium">Patients Actifs</h3>
          <p className="text-3xl font-bold">{stats.activePatients}</p>
          <p className="text-teal-500">{stats.activeChange}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium">Consultations (Mois)</h3>
          <p className="text-3xl font-bold">{stats.consultations}</p>
          <p className="text-teal-500">{stats.consultChange}</p>
        </div>
      </div>

      <div className="flex justify-between border-b border-gray-300 p-4 bg-white">
        <div className="relative w-1/3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, prénom..."
            className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
          <Search size={18} className="absolute top-3 ml-2" />
        </div>
        <div className="flex gap-3">
          <button className="text-gray-700 flex items-center gap-2 py-2 px-4 rounded border hover:bg-gray-50 cursor-pointer border-gray-300 transition">
            <Filter size={14} /> Filtrer
          </button>
          <button className=" text-gray-700 py-2 px-4 rounded border flex gap-2 items-center hover:bg-gray-50 cursor-pointer border-gray-300 transition">
            <Download size={14} /> Exporter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left text-gray-500">Nom Complet</th>
              <th className="p-3 text-left text-gray-500">Dernière Visite</th>
              <th className="p-3 text-left text-gray-500">Statut</th>
              <th className="p-3 text-center text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((patient) => (
              <tr key={patient.id} className="border-t border-gray-300">
                <td className="p-3">{patient.fullName}</td>
                <td className="p-3">{patient.lastVisit}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      patient.status === "Actif"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button className="text-gray-500 hover:text-gray-700">
                    ...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex bg-white justify-between items-center p-2 border-t rounded border-gray-300">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-100 text-gray-500 py-2 px-4 rounded hover:bg-gray-200 transition disabled:opacity-50"
        >
          ← Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-100 text-gray-500 py-2 px-4 rounded hover:bg-gray-200 transition disabled:opacity-50"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
