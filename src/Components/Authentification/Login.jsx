import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Si déjà connecté, rediriger vers le dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError(result.error || "Erreur de connexion");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Section gauche */}
        <div className="w-1/2 bg-teal-800 text-white flex flex-col justify-center p-10">
          <h1 className="text-3xl font-semibold mb-4">Clinique Chantal</h1>
          <p className="text-teal-100 mb-8">
            Votre solution de gestion médicale intégrée.
          </p>
          <p className="text-sm text-teal-200 mt-auto">
            © 2024 Clinique Chantal. Tous droits réservés.
          </p>
        </div>

        {/* Section droite */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Accédez à votre espace
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Bienvenue. Connectez-vous pour continuer.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
                disabled={loading}
              />
            </div>

            {/* Champ mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
                disabled={loading}
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 accent-teal-700"
                  disabled={loading}
                />
                Se souvenir de moi
              </label>
              <a href="#" className="text-teal-600 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-700 text-white py-2 rounded-lg font-medium hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          {/* Note pour la démo */}
          <p className="mt-4 text-xs text-gray-500 text-center">
            Pour la démo, utilisez n'importe quel email et mot de passe
          </p>
        </div>
      </div>
    </div>
  );
}
