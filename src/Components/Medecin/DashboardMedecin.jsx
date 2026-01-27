import { Search, Calendar, Users, Mail, Settings, LogOut, FileText, FlaskConical } from 'lucide-react';

function DashboardMedecin(){
  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
              <p className="text-gray-600">Bienvenue, Dr. Martin</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un patient..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-teal-600">Rendez-vous du jour</h2>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">09:00</div>
                        <div className="text-xs text-gray-500">AM</div>
                      </div>
                      <div className="h-12 w-px bg-yellow-500"></div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Alain Dupont</h3>
                        <p className="text-sm text-gray-500">Consultation de suivi</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Voir dossier
                      </button>
                      <button className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">
                        Démarrer
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">10:30</div>
                        <div className="text-xs text-gray-500">AM</div>
                      </div>
                      <div className="h-12 w-px bg-yellow-500"></div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Béatrice Lefevre</h3>
                        <p className="text-sm text-gray-500">Renouvellement ordonnance</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Voir dossier
                      </button>
                      <button className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600">
                        Terminé
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">11:15</div>
                        <div className="text-xs text-gray-500">AM</div>
                      </div>
                      <div className="h-12 w-px bg-yellow-500"></div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Charles Martin</h3>
                        <p className="text-sm text-gray-500">Première consultation</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Voir dossier
                      </button>
                      <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                        Démarrer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-teal-600 mb-6">Accès Rapide</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent transition-colors">
                    <FileText className="w-12 h-12 text-teal-500 mb-3" />
                    <span className="text-teal-600 font-medium">Créer une ordonnance</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent transition-colors">
                    <FlaskConical className="w-12 h-12 text-teal-500 mb-3" />
                    <span className="text-teal-600 font-medium">Demander un examen</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-teal-600 mb-6">Statistiques Personnelles</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Patients vus aujourd'hui</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">12</span>
                      <span className="text-sm text-green-600">+2%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Ordonnances (semaine)</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">28</span>
                      <span className="text-sm text-red-600">-5%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Résultats en attente</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">4</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-teal-600">Résultats de Laboratoire</h2>
                  <span className="flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
                    2
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900">Nouveau résultat pour D. Moreau</h3>
                        <p className="text-sm text-gray-500">Analyse sanguine - Urgent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default DashboardMedecin;
