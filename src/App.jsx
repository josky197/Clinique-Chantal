import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Layout from "./Components/Layout/Layout";

// Authentification
import Login from "./Components/Authentification/Login";
import OTP from "./Components/Authentification/OTP";
import SetPassword from "./Components/Authentification/SetPassword";

// Médecin
import DashboardMedecin from "./Components/Medecin/DashboardMedecin";
import Patients from "./Components/Medecin/Patients";
import Consultation from "./Components/Medecin/Consultation";
import FormulaireConsultation from "./Components/Medecin/FormulaireConsultation";
import Prescription from "./Components/Medecin/Prescription";
import DemandeExamen from "./Components/Medecin/DemandeExamen";
import Notification from "./Components/Medecin/Notification";

// Réceptionniste
import DashboardReceptionniste from "./Components/Receptioniste/DashboardReceptionniste";
import AjoutPatient from "./Components/Receptioniste/AjoutPatient";
import GestionRendezVous from "./Components/Receptioniste/GestionRendezVous";

// Laborantin
import DashboardLaborantin from "./Components/Laborantin/DashboardLaborantin";

// Comptable
import DashboardComptable from "./Components/Comptable/DashboardComptable";

// Pharmacien
import DashboardPharmacien from "./Components/Pharmacien/DashboardPharmacien";

// Autres
import FicheMedical from "./Components/FicheMedical";
import HistoriqueConsultation from "./Components/Patients/HistoriqueConsultation";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques (authentification) */}
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/set-password" element={<SetPassword />} />

          {/* Routes protégées avec Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<NavigateToDashboard />} />
            
            {/* Routes communes */}
            <Route path="patients" element={<Patients />} />
            <Route path="settings" element={<div className="p-6">Paramètres</div>} />
            
            {/* Routes Médecin */}
            <Route path="dashboard" element={<RoleBasedRoute allowedRoles={["medecin"]}><DashboardMedecin /></RoleBasedRoute>} />
            <Route path="consultation" element={<RoleBasedRoute allowedRoles={["medecin"]}><Consultation /></RoleBasedRoute>} />
            <Route path="formulaire-consultation" element={<RoleBasedRoute allowedRoles={["medecin"]}><FormulaireConsultation /></RoleBasedRoute>} />
            <Route path="prescription" element={<RoleBasedRoute allowedRoles={["medecin"]}><Prescription /></RoleBasedRoute>} />
            <Route path="demande-examen" element={<RoleBasedRoute allowedRoles={["medecin"]}><DemandeExamen /></RoleBasedRoute>} />
            <Route path="fiche-medical" element={<RoleBasedRoute allowedRoles={["medecin"]}><FicheMedical /></RoleBasedRoute>} />
            <Route path="historique" element={<RoleBasedRoute allowedRoles={["medecin"]}><HistoriqueConsultation /></RoleBasedRoute>} />
            <Route path="notifications" element={<RoleBasedRoute allowedRoles={["medecin"]}><Notification /></RoleBasedRoute>} />
            
            {/* Routes Réceptionniste */}
            <Route path="dashboard-receptionniste" element={<RoleBasedRoute allowedRoles={["receptionniste"]}><DashboardReceptionniste /></RoleBasedRoute>} />
            <Route path="ajout-patient" element={<RoleBasedRoute allowedRoles={["receptionniste"]}><AjoutPatient /></RoleBasedRoute>} />
            <Route path="gestion-rendez-vous" element={<RoleBasedRoute allowedRoles={["receptionniste"]}><GestionRendezVous /></RoleBasedRoute>} />
            
            {/* Routes Laborantin */}
            <Route path="dashboard-laborantin" element={<RoleBasedRoute allowedRoles={["laborantin"]}><DashboardLaborantin /></RoleBasedRoute>} />
            <Route path="examens" element={<RoleBasedRoute allowedRoles={["laborantin"]}><DashboardLaborantin /></RoleBasedRoute>} />
            
            {/* Routes Comptable */}
            <Route path="dashboard-comptable" element={<RoleBasedRoute allowedRoles={["comptable"]}><DashboardComptable /></RoleBasedRoute>} />
            <Route path="factures" element={<RoleBasedRoute allowedRoles={["comptable"]}><DashboardComptable /></RoleBasedRoute>} />
            <Route path="transactions" element={<RoleBasedRoute allowedRoles={["comptable"]}><DashboardComptable /></RoleBasedRoute>} />
            
            {/* Routes Pharmacien */}
            <Route path="dashboard-pharmacien" element={<RoleBasedRoute allowedRoles={["pharmacien"]}><DashboardPharmacien /></RoleBasedRoute>} />
            <Route path="stock" element={<RoleBasedRoute allowedRoles={["pharmacien"]}><DashboardPharmacien /></RoleBasedRoute>} />
            <Route path="prescriptions" element={<RoleBasedRoute allowedRoles={["pharmacien"]}><DashboardPharmacien /></RoleBasedRoute>} />
          </Route>

          {/* Route de déconnexion */}
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <LogoutPage />
              </ProtectedRoute>
            }
          />

          {/* Route 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Composant pour gérer la déconnexion
function LogoutPage() {
  const { logout } = useAuth();
  
  React.useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/login" replace />;
}

// Composant pour rediriger vers le bon dashboard selon le rôle
function NavigateToDashboard() {
  const { user } = useAuth();
  
  const dashboardRoutes = {
    receptionniste: "/dashboard-receptionniste",
    laborantin: "/dashboard-laborantin",
    comptable: "/dashboard-comptable",
    pharmacien: "/dashboard-pharmacien",
    medecin: "/dashboard",
  };
  
  const route = dashboardRoutes[user?.role] || "/dashboard";
  return <Navigate to={route} replace />;
}

// Composant pour protéger les routes selon le rôle
function RoleBasedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  
  if (!user || !allowedRoles.includes(user.role)) {
    const dashboardRoutes = {
      receptionniste: "/dashboard-receptionniste",
      laborantin: "/dashboard-laborantin",
      comptable: "/dashboard-comptable",
      pharmacien: "/dashboard-pharmacien",
      medecin: "/dashboard",
    };
    
    const route = dashboardRoutes[user?.role] || "/dashboard";
    return <Navigate to={route} replace />;
  }
  
  return children;
}

export default App;
