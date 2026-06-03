import { useState } from "react";
import {
  Search, Plus, Minus, Trash2,
  Pill, Thermometer, ShieldCheck, ShoppingCart, Printer,
} from "lucide-react";

const PRODUITS_RAPIDES = [
  { id: 1, nom: "Paracétamol 500 mg",    prix: 2500,  icone: Pill,          couleur: "bg-blue-50 text-[#0062a2]" },
  { id: 2, nom: "Vitamine C 1000 mg",    prix: 6000,  icone: Plus,          couleur: "bg-orange-50 text-orange-600" },
  { id: 3, nom: "Sirop de toux adultes", prix: 4500,  icone: Pill,          couleur: "bg-pink-50 text-pink-600" },
  { id: 4, nom: "Masque chirurgical",    prix: 250,   icone: ShieldCheck,   couleur: "bg-slate-100 text-slate-600" },
  { id: 5, nom: "Pansements adhésifs",   prix: 1500,  icone: Plus,          couleur: "bg-emerald-50 text-emerald-600" },
  { id: 6, nom: "Thermomètre digital",   prix: 7500,  icone: Thermometer,   couleur: "bg-purple-50 text-purple-600" },
];

const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";

// ─────────────────────────────────────────────────────────────────────────────

export default function VenteDirect() {
  const [panier, setPanier] = useState([
    { id: 1, nom: "Paracétamol 500 mg", prix: 2500, qte: 2, icone: Pill },
    { id: 3, nom: "Sirop de toux adultes", prix: 4500, qte: 1, icone: Pill },
  ]);
  const [search, setSearch] = useState("");

  const ajouterAuPanier = (produit) => {
    setPanier((prev) => {
      const existe = prev.find((p) => p.id === produit.id);
      if (existe) return prev.map((p) => p.id === produit.id ? { ...p, qte: p.qte + 1 } : p);
      return [...prev, { ...produit, qte: 1 }];
    });
  };

  const modifierQte = (id, delta) => {
    setPanier((prev) =>
      prev.map((p) => p.id === id ? { ...p, qte: Math.max(1, p.qte + delta) } : p)
    );
  };

  const retirerDuPanier = (id) =>
    setPanier((prev) => prev.filter((p) => p.id !== id));

  const sousTotal = panier.reduce((s, p) => s + p.prix * p.qte, 0);
  const tva       = Math.round(sousTotal * 0.055);
  const total     = sousTotal + tva;

  return (
    <main className="p-8 animate-in fade-in duration-700">
      <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto">
        {/* Colonne gauche — Recherche & produits */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Vente directe (OTC)</h1>
            <p className="text-slate-500 mt-1 font-medium text-sm">
              Médicaments sans ordonnance — Over The Counter
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0062a2]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-14 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0062a2]/15 focus:border-[#0062a2] transition-all placeholder:text-slate-300"
              placeholder="Nom du produit ou scanner code-barres…"
            />
          </div>

          {/* Accès rapide */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
              Produits courants
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUITS_RAPIDES.filter((p) =>
                p.nom.toLowerCase().includes(search.toLowerCase())
              ).map((produit) => (
                <button
                  key={produit.id}
                  onClick={() => ajouterAuPanier(produit)}
                  className="bg-white p-5 rounded-4xl text-left hover:scale-[1.02] hover:shadow-md transition-all flex items-start gap-4 border border-slate-100 shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0 ${produit.couleur}`}>
                    <produit.icone size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm leading-tight mb-1">{produit.nom}</p>
                    <p className="text-sm font-black text-[#0062a2]">{fmt(produit.prix)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bandeau conseil */}
          <div className="p-6 bg-[#0062a2] rounded-4xl text-white flex items-center gap-6 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full" />
            <ShieldCheck size={32} className="shrink-0 opacity-80" />
            <div>
              <h4 className="font-black font-['Manrope'] mb-1">Conseil de sécurité</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Vérifiez systématiquement les allergies connues et les contre-indications avant toute vente sans ordonnance.
              </p>
            </div>
          </div>
        </div>

        {/* Colonne droite — Panier & paiement */}
        <div className="w-full xl:w-96 shrink-0">
          <div className="bg-white rounded-4xl shadow-sm border border-slate-100 flex flex-col overflow-hidden sticky top-24">
            {/* En-tête panier */}
            <div className="p-5 bg-slate-50/50 border-b border-slate-50 flex justify-between items-center">
              <span className="font-black text-slate-800 flex items-center gap-2 text-sm">
                <ShoppingCart size={16} className="text-[#0062a2]" />
                Panier ({panier.length} article{panier.length > 1 ? "s" : ""})
              </span>
              {panier.length > 0 && (
                <button onClick={() => setPanier([])}
                  className="text-[10px] font-black text-red-500 uppercase hover:underline tracking-widest">
                  Vider
                </button>
              )}
            </div>

            {/* Articles */}
            <div className="flex-1 p-5 space-y-4 min-h-[200px]">
              {panier.length === 0 ? (
                <div className="text-center py-10 text-slate-300">
                  <ShoppingCart size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">Panier vide</p>
                </div>
              ) : panier.map((item) => (
                <div key={item.id} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                    <item.icone size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2c3436] truncate">{item.nom}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      {fmt(item.prix)} / unité
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="flex items-center gap-2 bg-slate-100 rounded-full px-2 py-1">
                      <button onClick={() => modifierQte(item.id, -1)}
                        className="w-5 h-5 flex items-center justify-center bg-white rounded-full text-[#0062a2] shadow-sm hover:scale-110 transition-transform">
                        <Minus size={10} strokeWidth={3} />
                      </button>
                      <span className="text-xs font-black text-[#2c3436] w-4 text-center">{item.qte}</span>
                      <button onClick={() => modifierQte(item.id, 1)}
                        className="w-5 h-5 flex items-center justify-center bg-white rounded-full text-[#0062a2] shadow-sm hover:scale-110 transition-transform">
                        <Plus size={10} strokeWidth={3} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#2c3436]">{fmt(item.prix * item.qte)}</span>
                      <button onClick={() => retirerDuPanier(item.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé financier */}
            <div className="p-5 bg-slate-50/50 border-t border-slate-100 space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Sous-total</span><span>{fmt(sousTotal)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>TVA (5,5 %)</span><span>{fmt(tva)}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="text-sm font-black text-[#2c3436] uppercase tracking-widest">Total</span>
                <span className="text-2xl font-black text-[#0062a2]">{fmt(total)}</span>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  disabled={panier.length === 0}
                  className="w-full bg-[#0062a2] text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-[#004f82] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Printer size={16} /> Encaisser & imprimer
                </button>
                <button
                  onClick={() => setPanier([])}
                  className="w-full py-2.5 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  Annuler la vente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
