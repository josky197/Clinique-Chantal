import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(
          "Erreur lors de la lecture des données utilisateur:",
          error,
        );
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulation d'une API - À remplacer par votre vraie API
      // Ici, on simule une connexion réussie
      const response = await simulateLogin(email, password);

      if (response.success) {
        const userData = {
          id: response.user.id,
          email: response.user.email,
          nom: response.user.nom,
          prenom: response.user.prenom,
          role: response.user.role,
        };

        // Stocker dans localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", response.token);

        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return {
        success: false,
        error: "Une erreur est survenue lors de la connexion",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}

// Simulation d'une API de connexion
// À remplacer par votre vraie API
async function simulateLogin(email, password) {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Pour la démo, on accepte n'importe quel email/mot de passe
  // En production, vous devrez vérifier avec votre backend

  // Détection du rôle selon l'email (pour la démo)
  // En production, cela viendra du backend
  let role = "medecin";
  let nom = "Martin";
  let prenom = "Dr.";

  if (
    email.toLowerCase().includes("reception") ||
    email.toLowerCase().includes("recep")
  ) {
    role = "receptionniste";
    nom = "Dupont";
    prenom = "Marie";
  } else if (
    email.toLowerCase().includes("laborantin") ||
    email.toLowerCase().includes("labo")
  ) {
    role = "laborantin";
    nom = "Bernard";
    prenom = "Sophie";
  } else if (
    email.toLowerCase().includes("comptable") ||
    email.toLowerCase().includes("compta")
  ) {
    role = "comptable";
    nom = "Durand";
    prenom = "Jean";
  } else if (
    email.toLowerCase().includes("pharmacien") ||
    email.toLowerCase().includes("pharma")
  ) {
    role = "pharmacien";
    nom = "Moreau";
    prenom = "Pierre";
  }

  if (email && password) {
    return {
      success: true,
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: 1,
        email: email,
        nom: nom,
        prenom: prenom,
        role: role,
      },
    };
  }

  return {
    success: false,
    error: "Email ou mot de passe incorrect",
  };
}
