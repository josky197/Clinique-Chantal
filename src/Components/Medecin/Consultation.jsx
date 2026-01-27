import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  X,
  ChevronDown,
  Plus,
} from "lucide-react";

function Consultation() {
  const [medications, setMedications] = useState([
    "Paracétamol 1000mg",
    "Amoxicilline 500mg",
  ]);

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full bg-white">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Nouvelle Consultation
            </h1>
            <p className="text-gray-500 text-sm">
              Créez et gérez les détails de la consultation du patient
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
              Annuler
            </button>
            <button className="px-4 py-2 text-white bg-teal-600 rounded hover:bg-teal-700 transition-colors text-sm font-medium">
              Enregistrer Consultation
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Informations Générales
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Patient
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Rechercher ou sélectionner un patient"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
                      />
                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                    <button className="px-3 py-2 bg-teal-50 text-teal-600 rounded hover:bg-teal-100 transition-colors">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Date de la consultation
                    </label>
                    <input
                      type="text"
                      defaultValue="10/27/2023"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Motif de la consultation
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Douleurs abdominales"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Diagnostic et Prescription
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Diagnostic principal
                  </label>
                  <textarea
                    placeholder="Saisir le diagnostic..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Traitements prescrits
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {medications.map((med, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded text-sm"
                      >
                        {med}
                        <button
                          onClick={() => removeMedication(index)}
                          className="hover:text-teal-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Ajouter un médicament"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Notes Détaillées
              </h2>

              <div className="flex gap-2 mb-4 pb-4 border-b border-gray-200">
                <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <Bold size={16} />
                </button>
                <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <Italic size={16} />
                </button>
                <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <Underline size={16} />
                </button>
                <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <List size={16} />
                </button>
                <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <ListOrdered size={16} />
                </button>
              </div>

              <textarea
                placeholder="Saisir les notes de consultation ici..."
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consultation;
