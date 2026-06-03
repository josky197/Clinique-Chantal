import { useState } from "react";
import { Search, ShieldCheck, ArrowRight, X } from "lucide-react";

const MEDICAMENTS_ORDONNANCE = [
  { id: 1, nom: "Amoxicilline 500 mg",   detail: "Gélule • Boîte de 20",    prescrit: 3, aDispenser: 3, stock: "En stock",  prix: 9500,  disponible: true  },
  { id: 2, nom: "Lisinopril 10 mg",      detail: "Comprimé • Boîte de 30",  prescrit: 1, aDispenser: 1, stock: "En stock",  prix: 4500,  disponible: true  },
  { id: 3, nom: "Ventoline 100 mcg",     detail: "Inhalateur 100 mcg",      prescrit: 1, aDispenser: 0, stock: "Rupture",   prix: 0,     disponible: false },
];

const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";

// ─────────────────────────────────────────────────────────────────────────────

export default function Dispensation() {
  const [codeValidation, setCode]   = useState("");
  const [medicaments, setMeds]      = useState(MEDICAMENTS_ORDONNANCE);
  const [loading, setLoading]       = useState(false);

  const handleQte = (id, val) =>
    setMeds((prev) =>
      prev.map((m) => m.id === id ? { ...m, aDispenser: Math.max(0, val) } : m)
    );

  const sousTotal    = medicaments.filter((m) => m.disponible).reduce((s, m) => s + m.prix * m.aDispenser, 0);
  const priseEnCharge = 7500;
  const total         = Math.max(0, sousTotal - priseEnCharge);

  const handleConfirmer = async () => {
    if (!codeValidation) { alert("Veuillez saisir votre code de validation."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    alert("Dispensation confirmée et enregistrée !");
    setLoading(false);
  };

  return (
    <main className="p-8 animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Dispensation d'ordonnance</h1>

        <div className="bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header ordonnance */}
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-[#f8fafb]/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0062a2]/10 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={22} className="text-[#0062a2]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#2c3436]">Dispensation d'ordonnance</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
                  Clinique Chantal — Pharmacie
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-[#0062a2] bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
              RX-2026-99203
            </span>
          </div>

          <div className="p-8 space-y-8">
            {/* Recherche + statut */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Recherche patient ou ordonnance
                </label>
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className="w-full pl-11 pr-4 py-3 bg-[#f0f4f6] rounded-2xl border-none text-sm font-medium focus:ring-2 focus:ring-[#0062a2]/15 focus:bg-white transition-all outline-none"
                    placeholder="Nom du patient ou n° d'ordonnance…"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <div className="w-full bg-[#0062a2]/5 p-4 rounded-2xl flex items-center gap-4 border border-[#0062a2]/10">
                  <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-[#0062a2] shadow-sm">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#0062a2]">Ordonnance validée</p>
                    <p className="text-[10px] text-[#0062a2]/60 uppercase font-black tracking-widest">
                      ID : RX-2026-99203
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Infos patient */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard label="Patient"            titre="Jean-Pierre Martin" sous="64 ans • Masculin" />
              <InfoCard label="Médecin prescripteur" titre="Dr. Moore"          sous="Médecine générale" />
              <InfoCard label="Date d'émission"    titre="02 mai 2026"         sous="Valide jusqu'au 02 août 2026" />
            </div>

            {/* Tableau médicaments */}
            <div>
              <h3 className="text-xs font-black text-[#2c3436] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0062a2] rounded-full" />
                Médicaments prescrits
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">
                    <tr>
                      <th className="pb-2 pl-4">Produit & Dosage</th>
                      <th className="pb-2">Qté prescrite</th>
                      <th className="pb-2">À dispenser</th>
                      <th className="pb-2 text-center">Statut</th>
                      <th className="pb-2 text-right pr-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicaments.map((m) => (
                      <tr key={m.id} className={`bg-[#f0f4f6]/50 hover:bg-[#f0f4f6] transition-all ${!m.disponible ? "opacity-50" : ""}`}>
                        <td className="py-4 pl-4 rounded-l-2xl">
                          <p className="font-bold text-sm text-[#2c3436]">{m.nom}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{m.detail}</p>
                        </td>
                        <td className="py-4 text-sm font-bold text-slate-500">{m.prescrit} boîte{m.prescrit > 1 ? "s" : ""}</td>
                        <td className="py-4">
                          <input
                            type="number"
                            value={m.aDispenser}
                            onChange={(e) => handleQte(m.id, parseInt(e.target.value) || 0)}
                            disabled={!m.disponible}
                            className="w-16 bg-white border-none rounded-xl text-sm font-black text-center py-2 shadow-sm focus:ring-2 focus:ring-[#0062a2]/20 outline-none disabled:opacity-40"
                          />
                        </td>
                        <td className="py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${m.disponible ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                            {m.stock}
                          </span>
                        </td>
                        <td className="py-4 text-right pr-4 font-black text-[#0062a2] rounded-r-2xl">
                          {m.disponible ? fmt(m.prix * m.aDispenser) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Validation & Facturation */}
            <div className="flex flex-col md:flex-row gap-8 items-stretch">
              {/* Code sécurité */}
              <div className="flex-1 p-6 bg-[#f0f4f6] rounded-4xl space-y-5 border border-slate-100/50">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-[#0062a2]" />
                  <p className="text-xs font-black text-[#2c3436] uppercase tracking-widest">Validation sécurité</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    Code de validation pharmacien
                  </label>
                  <input
                    type="password"
                    value={codeValidation}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-white border-none rounded-2xl py-4 text-center tracking-[0.8em] text-xl font-black text-[#0062a2] shadow-inner focus:ring-2 focus:ring-[#0062a2]/20 outline-none"
                    placeholder="••••"
                  />
                </div>
                <div className="p-4 border-l-4 border-[#0062a2] bg-white rounded-xl shadow-sm">
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                    "Je certifie avoir vérifié l'identité du patient, la posologie et l'absence d'interactions médicamenteuses."
                  </p>
                </div>
              </div>

              {/* Montants */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-4">
                <FactureRow label="Sous-total"         valeur={fmt(sousTotal)} />
                <FactureRow label="Prise en charge"    valeur={`– ${fmt(priseEnCharge)}`} remise />
                <div className="h-px bg-slate-100 my-1" />
                <div className="flex justify-between items-center">
                  <span className="font-black text-lg text-[#2c3436]">Montant total</span>
                  <span className="font-black text-3xl text-[#0062a2]">{fmt(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-8 bg-[#f8fafb] flex flex-col-reverse md:flex-row justify-between items-center gap-4 border-t border-slate-50">
            <button className="text-sm font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors px-4 py-2">
              Annuler
            </button>
            <button
              onClick={handleConfirmer}
              disabled={loading}
              className="w-full md:w-auto px-10 py-4 bg-[#0062a2] text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-[#004f82] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Enregistrement…</>
              ) : (
                <>Confirmer la dispensation <ArrowRight size={16} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const InfoCard = ({ label, titre, sous }) => (
  <div className="bg-[#f0f4f6]/50 p-5 rounded-2xl border border-transparent">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="font-black text-[#2c3436] text-sm">{titre}</p>
    <p className="text-xs font-medium text-slate-500 mt-0.5">{sous}</p>
  </div>
);

const FactureRow = ({ label, valeur, remise }) => (
  <div className="flex justify-between items-center text-sm font-bold">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className={remise ? "text-emerald-600" : "text-[#2c3436]"}>{valeur}</span>
  </div>
);
