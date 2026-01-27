import { useState } from 'react';
import { Search, Edit2, Trash2, Plus } from 'lucide-react';

function Prescription() {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Ibuprofène',
      dosage: '100mg',
      frequency: '1 fois par jour',
      duration: '5 jours'
    },
    {
      id: 2,
      name: 'Amoxicilline 500mg',
      dosage: '2 gélules',
      frequency: 'Matin et soir',
      duration: '7 jours'
    }
  ]);

  const removeMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Ajouter une Ordonnance</h1>
          <p className="text-gray-500 text-sm">Ordonnance du 10/25/2025 - Patient: Jean Dupont</p>
        </div>

        <div className="bg-white rounded border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Ajouter un Médicament</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">Rechercher un médicament</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Item id:value&desc=Marque, dosage, format..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Posologie</label>
              <input
                type="text"
                placeholder="ex: 2 comprimés"
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Fréquence</label>
              <input
                type="text"
                placeholder="ex: 3 fois par jour"
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Durée du traitement</label>
              <input
                type="text"
                placeholder="ex: 10 jours"
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Instructions (optionnel)</label>
              <input
                type="text"
                placeholder="ex: À prendre après les repas"
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-teal-600 text-white rounded text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2">
              <Plus size={16} />
              Ajouter le Médicament
            </button>
          </div>
        </div>

        <div className="bg-white rounded border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Médicaments sur l'ordonnance</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">MÉDICAMENT</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">POSOLOGIE</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">FRÉQUENCE</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">DURÉE</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((med) => (
                  <tr key={med.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{med.name}</td>
                    <td className="py-3 px-4 text-gray-700">{med.dosage}</td>
                    <td className="py-3 px-4 text-gray-700">{med.frequency}</td>
                    <td className="py-3 px-4 text-gray-700">{med.duration}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="p-1.5 text-teal-600 hover:bg-teal-50 rounded transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => removeMedication(med.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-6 py-2.5 text-gray-700 bg-gray-200 rounded text-sm font-medium hover:bg-gray-300 transition-colors">
            Annuler
          </button>
          <button className="px-6 py-2.5 text-white bg-teal-600 rounded text-sm font-medium hover:bg-teal-700 transition-colors">
            Valider et Enregistrer l'Ordonnance
          </button>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
