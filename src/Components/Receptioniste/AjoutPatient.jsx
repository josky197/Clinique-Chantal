import { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Clock, Stethoscope, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PatientRegistrationModal() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    sexe: '',
    dateNaissance: '',
    adresse: '',
    telephone: '',
    email: '',
  });

  const [serviceSelectionne, setServiceSelectionne] = useState("");
  const [priseRendezVous, setPriseRendezVous] = useState(false);
  const [dateRendezVous, setDateRendezVous] = useState("");
  const [heureRendezVous, setHeureRendezVous] = useState("");

  const services = [
    "Consultation générale",
    "Cardiologie",
    "Pédiatrie",
    "Gynécologie",
    "Dermatologie",
    "Ophtalmologie",
    "ORL",
    "Neurologie",
    "Radiologie",
    "Laboratoire",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation des champs obligatoires
    if (!formData.prenom || !formData.nom || !formData.sexe || !formData.dateNaissance || 
        !formData.telephone || !serviceSelectionne) {
      alert('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    if (priseRendezVous && (!dateRendezVous || !heureRendezVous)) {
      alert('Veuillez remplir la date et l\'heure du rendez-vous');
      setLoading(false);
      return;
    }

    const donneesPatient = {
      ...formData,
      service: serviceSelectionne,
      rendezVous: priseRendezVous ? {
        date: dateRendezVous,
        heure: heureRendezVous,
      } : null,
    };

    try {
      // Simulation d'un appel API
      console.log('Données du patient:', donneesPatient);
      
      // Ici, vous feriez l'appel API réel
      // await api.creerPatient(donneesPatient);
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation délai
      
      alert('Patient enregistré avec succès !' + (priseRendezVous ? ' Rendez-vous créé.' : ''));
      
      // Réinitialiser le formulaire
      setFormData({
        prenom: '',
        nom: '',
        sexe: '',
        dateNaissance: '',
        adresse: '',
        telephone: '',
        email: '',
      });
      setServiceSelectionne("");
      setPriseRendezVous(false);
      setDateRendezVous("");
      setHeureRendezVous("");
      
      // Optionnel : rediriger vers la liste des patients
      // navigate('/patients');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      alert('Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Nouveau Patient
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enregistrez les informations de base du patient et redirigez-le vers un service
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Section 1 : Données Personnelles */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" />
                Informations Personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Entrez le prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Entrez le nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sexe <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sexe"
                    value={formData.sexe}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Section 2 : Informations de Contact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-teal-600" />
                Informations de Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="123 Rue de la Santé, Ville"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="patient@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Section 3 : Service et Rendez-vous */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                Redirection vers un Service
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sélectionner un service <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={serviceSelectionne}
                    onChange={(e) => setServiceSelectionne(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner un service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Option de prise de rendez-vous */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <label className="flex items-center gap-2 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={priseRendezVous}
                      onChange={(e) => setPriseRendezVous(e.target.checked)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Prendre un rendez-vous maintenant
                    </span>
                  </label>

                  {priseRendezVous && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Date du rendez-vous <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={dateRendezVous}
                          onChange={(e) => setDateRendezVous(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required={priseRendezVous}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Heure <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="time"
                          value={heureRendezVous}
                          onChange={(e) => setHeureRendezVous(e.target.value)}
                          required={priseRendezVous}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Enregistrer le patient
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
