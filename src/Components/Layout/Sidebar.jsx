import { NavLink, useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  FileText,
  Stethoscope,
  Pill,
  FlaskConical,
  Bell,
  Settings,
  LogOut,
  Home,
  ClipboardList,
  UserPlus,
  Clock,
  Package,
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

function Sidebar({ isOpen, onToggle }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Menu selon le rôle
  const menuItemsMedecin = [
    {
      path: "/dashboard",
      icon: Home,
      label: "Tableau de bord",
      exact: true,
    },
    {
      path: "/patients",
      icon: Users,
      label: "Patients",
    },
    {
      path: "/consultation",
      icon: Stethoscope,
      label: "Consultation",
    },
    {
      path: "/formulaire-consultation",
      icon: ClipboardList,
      label: "Formulaire Consultation",
    },
    {
      path: "/prescription",
      icon: Pill,
      label: "Prescription",
    },
    {
      path: "/demande-examen",
      icon: FlaskConical,
      label: "Demande Examen",
    },
    {
      path: "/fiche-medical",
      icon: FileText,
      label: "Fiche Médicale",
    },
    {
      path: "/historique",
      icon: Calendar,
      label: "Historique",
    },
    {
      path: "/notifications",
      icon: Bell,
      label: "Notifications",
    },
  ];

  const menuItemsReceptionniste = [
    {
      path: "/dashboard-receptionniste",
      icon: Home,
      label: "Tableau de bord",
      exact: true,
    },
    {
      path: "/ajout-patient",
      icon: UserPlus,
      label: "Nouveau Patient",
    },
    {
      path: "/gestion-rendez-vous",
      icon: Clock,
      label: "Gestion Rendez-vous",
    },
    {
      path: "/patients",
      icon: Users,
      label: "Liste Patients",
    },
  ];

  const menuItemsLaborantin = [
    {
      path: "/dashboard-laborantin",
      icon: Home,
      label: "Tableau de bord",
      exact: true,
    },
    {
      path: "/examens",
      icon: FlaskConical,
      label: "Examens",
    },
  ];

  const menuItemsComptable = [
    {
      path: "/dashboard-comptable",
      icon: Home,
      label: "Tableau de bord",
      exact: true,
    },
    {
      path: "/factures",
      icon: FileText,
      label: "Factures",
    },
    {
      path: "/transactions",
      icon: Calendar,
      label: "Transactions",
    },
  ];

  const menuItemsPharmacien = [
    {
      path: "/dashboard-pharmacien",
      icon: Home,
      label: "Tableau de bord",
      exact: true,
    },
    {
      path: "/stock",
      icon: Package,
      label: "Stock",
    },
    {
      path: "/prescriptions",
      icon: Pill,
      label: "Prescriptions",
    },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case "receptionniste":
        return menuItemsReceptionniste;
      case "laborantin":
        return menuItemsLaborantin;
      case "comptable":
        return menuItemsComptable;
      case "pharmacien":
        return menuItemsPharmacien;
      default:
        return menuItemsMedecin;
    }
  };

  const menuItems = getMenuItems();

  const bottomMenuItems = [
    {
      path: "/settings",
      icon: Settings,
      label: "Paramètres",
    },
    {
      path: "/logout",
      icon: LogOut,
      label: "Déconnexion",
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col`}
    >
      {/* Header Sidebar */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Clinique Chantal</h2>
        <p className="text-sm text-gray-500">
          {user?.prenom} {user?.nom}
        </p>
        <p className="text-xs text-gray-400 capitalize">
          {user?.role === "receptionniste"
            ? "Réceptionniste"
            : user?.role === "laborantin"
            ? "Laborantin"
            : user?.role === "comptable"
            ? "Comptable"
            : user?.role === "pharmacien"
            ? "Pharmacien"
            : "Médecin Généraliste"}
        </p>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Menu bas */}
      <div className="p-4 space-y-2 border-t border-gray-200">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive
                ? "text-teal-600 bg-teal-50"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span>Paramètres</span>
        </NavLink>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

