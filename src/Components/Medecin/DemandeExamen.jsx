// src/components/MedicalRequest.jsx
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function MedicalRequest() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [examDetails, setExamDetails] = useState({
    type: "Formule sanguine complète",
    otherType: "",
    date: "",
    hour: "",
  });
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState([]);

  // Liste des patients (statique, à remplacer par une API)
  const patients = [
    {
      id: "789123",
      name: "Jean Dupont",
      birthDate: "15/05/1980",
      photo: "https://via.placeholder.com/30",
    },
    // Ajoutez d'autres patients si nécessaire
  ];

  // Gérer la recherche de patient
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Simuler une recherche (filtrer par nom ou ID)
    const foundPatient = patients.find(
      (patient) =>
        patient.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        patient.id.includes(e.target.value)
    );
    setSelectedPatient(foundPatient || null);
  };

  // Gérer les changements dans les détails de l'examen
  const handleExamChange = (e) => {
    const { name, value } = e.target;
    setExamDetails({ ...examDetails, [name]: value });
  };

  // Gérer les notes
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  // Gérer le téléversement de fichiers
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
  };

  // Soumettre la demande
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Veuillez sélectionner un patient.");
      return;
    }
    alert(
      "Demande soumise avec succès : " +
        JSON.stringify({ selectedPatient, examDetails, notes, files })
    );
    // Ajoutez ici la logique pour envoyer les données à un serveur
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-2 text-teal-500">
          Nouvelle Demande d'Examen Médical
        </h1>
        <p className="text-gray-600 mb-4">
          Remplissez les informations ci-dessous pour créer une nouvelle
          demande.
        </p>

        {/* 1. Identification du Patient */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">
            1. Identification du Patient
          </h2>
          <div className="relative mb-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Rechercher par nom, ID..."
              className="w-full p-2 pl-10 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
            <svg
              className="w-5 h-5 text-gray-500 absolute left-3 top-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {selectedPatient && (
            <div className="flex items-center p-2 bg-gray-50 rounded border border-gray-200">
              <img
                src={selectedPatient.photo}
                alt="Photo du patient"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p>{selectedPatient.name}</p>
                <p className="text-sm text-gray-600">
                  ID: {selectedPatient.id} - Date de naissance:{" "}
                  {selectedPatient.birthDate}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 2. Détails de l'Examen */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">2. Détails de l'Examen</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type d'examen
              </label>
              <select
                name="type"
                value={examDetails.type}
                onChange={handleExamChange}
                className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
              >
                <option value="Formule sanguine complète">
                  Formule sanguine complète
                </option>
                <option value="Si 'Autre', veuillez spécifier">
                  Si 'Autre', veuillez spécifier
                </option>
              </select>
            </div>
            {examDetails.type === "Si 'Autre', veuillez spécifier" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom de l'examen
                </label>
                <input
                  type="text"
                  name="otherType"
                  value={examDetails.otherType}
                  onChange={handleExamChange}
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
                  placeholder="Nom de l'examen"
                />
              </div>
            )}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Date souhaitée
                </label>
                <input
                  type="date"
                  name="date"
                  value={examDetails.date}
                  onChange={handleExamChange}
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Heure souhaitée
                </label>
                <input
                  type="time"
                  name="hour"
                  value={examDetails.hour}
                  onChange={handleExamChange}
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Informations Complémentaires */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">
            3. Informations Complémentaires
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes et instructions cliniques
              </label>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="Ajoutez des détails importants, historique du patient, etc."
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Joindre des documents
              </label>
              <div className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200 text-gray-500 flex items-center justify-center">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                  multiple
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer flex gap-3 items-center p-3"
                >
                  <Plus />
                  Cliquez pour téléverser ou glissez-déposez
                  <br />
                  <span className="text-xs">
                    PDF, PNG, JPG, DOCX (MAX. 10MB)
                  </span>
                </label>
                {files.length > 0 && (
                  <p className="mt-2 text-sm">
                    {files.length} fichier(s) sélectionné(s)
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition"
            onClick={() => alert("Annulation non implémentée")}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition"
            onClick={handleSubmit}
          >
            Soumettre la demande
          </button>
        </div>
      </div>
    </div>
  );
}
