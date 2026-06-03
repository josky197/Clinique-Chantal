import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, UserPlus, Calendar, CreditCard,
  Stethoscope, FilePlus, FileText, ClipboardList, User,
  Pill, Package, ShoppingCart, FlaskConical, TestTube,
  TrendingUp, TrendingDown, ReceiptText, BarChart2, AlertCircle,
  ArrowLeftRight, CheckCircle, History, Truck,
  Settings, LogOut,
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

// ─── Menus par rôle ───────────────────────────────────────────────────────────

const MENUS = {
  medecin: [
    { icon: LayoutDashboard, label: "Tableau de bord",      to: "/dashboard" },
    { icon: Stethoscope,     label: "Consultations",        to: "/gestion-consultation" },
    { icon: FilePlus,        label: "Nouvelle consultation", to: "/nouvelle-consultation" },
    { icon: FileText,        label: "Ordonnances",          to: "/ordonnances" },
    { icon: Calendar,        label: "Mon agenda",           to: "/mon-agenda" },
    { icon: User,            label: "Mon profil",           to: "/mon-profil" },
  ],
  receptionniste: [
    { icon: LayoutDashboard, label: "Tableau de bord",  to: "/dashboard-receptionniste" },
    { icon: Users,           label: "Patients",         to: "/liste-patients" },
    { icon: UserPlus,        label: "Nouveau patient",  to: "/ajout-patient" },
    { icon: Calendar,        label: "Rendez-vous",      to: "/gestion-rendez-vous" },
    { icon: CreditCard,      label: "Facturation",      to: "/facturation" },
  ],
  pharmacien: [
    { icon: LayoutDashboard, label: "Tableau de bord",       to: "/dashboard-pharmacien" },
    { icon: Pill,            label: "Médicaments",           to: "/medicaments" },
    { icon: Package,         label: "Niveaux de stock",      to: "/stock" },
    { icon: ArrowLeftRight,  label: "Mouvements de stock",   to: "/mouvements-stock" },
    { icon: ClipboardList,   label: "Ordonnances",           to: "/prescriptions" },
    { icon: CheckCircle,     label: "Dispensation",          to: "/dispensation" },
    { icon: History,         label: "Historique délivrances",to: "/historique-dispensation" },
    { icon: ShoppingCart,    label: "Vente directe",         to: "/vente-directe" },
    { icon: Truck,           label: "Fournisseurs",          to: "/fournisseurs" },
  ],
  comptable: [
    { icon: LayoutDashboard, label: "Tableau de bord",   to: "/dashboard-comptable" },
    { icon: ReceiptText,     label: "Transactions",      to: "/transactions" },
    { icon: TrendingDown,    label: "Dépenses",          to: "/depenses" },
    { icon: AlertCircle,     label: "Créances",          to: "/creances" },
    { icon: BarChart2,       label: "Rapports",          to: "/rapports" },
  ],
  laborantin: [
    { icon: LayoutDashboard, label: "Tableau de bord",  to: "/dashboard-laborantin" },
    { icon: TestTube,        label: "Examens",          to: "/examens" },
    { icon: FileText,        label: "Saisie résultats", to: "/saisie-resultats/1" },
  ],
};

const ROLE_LABELS = {
  medecin:        "Médecin",
  receptionniste: "Réceptionniste",
  pharmacien:     "Pharmacien",
  laborantin:     "Laborantin",
  comptable:      "Comptable",
};

const ROLE_COLORS = {
  medecin:        "bg-blue-100 text-[#0062a2]",
  receptionniste: "bg-purple-100 text-purple-600",
  pharmacien:     "bg-green-100 text-green-700",
  laborantin:     "bg-orange-100 text-orange-600",
  comptable:      "bg-yellow-100 text-yellow-700",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const items    = MENUS[user?.role] ?? [];
  const initials = user
    ? `${user.prenom?.[0] ?? ""}${user.nom?.[0] ?? ""}`.toUpperCase()
    : "?";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-slate-50">
        <div className="w-10 h-10 bg-[#0062a2] rounded-2xl flex items-center justify-center shadow-sm shrink-0">
          <Stethoscope size={20} className="text-[#fecb00]" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-bold text-slate-800 text-sm leading-tight">
            Clinique Chantal
          </h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            Système médical
          </p>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#0062a2] text-white shadow-md shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Navigation secondaire */}
      <div className="px-3 pb-3 space-y-1 border-t border-slate-50 pt-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
              isActive
                ? "bg-slate-100 text-slate-800"
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
            }`
          }
        >
          <Settings size={18} strokeWidth={2} />
          <span>Paramètres</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <LogOut size={18} strokeWidth={2} />
          <span>Se déconnecter</span>
        </button>
      </div>

      {/* Carte utilisateur */}
      <div className="p-3 border-t border-slate-50">
        <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${ROLE_COLORS[user?.role] ?? "bg-slate-200 text-slate-600"}`}>
            {initials}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-slate-800 truncate">
              {user?.prenom} {user?.nom}
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              {ROLE_LABELS[user?.role] ?? "—"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
