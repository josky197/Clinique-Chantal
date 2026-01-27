import { useState } from "react";
import { CheckCircle, Bell, FlaskConical } from "lucide-react";

export default function NotificationsCenter() {
  const [activeTab, setActiveTab] = useState("toutes");

  const notifications = [
    {
      id: 1,
      type: "laboratoire",
      icon: FlaskConical,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      borderColor: "border-l-red-400",
      title: "Nouveau résultat critique pour Jean Dupont",
      subtitle: "Analyse sanguine · Hémoglobine A1c",
      time: "Il y a 5 min",
      status: "active",
      category: "laboratoire",
    },
    {
      id: 2,
      type: "rappel",
      icon: Bell,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      borderColor: "border-l-yellow-400",
      title: "Rappel: Consultation Marie Curie",
      subtitle: "Aujourd'hui à 15:00",
      time: "Il y a 1 heure",
      status: "active",
      category: "rappels",
    },
    {
      id: 3,
      type: "tache",
      icon: CheckCircle,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      borderColor: "border-l-gray-300",
      title: "Tâche assignée: Vérifier stock Paracétamol",
      subtitle: "Assigné par Dr. Martin",
      time: "Il y a 3 heures",
      status: "read",
      category: "taches",
    },
    {
      id: 4,
      type: "laboratoire",
      icon: FlaskConical,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      borderColor: "border-l-gray-300",
      title: "Résultat normal pour Alain Prost",
      subtitle: "Panel lipidique complet",
      time: "Hier",
      status: "read",
      category: "laboratoire",
    },
  ];

  const tabs = [
    { id: "toutes", label: "Toutes" },
    { id: "laboratoire", label: "Laboratoire" },
    { id: "rappels", label: "Rappels" },
    { id: "taches", label: "Tâches" },
    { id: "non-lues", label: "Non lues" },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "toutes") return true;
    if (activeTab === "non-lues") return notif.status === "active";
    return notif.category === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Centre de Notifications
          </h1>
          <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium">
            Tout Marquer comme Lu
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? "bg-teal-100 text-teal-700"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`bg-white rounded-lg p-4 flex items-start gap-4 border-l-4 ${
                  notif.borderColor
                } ${
                  notif.status === "read" ? "opacity-60" : ""
                } hover:shadow-md transition cursor-pointer`}
              >
                <div className={`${notif.iconBg} p-3 rounded-lg flex-shrink-0`}>
                  <Icon className={`${notif.iconColor} w-6 h-6`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-gray-900 font-semibold flex items-center gap-2">
                      {notif.title}
                      {notif.status === "active" && (
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      )}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{notif.subtitle}</p>
                  <p className="text-gray-400 text-sm mt-1">{notif.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500">
              Aucune notification dans cette catégorie
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
