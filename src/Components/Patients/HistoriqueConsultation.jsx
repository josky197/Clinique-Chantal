// src/components/AppointmentManagement.jsx
import React, { useState } from "react";

export default function AppointmentManagement() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Jean Dupont",
      time: "09:00",
      status: "Confirmé",
      date: "2025-11-01",
    },
    {
      id: 2,
      patient: "Marie Lefèvre",
      time: "10:30",
      status: "En attente",
      date: "2025-11-01",
    },
    {
      id: 3,
      patient: "Pierre Martin",
      time: "14:00",
      status: "Annulé",
      date: "2025-11-02",
    },
  ]);

  // Filtrer les rendez-vous par date et statut
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDate = appointment.date === selectedDate;
    const matchesStatus =
      statusFilter === "Tous" || appointment.status === statusFilter;
    return matchesDate && matchesStatus;
  });

  // Ajouter un rendez-vous (simulé)
  const addAppointment = () => {
    const newAppointment = {
      id: Date.now(),
      patient: "Nouveau Patient",
      time: "15:00",
      status: "En attente",
      date: selectedDate,
    };
    setAppointments([...appointments, newAppointment]);
  };

  // Supprimer un rendez-vous
  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-semibold mb-2">Gestion des Rendez-vous</h1>
        <p className="text-gray-600 mb-4">
          Dernière mise à jour :{" "}
          {new Date().toLocaleString("fr-FR", { timeZone: "CET" })}
        </p>

        {/* Filtres et Date */}
        <div className="flex flex-col items-end md:flex-row justify-between mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
            >
              <option value="Tous">Tous</option>
              <option value="Confirmé">Confirmé</option>
              <option value="En attente">En attente</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
          <button
            onClick={addAppointment}
            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition w-full md:w-auto"
          >
            + Nouveau Rendez-vous
          </button>
        </div>

        {/* Liste des Rendez-vous */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left text-gray-600">Patient</th>
                <th className="p-2 text-left text-gray-600">Heure</th>
                <th className="p-2 text-left text-gray-600">Statut</th>
                <th className="p-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-t">
                    <td className="p-2">{appointment.patient}</td>
                    <td className="p-2">{appointment.time}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          appointment.status === "Confirmé"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "En attente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => deleteAppointment(appointment.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 text-center text-gray-600">
                    Aucun rendez-vous pour cette date et ce statut.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
