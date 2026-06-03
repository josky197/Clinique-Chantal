import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Layout from "./Components/Layout/Layout";

// Authentification
import Login from "./Components/Authentification/Login";

// Médecin
import DashboardMedecin      from "./Components/Medecin/DashboardMedecin";
import Consultation          from "./Components/Medecin/Consultation";
import GestionConsultation   from "./Components/Medecin/GestionConsultation";
import NouvelleConsultation  from "./Components/Medecin/NouvelleConsultation";
import DetailConsultation    from "./Components/Medecin/DetailConsultation";
import DossierPatient        from "./Components/Medecin/DossierPatient";
import ProfilPatient         from "./Components/Medecin/ProfilPatient";
import Ordonnance            from "./Components/Medecin/Ordonnance";
import MonAgenda             from "./Components/Medecin/MonAgenda";
import MonProfil             from "./Components/Medecin/MonProfil";

// Réceptionniste
import DashboardReceptionniste from "./Components/Receptioniste/DashboardReceptionniste";
import AjoutPatient from "./Components/Receptioniste/AjoutPatient";
import GestionRendezVous from "./Components/Receptioniste/GestionRendezVous";
import ListePatients from "./Components/Receptioniste/ListePatients";
import Facturation from "./Components/Receptioniste/Facturation";

// Comptable
import DashboardComptable  from "./Components/Comptable/DashboardComptable";
import Transactions        from "./Components/Comptable/Transactions";
import Depenses            from "./Components/Comptable/Depenses";
import Creances            from "./Components/Comptable/Creances";
import RapportsFinanciers  from "./Components/Comptable/RapportsFinanciers";

// Laborantin
import DashboardLaborantin from "./Components/Laborantin/DashboardLaborantin";
import GestionExamens      from "./Components/Laborantin/GestionExamens";
import SaisieResultats     from "./Components/Laborantin/SaisieResultats";

// Pharmacien
import DashboardPharmacien    from "./Components/Pharmacien/DashboardPharmacien";
import Medicaments             from "./Components/Pharmacien/Medicaments";
import Stock                   from "./Components/Pharmacien/Stock";
import GestionStock            from "./Components/Pharmacien/GestionStock";
import MouvementsStock         from "./Components/Pharmacien/MouvementsStock";
import AjoutMedicament         from "./Components/Pharmacien/AjoutMedicament";
import PrescriptionPharmacien  from "./Components/Pharmacien/Prescription";
import Dispensation            from "./Components/Pharmacien/Dispensation";
import HistoriqueDispensation  from "./Components/Pharmacien/HistoriqueDispensation";
import VenteDirect             from "./Components/Pharmacien/VenteDirect";
import Fournisseurs            from "./Components/Pharmacien/Fournisseurs";

// ─────────────────────────────────────────────────────────────────────────────

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />

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

            {/* ── Médecin ──────────────────────────────────────── */}
            <Route
              path="dashboard"
              element={
                <RoleBasedRoute roles={["medecin"]}>
                  <DashboardMedecin />
                </RoleBasedRoute>
              }
            />
            <Route
              path="consultation"
              element={
                <RoleBasedRoute roles={["medecin"]}>
                  <Consultation />
                </RoleBasedRoute>
              }
            />
            <Route
              path="gestion-consultation"
              element={
                <RoleBasedRoute roles={["medecin"]}>
                  <GestionConsultation />
                </RoleBasedRoute>
              }
            />
            <Route
              path="detail-consultation/:id"
              element={
                <RoleBasedRoute roles={["medecin"]}>
                  <DetailConsultation />
                </RoleBasedRoute>
              }
            />
            <Route
              path="dossier-patient/:id"
              element={
                <RoleBasedRoute roles={["medecin"]}>
                  <DossierPatient />
                </RoleBasedRoute>
              }
            />
            <Route
              path="profil-patient/:id"
              element={
                <RoleBasedRoute roles={["medecin"]}>
                  <ProfilPatient />
                </RoleBasedRoute>
              }
            />
            <Route
              path="nouvelle-consultation"
              element={
                <RoleBasedRoute roles={["medecin"]}>
                  <NouvelleConsultation />
                </RoleBasedRoute>
              }
            />
            <Route
              path="ordonnances"
              element={
                <RoleBasedRoute roles={["medecin"]}>
                  <Ordonnance />
                </RoleBasedRoute>
              }
            />
            <Route
              path="mon-agenda"
              element={
                <RoleBasedRoute roles={["medecin"]}>
                  <MonAgenda />
                </RoleBasedRoute>
              }
            />
            <Route
              path="mon-profil"
              element={
                <RoleBasedRoute roles={["medecin"]}>
                  <MonProfil />
                </RoleBasedRoute>
              }
            />

            {/* ── Réceptionniste ───────────────────────────────── */}
            <Route
              path="dashboard-receptionniste"
              element={
                <RoleBasedRoute roles={["receptionniste"]}>
                  <DashboardReceptionniste />
                </RoleBasedRoute>
              }
            />
            <Route
              path="ajout-patient"
              element={
                <RoleBasedRoute roles={["receptionniste"]}>
                  <AjoutPatient />
                </RoleBasedRoute>
              }
            />
            <Route
              path="gestion-rendez-vous"
              element={
                <RoleBasedRoute roles={["receptionniste"]}>
                  <GestionRendezVous />
                </RoleBasedRoute>
              }
            />
            <Route
              path="liste-patients"
              element={
                <RoleBasedRoute roles={["receptionniste"]}>
                  <ListePatients />
                </RoleBasedRoute>
              }
            />
            <Route
              path="facturation"
              element={
                <RoleBasedRoute roles={["receptionniste"]}>
                  <Facturation />
                </RoleBasedRoute>
              }
            />

            {/* ── Comptable ────────────────────────────────────── */}
            <Route
              path="dashboard-comptable"
              element={
                <RoleBasedRoute roles={["comptable"]}>
                  <DashboardComptable />
                </RoleBasedRoute>
              }
            />
            <Route
              path="transactions"
              element={
                <RoleBasedRoute roles={["comptable"]}>
                  <Transactions />
                </RoleBasedRoute>
              }
            />
            <Route
              path="depenses"
              element={
                <RoleBasedRoute roles={["comptable"]}>
                  <Depenses />
                </RoleBasedRoute>
              }
            />
            <Route
              path="creances"
              element={
                <RoleBasedRoute roles={["comptable"]}>
                  <Creances />
                </RoleBasedRoute>
              }
            />
            <Route
              path="rapports"
              element={
                <RoleBasedRoute roles={["comptable"]}>
                  <RapportsFinanciers />
                </RoleBasedRoute>
              }
            />

            {/* ── Laborantin ───────────────────────────────────── */}
            <Route
              path="dashboard-laborantin"
              element={
                <RoleBasedRoute roles={["laborantin"]}>
                  <DashboardLaborantin />
                </RoleBasedRoute>
              }
            />
            <Route
              path="examens"
              element={
                <RoleBasedRoute roles={["laborantin"]}>
                  <GestionExamens />
                </RoleBasedRoute>
              }
            />
            <Route
              path="saisie-resultats/:id"
              element={
                <RoleBasedRoute roles={["laborantin"]}>
                  <SaisieResultats />
                </RoleBasedRoute>
              }
            />

            {/* ── Pharmacien ───────────────────────────────────── */}
            <Route
              path="dashboard-pharmacien"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <DashboardPharmacien />
                </RoleBasedRoute>
              }
            />
            <Route
              path="medicaments"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <Medicaments />
                </RoleBasedRoute>
              }
            />
            <Route
              path="stock"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <Stock />
                </RoleBasedRoute>
              }
            />
            <Route
              path="gestion-stock"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <GestionStock />
                </RoleBasedRoute>
              }
            />
            <Route
              path="ajout-medicament"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <AjoutMedicament />
                </RoleBasedRoute>
              }
            />
            <Route
              path="prescriptions"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <PrescriptionPharmacien />
                </RoleBasedRoute>
              }
            />
            <Route
              path="dispensation"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <Dispensation />
                </RoleBasedRoute>
              }
            />
            <Route
              path="mouvements-stock"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <MouvementsStock />
                </RoleBasedRoute>
              }
            />
            <Route
              path="historique-dispensation"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <HistoriqueDispensation />
                </RoleBasedRoute>
              }
            />
            <Route
              path="vente-directe"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <VenteDirect />
                </RoleBasedRoute>
              }
            />
            <Route
              path="fournisseurs"
              element={
                <RoleBasedRoute roles={["pharmacien"]}>
                  <Fournisseurs />
                </RoleBasedRoute>
              }
            />

            {/* Route commune */}
            <Route
              path="settings"
              element={<div className="p-8 text-slate-600">Paramètres</div>}
            />
          </Route>

          {/* Déconnexion */}
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <LogoutPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Composants utilitaires de navigation

function LogoutPage() {
  const { logout } = useAuth();
  React.useEffect(() => { logout(); }, [logout]);
  return <Navigate to="/login" replace />;
}

function NavigateToDashboard() {
  const { user } = useAuth();
  const routes = {
    medecin:        "/dashboard",
    receptionniste: "/dashboard-receptionniste",
    laborantin:     "/dashboard-laborantin",
    pharmacien:     "/dashboard-pharmacien",
    comptable:      "/dashboard-comptable",
  };
  return <Navigate to={routes[user?.role] ?? "/dashboard"} replace />;
}

function RoleBasedRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user || !roles.includes(user.role)) {
    const routes = {
      medecin: "/dashboard",
      receptionniste: "/dashboard-receptionniste",
      laborantin: "/dashboard-laborantin",
      pharmacien: "/dashboard-pharmacien",
    };
    return <Navigate to={routes[user?.role] ?? "/dashboard"} replace />;
  }
  return children;
}

export default App;
