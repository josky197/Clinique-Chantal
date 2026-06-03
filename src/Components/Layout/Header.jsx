import { useState } from "react";
import { Search, Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const ROLE_LABELS = {
  medecin:        "Médecin",
  receptionniste: "Réceptionniste",
  pharmacien:     "Pharmacien",
  laborantin:     "Laborantin",
  comptable:      "Comptable",
};

const ROLE_COLORS = {
  medecin:        "bg-blue-50 text-[#0062a2]",
  receptionniste: "bg-purple-50 text-purple-600",
  pharmacien:     "bg-green-50 text-green-700",
  laborantin:     "bg-orange-50 text-orange-600",
  comptable:      "bg-yellow-50 text-yellow-700",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Header() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [search, setSearch] = useState("");

  const initials = user
    ? `${user.prenom?.[0] ?? ""}${user.nom?.[0] ?? ""}`.toUpperCase()
    : "?";

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-slate-50">
      {/* Recherche */}
      <div className="relative w-72">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un patient, un dossier…"
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all"
        />
      </div>

      {/* Actions & profil */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Paramètres */}
        <button
          onClick={() => navigate("/settings")}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
        >
          <Settings size={20} />
        </button>

        <div className="w-px h-6 bg-slate-100 mx-1" />

        {/* Profil utilisateur */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-800 leading-tight">
              {user?.prenom} {user?.nom}
            </p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ROLE_COLORS[user?.role] ?? "bg-slate-100 text-slate-500"}`}>
              {ROLE_LABELS[user?.role] ?? "—"}
            </span>
          </div>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${ROLE_COLORS[user?.role] ?? "bg-slate-100 text-slate-500"}`}>
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
