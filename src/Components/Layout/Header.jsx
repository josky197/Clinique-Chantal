import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, User, ChevronDown } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

function Header({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Fermer le menu utilisateur quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Menu mobile */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Recherche */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un patient, une consultation..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions droite */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profil utilisateur */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                DM
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600 hidden md:block" />
            </button>

            {/* Menu déroulant utilisateur */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.prenom} {user?.nom}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    navigate("/settings");
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Mon profil
                </button>
                <button
                  onClick={() => {
                    navigate("/settings");
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Paramètres
                </button>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

