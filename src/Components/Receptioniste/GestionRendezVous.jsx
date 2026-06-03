import { useState } from "react";
import {
  Calendar, Clock, User, Search,
  Plus, CheckCircle2, XCircle, Edit, Phone, Mail, X, Save,
} from "lucide-react";

const SERVICES = [
  "Consultation générale", "Cardiologie", "Pédiatrie",
  "Gynécologie", "Dermatologie", "Ophtalmologie", "ORL", "Neurologie",
];

const MEDECINS = [
  { id: 1, nom: "Dr. Moore",  service: "Consultation générale" },
  { id: 2, nom: "Dr. Dupont", service: "Cardiologie" },
  { id: 3, nom: "Dr. Vance",  service: "Pédiatrie" },
  { id: 4, nom: "Dr. Smith",  service: "Neurologie" },
];

const MOCK_RDV = [
  { id: 1, patient: "Alain Dupont",     telephone: "06 12 34 56 78", email: "alain@email.com",    heure: "09:00", service: "Consultation générale", statut: "Confirmé",   date: new Date().toISOString().split("T")[0], medecin: "Dr. Moore",  notes: "Première consultation" },
  { id: 2, patient: "Béatrice Martin",  telephone: "06 23 45 67 89", email: "beatrice@email.com", heure: "10:30", service: "Cardiologie",           statut: "En attente", date: new Date().toISOString().split("T")[0], medecin: "Dr. Dupont", notes: "Suivi cardiaque" },
  { id: 3, patient: "Charles Lefebvre", telephone: "06 34 56 78 90", email: "charles@email.com",  heure: "11:15", service: "Consultation générale", statut: "Confirmé",   date: new Date().toISOString().split("T")[0], medecin: "Dr. Moore",  notes: "" },
  { id: 4, patient: "Diane Petit",      telephone: "06 45 67 89 01", email: "diane@email.com",    heure: "14:00", service: "Pédiatrie",             statut: "En attente", date: new Date().toISOString().split("T")[0], medecin: "Dr. Vance",  notes: "Enfant de 5 ans" },
];

const STATUT_COLORS = {
  "Confirmé":   "bg-green-50 text-green-700",
  "En attente": "bg-yellow-50 text-yellow-700",
  "Annulé":     "bg-red-50 text-red-700",
};

const inputCls = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0062a2]/20 focus:border-[#0062a2] transition";

// ─────────────────────────────────────────────────────────────────────────────

export default function GestionRendezVous() {
  const [selectedDate, setSelectedDate]   = useState(new Date().toISOString().split("T")[0]);
  const [statusFilter, setStatusFilter]   = useState("Tous");
  const [serviceFilter, setServiceFilter] = useState("Tous");
  const [searchTerm, setSearchTerm]       = useState("");
  const [showModal, setShowModal]         = useState(false);
  const [rdvList, setRdvList]             = useState(MOCK_RDV);

  const filtered = rdvList.filter((rdv) => {
    const matchDate    = rdv.date === selectedDate;
    const matchStatus  = statusFilter === "Tous" || rdv.statut === statusFilter;
    const matchService = serviceFilter === "Tous" || rdv.service === serviceFilter;
    const matchSearch  = rdv.patient.toLowerCase().includes(searchTerm.toLowerCase())
                      || rdv.telephone.includes(searchTerm);
    return matchDate && matchStatus && matchService && matchSearch;
  });

  const handleConfirmer = (id) =>
    setRdvList((prev) => prev.map((r) => r.id === id ? { ...r, statut: "Confirmé" } : r));

  const handleAnnuler = (id) =>
    setRdvList((prev) => prev.map((r) => r.id === id ? { ...r, statut: "Annulé" } : r));

  const handleAjouter = (nouveau) => {
    setRdvList((prev) => [...prev, { ...nouveau, id: Date.now(), statut: "En attente" }]);
    setShowModal(false);
  };

  return (
    <main className="p-8 space-y-6 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestion des rendez-vous</h1>
          <p className="text-slate-500 mt-1 font-medium">
            Planifiez et gérez les rendez-vous des patients
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#0062a2] text-white rounded-2xl font-semibold hover:bg-[#004f82] transition shadow-lg shadow-blue-100"
        >
          <Plus size={18} /> Nouveau rendez-vous
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className={labelCls}>Date</label>
            <input type="date" value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Statut</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className={inputCls}>
              <option value="Tous">Tous</option>
              <option value="Confirmé">Confirmé</option>
              <option value="En attente">En attente</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Service</label>
            <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}
              className={inputCls}>
              <option value="Tous">Tous les services</option>
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Rechercher</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nom, téléphone..." className={`${inputCls} pl-9`} />
            </div>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-bold text-slate-800 mb-5">
          Rendez-vous{" "}
          <span className="text-slate-400 font-medium">({filtered.length})</span>
        </h2>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Calendar size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">Aucun rendez-vous pour cette sélection</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((rdv) => (
              <RendezVousRow
                key={rdv.id} rdv={rdv}
                onConfirmer={() => handleConfirmer(rdv.id)}
                onAnnuler={() => handleAnnuler(rdv.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal nouveau rendez-vous */}
      {showModal && (
        <ModalNouveauRdv
          onClose={() => setShowModal(false)}
          onSave={handleAjouter}
          selectedDate={selectedDate}
        />
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants

const labelCls = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2";

const RendezVousRow = ({ rdv, onConfirmer, onAnnuler }) => (
  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
    <div className="flex items-center gap-4 flex-1">
      <div className="min-w-16 text-center">
        <span className="text-lg font-black text-[#0062a2]">{rdv.heure}</span>
      </div>
      <div className="w-px h-10 bg-slate-200" />
      <div className="flex-1">
        <p className="font-bold text-slate-800 text-sm">{rdv.patient}</p>
        <p className="text-xs text-slate-500">{rdv.service} — {rdv.medecin}</p>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Phone size={11} /> {rdv.telephone}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Mail size={11} /> {rdv.email}
          </span>
        </div>
        {rdv.notes && (
          <p className="text-xs text-slate-400 mt-0.5 italic">{rdv.notes}</p>
        )}
      </div>
      <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${STATUT_COLORS[rdv.statut] ?? "bg-slate-100 text-slate-600"}`}>
        {rdv.statut}
      </span>
    </div>
    <div className="flex gap-1 ml-3">
      {rdv.statut !== "Confirmé" && (
        <button onClick={onConfirmer}
          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition" title="Confirmer">
          <CheckCircle2 size={15} />
        </button>
      )}
      <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition" title="Modifier">
        <Edit size={15} />
      </button>
      {rdv.statut !== "Annulé" && (
        <button onClick={onAnnuler}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition" title="Annuler">
          <XCircle size={15} />
        </button>
      )}
    </div>
  </div>
);

function ModalNouveauRdv({ onClose, onSave, selectedDate }) {
  const [form, setForm] = useState({
    patient: "", telephone: "", email: "",
    service: "", medecin: "", date: selectedDate,
    heure: "", notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient || !form.telephone || !form.service || !form.medecin || !form.heure) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-4xl shadow-2xl w-full max-w-lg p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Nouveau rendez-vous</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Nom du patient <span className="text-red-500">*</span></label>
              <input name="patient" value={form.patient} onChange={handleChange}
                placeholder="Jean Dupont" required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Téléphone <span className="text-red-500">*</span></label>
              <input type="tel" name="telephone" value={form.telephone} onChange={handleChange}
                placeholder="+225 07 00 00 00 00" required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="patient@email.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Service <span className="text-red-500">*</span></label>
              <select name="service" value={form.service} onChange={handleChange}
                required className={inputCls}>
                <option value="">Sélectionner</option>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Médecin <span className="text-red-500">*</span></label>
              <select name="medecin" value={form.medecin} onChange={handleChange}
                required className={inputCls}>
                <option value="">Sélectionner</option>
                {MEDECINS.map((m) => (
                  <option key={m.id} value={m.nom}>{m.nom} — {m.service}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Date <span className="text-red-500">*</span></label>
              <input type="date" name="date" value={form.date} onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Heure <span className="text-red-500">*</span></label>
              <input type="time" name="heure" value={form.heure} onChange={handleChange}
                required className={inputCls} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange}
                rows={2} placeholder="Informations supplémentaires..."
                className={`${inputCls} resize-none`} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 text-slate-700 bg-slate-100 rounded-xl font-semibold hover:bg-slate-200 transition text-sm">
              Annuler
            </button>
            <button type="submit"
              className="px-6 py-2.5 bg-[#0062a2] text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-[#004f82] transition text-sm">
              <Save size={15} /> Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
