// src/components/PatientProfile.jsx
import { Phone } from "lucide-react";
import React from "react";

export default function FicheMedical() {
  // Données statiques (à remplacer par une API si nécessaire)
  const patient = {
    name: "Jean Dupont",
    age: "65 ans",
    id: "789-123",
    photo: "https://via.placeholder.com/50", // Remplacez par une vraie URL d'image si disponible
    personalInfo: {
      birthDate: "16/08/1960",
      phone: "03 25 66 78",
      mobile: "06 12 34 56 78",
      email: "jean.dupont@email.com",
      address: "123 Rue de la Santé, 75021 Paris",
    },
    medicalHistory: [
      "Hypercholestérolémie (diagnostic en 2018)",
      "Appendicectomie (1986)",
      "Histoire familiale de maladies cardiaques (père)",
    ],
    treatments: [
      "Lisinopril (10mg par jour) - Pour l’hypertension",
      "Atorvastatine (20mg par soir) - Pour le cholestérol",
    ],
    allergies: [
      { name: "Pénicilline", severity: "SÉVÈRE" },
      { name: "Pollen", severity: "MODÉRÉE" },
      { name: "Arachides", severity: "MODÉRÉE" },
    ],
    emergencyContacts: [
      { name: "Marie Dupont", phone: "03 98 54 12 34" },
      { name: "Lucas Dupont", phone: "07 34 56 78 90" },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className=" p-6">
        <div className="flex bg-white p-4 rounded-lg items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={patient.photo}
              alt="Photo du patient"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h1 className="text-xl font-semibold">{patient.name}</h1>
              <p className="text-gray-600 text-sm">{patient.age}</p>
              <p className="text-sm">ID Patient: {patient.id}</p>
            </div>
          </div>
          <div className="space-x-2">
            <button className="bg-gray-200 text-gray-700 py-1 px-2 rounded hover:bg-gray-300 transition">
              Modifier
            </button>
            <button className="bg-teal-500 text-white py-1 px-2 rounded hover:bg-emerald-600-600 transition">
              Importer un fichier
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col gap-6 w-full ">
            {/* Informations Personnelles */}
            <div className="p-4 bg-white rounded-lg">
              <h2 className="text-lg font-medium mb-2">
                Informations Personnelles
              </h2>
              <ul className=" text-gray-600 mt-5">
                <div className="grid grid-cols-2 pt-2 pb-2 border-y border-gray-200">
                  <li>
                    Date de naissance{" "}
                    <div>{patient.personalInfo.birthDate}</div>
                  </li>
                  <li>
                    Téléphone: <div>{patient.personalInfo.phone}</div>
                  </li>
                </div>
                <div className="grid grid-cols-2 pt-2 pb-2 border-b border-gray-200">
                  <li>
                    Sexe: <div>Masculin</div>
                  </li>
                  <li>
                    Email: <div>{patient.personalInfo.email}</div>
                  </li>
                </div>
                <li className="py-2">
                  Adresse: {patient.personalInfo.address}
                </li>
              </ul>
            </div>

            {/* Antécédents Médicaux */}
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-lg font-medium mb-2">Antécédents Médicaux</h2>
              <ul className="space-y-2 text-gray-600">
                {patient.medicalHistory.map((history, index) => (
                  <li key={index}>{history}</li>
                ))}
              </ul>
            </div>

            {/* Traitements et Médicaments en Cours */}
            <div className="p-4 bg-white rounded-lg">
              <h2 className="text-lg font-medium mb-2">
                Traitements et Médicaments en Cours
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li className="bg-teal-50 p-4 rounded-md flex justify-between items-center">
                  <div>
                    <div className="flex flex-col">
                      <span className="font-bold">Ducaciline</span>
                      <span className="text-xs">100mg 1 fois par jour</span>
                    </div>
                  </div>
                  <span>Pour hypertension</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Allergies et Intolérances */}
            <div className="bg-white p-4 rounded-lg flex flex-col">
              <h2 className="text-lg font-medium mb-2 w-full">
                Allergies et Intolérances
              </h2>
              <ul className="space-y-2">
                {patient.allergies.map((allergy, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">⚠️</span>
                    <span>{allergy.name}</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        allergy.severity === "SÉVÈRE"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {allergy.severity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts d'Urgence */}
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-lg font-medium mb-2">Contacts d'Urgence</h2>
              <ul className="space-y-4 text-gray-600">
                <div className="text-gray-500 border-b pb-2 border-gray-100">
                  <p className="text-sm font-semibold">Marie Dupont</p>
                  <p className="text-xs">Epouse</p>
                  <div className="flex gap-2 items-center text-teal-600 text-sm mt-2">
                    <Phone size={14} />
                    620 97 05 00
                  </div>
                </div>
                <div className="text-gray-500 border-b pb-2 border-gray-100">
                  <p className="text-sm font-semibold">Marie Dupont</p>
                  <p className="text-xs">Epouse</p>
                  <div className="flex gap-2 items-center text-teal-600 text-sm mt-2">
                    <Phone size={14} />
                    620 97 05 00
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
