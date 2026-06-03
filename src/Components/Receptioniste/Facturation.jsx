import { useState } from "react";
import {
  CreditCard, CheckCircle2, Clock, Search,
  ChevronRight, Banknote, Printer, TrendingUp,
} from "lucide-react";

const MOCK_FACTURES = [
  { id: 1,  numeroDossier: "PAT-2025-0012", patient: "Alain Dupont",     service: "Consultation générale", medecin: "Dr. Moore",  montant: 15000,  date: "2025-05-01", statut: "En attente",  modePaiement: null },
  { id: 2,  numeroDossier: "PAT-2025-0013", patient: "Béatrice Martin",   service: "Cardiologie",           medecin: "Dr. Dupont", montant: 45000,  date: "2025-05-01", statut: "En attente",  modePaiement: null },
  { id: 3,  numeroDossier: "PAT-2025-0014", patient: "Charles Lefebvre",  service: "Consultation générale", medecin: "Dr. Moore",  montant: 15000,  date: "2025-05-01", statut: "Payée",       modePaiement: "Espèces" },
  { id: 4,  numeroDossier: "PAT-2025-0015", patient: "Diane Petit",       service: "Pédiatrie",             medecin: "Dr. Vance",  montant: 20000,  date: "2025-04-30", statut: "Payée",       modePaiement: "Assurance" },
  { id: 5,  numeroDossier: "PAT-2025-0016", patient: "Édouard Moreau",    service: "Neurologie",            medecin: "Dr. Smith",  montant: 60000,  date: "2025-04-30", statut: "En attente",  modePaiement: null },
  { id: 6,  numeroDossier: "PAT-2025-0017", patient: "Sophie Laurent",    service: "Gynécologie",           medecin: "Dr. Vance",  montant: 25000,  date: "2025-04-29", statut: "Payée",       modePaiement: "Carte" },
];

const MODES_PAIEMENT = ["Espèces", "Carte", "Assurance", "Mobile Money"];

const formatMontant = (n) => n.toLocaleString("fr-FR") + " FCFA";

// ─────────────────────────────────────────────────────────────────────────────

export default function Facturation() {
  const [factures, setFactures]   = useState(MOCK_FACTURES);
  const [search, setSearch]       = useState("");
  const [statutFilter, setStatutFilter] = useState("Tous");
  const [modalFacture, setModalFacture] = useState(null);

  const filtered = factures.filter((f) => {
    const matchSearch  = f.patient.toLowerCase().includes(search.toLowerCase())
                      || f.numeroDossier.toLowerCase().includes(search.toLowerCase());
    const matchStatut  = statutFilter === "Tous" || f.statut === statutFilter;
    return matchSearch && matchStatut;
  });

  const totalJour   = factures.filter((f) => f.date === "2025-05-01" && f.statut === "Payée")
                              .reduce((acc, f) => acc + f.montant, 0);
  const enAttente   = factures.filter((f) => f.statut === "En attente").length;
  const totalPayees = factures.filter((f) => f.statut === "Payée").length;

  const handleEncaisser = (id, mode) => {
    setFactures((prev) =>
      prev.map((f) => f.id === id ? { ...f, statut: "Payée", modePaiement: mode } : f)
    );
    setModalFacture(null);
  };

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Facturation</h1>
        <p className="text-slate-500 mt-1 font-medium">
          Encaissements et suivi des paiements
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Recettes du jour"
          value={formatMontant(totalJour)}
          sub="Encaissées"
          icon={<TrendingUp size={20} />}
          bg="bg-green-50 text-green-700"
        />
        <StatCard
          label="Factures en attente"
          value={enAttente}
          sub="À encaisser"
          icon={<Clock size={20} />}
          bg="bg-yellow-50 text-yellow-700"
          urgent
        />
        <StatCard
          label="Factures payées"
          value={totalPayees}
          sub="Aujourd'hui"
          icon={<CheckCircle2 size={20} />}
          bg="bg-blue-50 text-[#0062a2]"
        />
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par patient ou numéro de dossier..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/20 focus:border-[#0062a2] transition"
            />
          </div>
          <select
            value={statutFilter}
            onChange={(e) => setStatutFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/20 focus:border-[#0062a2] transition min-w-40"
          >
            <option value="Tous">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Payée">Payée</option>
          </select>
        </div>
      </div>

      {/* Tableau des factures */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <Th>N° Dossier</Th>
              <Th>Patient</Th>
              <Th>Service / Médecin</Th>
              <Th>Date</Th>
              <Th>Montant</Th>
              <Th>Statut</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-xs font-bold text-[#0062a2] bg-blue-50 px-2 py-1 rounded-lg">
                    {f.numeroDossier}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800 text-sm">{f.patient}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700 font-semibold">{f.service}</p>
                  <p className="text-xs text-slate-400">{f.medecin}</p>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 font-medium">{f.date}</td>
                <td className="px-6 py-4">
                  <span className="font-black text-slate-800 text-sm">{formatMontant(f.montant)}</span>
                </td>
                <td className="px-6 py-4">
                  <StatutBadge statut={f.statut} mode={f.modePaiement} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-1">
                    {f.statut === "En attente" && (
                      <button
                        onClick={() => setModalFacture(f)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0062a2] text-white text-xs font-bold rounded-xl hover:bg-[#004f82] transition"
                      >
                        <Banknote size={13} /> Encaisser
                      </button>
                    )}
                    <button
                      className="p-2 text-slate-400 hover:text-[#0062a2] hover:bg-blue-50 rounded-xl transition"
                      title="Imprimer"
                    >
                      <Printer size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal encaissement */}
      {modalFacture && (
        <ModalEncaissement
          facture={modalFacture}
          onClose={() => setModalFacture(null)}
          onConfirm={handleEncaisser}
        />
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const StatCard = ({ label, value, sub, icon, bg, urgent }) => (
  <div className={`bg-white p-6 rounded-4xl border shadow-sm hover:shadow-md transition-shadow ${urgent ? "border-b-4 border-b-yellow-400 border-slate-100" : "border-slate-100"}`}>
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${bg}`}>
        {sub}
      </span>
      <div className={`${bg} p-2 rounded-xl`}>{icon}</div>
    </div>
    <div className="text-2xl font-black text-slate-800 mb-1">{value}</div>
    <p className="text-sm text-slate-400 font-medium">{label}</p>
  </div>
);

const Th = ({ children, align = "left" }) => (
  <th className={`px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${align === "right" ? "text-right" : ""}`}>
    {children}
  </th>
);

const StatutBadge = ({ statut, mode }) => {
  const isPayee = statut === "Payée";
  return (
    <div>
      <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${isPayee ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
        {statut}
      </span>
      {mode && <p className="text-[10px] text-slate-400 mt-1">{mode}</p>}
    </div>
  );
};

function ModalEncaissement({ facture, onClose, onConfirm }) {
  const [mode, setMode] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-4xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#0062a2] rounded-2xl flex items-center justify-center">
            <CreditCard size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Encaisser le paiement</h2>
            <p className="text-sm text-slate-400">{facture.patient}</p>
          </div>
        </div>

        {/* Récapitulatif */}
        <div className="bg-slate-50 rounded-2xl p-5 space-y-3 mb-6">
          <Row label="Service"  value={facture.service} />
          <Row label="Médecin"  value={facture.medecin} />
          <Row label="Date"     value={facture.date} />
          <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-500">Montant total</span>
            <span className="text-xl font-black text-[#0062a2]">
              {facture.montant.toLocaleString("fr-FR")} FCFA
            </span>
          </div>
        </div>

        {/* Mode de paiement */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Mode de paiement <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {MODES_PAIEMENT.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`py-3 rounded-xl text-sm font-bold border-2 transition ${
                  mode === m
                    ? "border-[#0062a2] bg-[#0062a2] text-white"
                    : "border-slate-200 text-slate-600 hover:border-[#0062a2]/40"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-slate-700 bg-slate-100 rounded-2xl font-semibold hover:bg-slate-200 transition text-sm"
          >
            Annuler
          </button>
          <button
            onClick={() => mode && onConfirm(facture.id, mode)}
            disabled={!mode}
            className="flex-1 py-3 bg-[#0062a2] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#004f82] transition text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CheckCircle2 size={16} /> Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}

const Row = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs text-slate-400 font-medium">{label}</span>
    <span className="text-sm font-semibold text-slate-700">{value}</span>
  </div>
);
