import { useState } from "react";
import { Download, TrendingUp, TrendingDown, ArrowUpRight, Printer } from "lucide-react";

const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

const RAPPORT_MENSUEL = {
  "Janvier":  { recettes: 1420000, depenses: 580000, transactions: 94  },
  "Février":  { recettes: 1650000, depenses: 610000, transactions: 108 },
  "Mars":     { recettes: 1380000, depenses: 560000, transactions: 91  },
  "Avril":    { recettes: 1720000, depenses: 630000, transactions: 115 },
  "Mai":      { recettes: 1850000, depenses: 645000, transactions: 122 },
};

const RECETTES_PAR_SERVICE = [
  { service: "Consultation générale", montant: 420000,  evolution: +12 },
  { service: "Cardiologie",           montant: 380000,  evolution: +5  },
  { service: "Pharmacie",             montant: 310000,  evolution: +18 },
  { service: "Laboratoire",           montant: 280000,  evolution: -3  },
  { service: "Pédiatrie",             montant: 210000,  evolution: +8  },
  { service: "Neurologie",            montant: 185000,  evolution: +2  },
  { service: "Autres",                montant: 65000,   evolution: -1  },
];

const RECETTES_PAR_MODE = [
  { mode: "Espèces",      montant: 777000, pct: 42 },
  { mode: "Assurance",    montant: 555000, pct: 30 },
  { mode: "Carte",        montant: 333000, pct: 18 },
  { mode: "Mobile Money", montant: 185000, pct: 10 },
];

const MAX_SERVICE = Math.max(...RECETTES_PAR_SERVICE.map((s) => s.montant));
const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";

// ─────────────────────────────────────────────────────────────────────────────

const exportCSV = (mois, rapport) => {
  const lignes = [
    ["Clinique Chantal — Rapport financier", mois, "2026"],
    [],
    ["Indicateur", "Valeur"],
    ["Recettes totales", rapport.recettes],
    ["Dépenses", rapport.depenses],
    ["Bénéfice net", rapport.recettes - rapport.depenses],
    ["Transactions", rapport.transactions],
    [],
    ["Service", "Montant (FCFA)", "Évolution"],
    ...RECETTES_PAR_SERVICE.map((s) => [s.service, s.montant, `${s.evolution > 0 ? "+" : ""}${s.evolution}%`]),
  ];
  const csv = lignes.map((l) => l.join(";")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = `rapport_${mois}_2026.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export default function RapportsFinanciers() {
  const [moisSelectionne, setMois] = useState("Mai");
  const rapport = RAPPORT_MENSUEL[moisSelectionne] ?? RAPPORT_MENSUEL["Mai"];
  const benefice = rapport.recettes - rapport.depenses;

  return (
    <main className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Rapports financiers</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Analyse des recettes et dépenses de la clinique
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select value={moisSelectionne} onChange={(e) => setMois(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all">
            {MOIS.map((m) => <option key={m} value={m}>{m} 2025</option>)}
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportCSV(moisSelectionne, rapport)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-2xl font-semibold text-sm hover:bg-slate-200 transition"
            >
              <Download size={15} /> CSV
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0062a2] text-white rounded-2xl font-semibold text-sm hover:bg-[#004f82] transition shadow-lg shadow-blue-100"
            >
              <Printer size={15} /> Imprimer / PDF
            </button>
          </div>
        </div>
      </div>

      {/* KPI du mois sélectionné */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiMois
          label="Recettes totales"
          valeur={fmt(rapport.recettes)}
          icone={<TrendingUp size={22} />}
          bg="bg-green-50"
          couleur="text-green-700"
          sous={`${rapport.transactions} transactions`}
        />
        <KpiMois
          label="Dépenses"
          valeur={fmt(rapport.depenses)}
          icone={<TrendingDown size={22} />}
          bg="bg-red-50"
          couleur="text-red-600"
          sous="Charges opérationnelles"
        />
        <KpiMois
          label="Bénéfice net"
          valeur={fmt(benefice)}
          icone={<ArrowUpRight size={22} />}
          bg="bg-blue-50"
          couleur="text-[#0062a2]"
          sous={`Marge : ${Math.round((benefice / rapport.recettes) * 100)}%`}
          principal
        />
      </div>

      {/* Évolution mensuelle */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-6">Évolution des recettes — 2025</h3>
        <div className="flex items-end gap-3" style={{ height: "160px" }}>
          {Object.entries(RAPPORT_MENSUEL).map(([mois, data]) => {
            const maxVal = Math.max(...Object.values(RAPPORT_MENSUEL).map((d) => d.recettes));
            const hauteur = `${(data.recettes / maxVal) * 100}%`;
            const actif = mois === moisSelectionne;
            return (
              <button key={mois} onClick={() => setMois(mois)}
                className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex flex-col justify-end" style={{ height: "128px" }}>
                  <div
                    className={`w-full rounded-t-2xl transition-all duration-500 ${actif ? "bg-[#0062a2]" : "bg-blue-100 group-hover:bg-blue-200"}`}
                    style={{ height: hauteur }}
                  />
                </div>
                <span className={`text-[10px] font-bold ${actif ? "text-[#0062a2]" : "text-slate-400"}`}>
                  {mois.slice(0, 3)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recettes par service */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-6">Recettes par service — {moisSelectionne}</h3>
          <div className="space-y-5">
            {RECETTES_PAR_SERVICE.map((s) => {
              const pct = Math.round((s.montant / MAX_SERVICE) * 100);
              return (
                <div key={s.service} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-700">{s.service}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold flex items-center gap-0.5 ${s.evolution >= 0 ? "text-green-600" : "text-red-500"}`}>
                        {s.evolution >= 0 ? "+" : ""}{s.evolution}%
                      </span>
                      <span className="text-sm font-black text-slate-800">{fmt(s.montant)}</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0062a2] rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recettes par mode de paiement */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-6">Modes de paiement — {moisSelectionne}</h3>

          {/* Graphique donut simplifié */}
          <div className="flex items-center gap-8 mb-8">
            <div className="relative w-32 h-32 shrink-0">
              <svg viewBox="0 0 36 36" className="w-32 h-32 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                {RECETTES_PAR_MODE.reduce((acc, item, i) => {
                  const COULEURS = ["#0062a2", "#fecb00", "#10b981", "#f59e0b"];
                  const circumference = 2 * Math.PI * 15;
                  const offset = acc.offset;
                  const dash = (item.pct / 100) * circumference;
                  acc.elements.push(
                    <circle key={i} cx="18" cy="18" r="15" fill="none"
                      stroke={COULEURS[i] ?? "#cbd5e1"} strokeWidth="4"
                      strokeDasharray={`${dash} ${circumference - dash}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="round" />
                  );
                  acc.offset += dash;
                  return acc;
                }, { elements: [], offset: 0 }).elements}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-black text-slate-800">
                    {fmt(rapport.recettes).replace(" FCFA", "")}
                  </p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">FCFA</p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {RECETTES_PAR_MODE.map((item, i) => {
                const COULEURS = ["bg-[#0062a2]", "bg-[#fecb00]", "bg-emerald-500", "bg-amber-400"];
                return (
                  <div key={item.mode} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${COULEURS[i]}`} />
                      <span className="text-sm text-slate-600 font-medium">{item.mode}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-800">{item.pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Détail montants */}
          <div className="space-y-2 border-t border-slate-50 pt-4">
            {RECETTES_PAR_MODE.map((item) => (
              <div key={item.mode} className="flex justify-between items-center py-1">
                <span className="text-xs text-slate-500">{item.mode}</span>
                <span className="text-sm font-bold text-slate-700">{fmt(item.montant)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tableau récapitulatif annuel */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Récapitulatif mensuel 2025</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <Th>Mois</Th>
              <Th>Recettes</Th>
              <Th>Dépenses</Th>
              <Th>Bénéfice net</Th>
              <Th>Transactions</Th>
              <Th>Marge</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {Object.entries(RAPPORT_MENSUEL).map(([mois, data]) => {
              const ben = data.recettes - data.depenses;
              const marge = Math.round((ben / data.recettes) * 100);
              const actif = mois === moisSelectionne;
              return (
                <tr key={mois} onClick={() => setMois(mois)}
                  className={`cursor-pointer transition-colors ${actif ? "bg-blue-50" : "hover:bg-slate-50"}`}>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${actif ? "text-[#0062a2]" : "text-slate-700"}`}>
                      {mois}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">{fmt(data.recettes)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-red-500">{fmt(data.depenses)}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800">{fmt(ben)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{data.transactions}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${marge >= 55 ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                      {marge}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const KpiMois = ({ label, valeur, icone, bg, couleur, sous, principal }) => (
  <div className={`rounded-4xl border shadow-sm p-6 ${principal ? "bg-[#0062a2] border-[#0062a2]" : "bg-white border-slate-100"}`}>
    <div className={`w-10 h-10 ${principal ? "bg-white/10" : bg} rounded-2xl flex items-center justify-center ${principal ? "text-white" : couleur} mb-4`}>
      {icone}
    </div>
    <p className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${principal ? "text-white/70" : "text-slate-400"}`}>
      {label}
    </p>
    <p className={`text-2xl font-black leading-tight ${principal ? "text-white" : "text-slate-800"}`}>
      {valeur}
    </p>
    <p className={`text-xs mt-1 font-medium ${principal ? "text-white/50" : "text-slate-400"}`}>{sous}</p>
  </div>
);

const Th = ({ children }) => (
  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
    {children}
  </th>
);
