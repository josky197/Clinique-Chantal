import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Save,
  CheckCircle2,
  Clock,
  FileText,
  Stethoscope,
  Pill,
  Activity,
  Thermometer,
  Weight,
  Ruler,
  Heart,
  Droplet,
  TestTube,
  Radio,
  FileCheck,
  AlertCircle,
  User,
  Calendar,
} from "lucide-react";

const STATUTS = {
  PRE_EVALUATION: "En consultation (pré-évaluation)",
  MEDECIN: "En consultation (médecin)",
  ATTENTE_EXAMENS: "En attente d'examens",
  ATTENTE_RESULTATS: "En attente résultats",
  DIAGNOSTIC_POSE: "Diagnostic posé",
  PRESCRIPTION_VALIDEE: "Prescription validée",
};

function FormulaireConsultation() {
  const [etapeActuelle, setEtapeActuelle] = useState(1);
  const [statutDossier, setStatutDossier] = useState(STATUTS.PRE_EVALUATION);

  // Étape 1 : Paramètres (Infirmier)
  const [parametres, setParametres] = useState({
    poids: "",
    taille: "",
    temperature: "",
    tensionArterielle: "",
    frequenceCardiaque: "",
    saturationO2: "",
    glycemie: "",
  });

  // Étape 2 : Informations consultation (Médecin)
  const [informationsConsultation, setInformationsConsultation] = useState({
    motif: "",
    symptomes: "",
    anamnese: "",
    observationsCliniques: "",
  });

  // Étape 3 : Examens
  const [examensPrescrits, setExamensPrescrits] = useState({
    analyseSanguine: false,
    urine: false,
    radio: false,
    echographie: false,
  });

  const [examensImmediats, setExamensImmediats] = useState({
    ecg: { prescrit: false, resultat: "" },
    glycemie: { prescrit: false, resultat: "" },
    testRapide: { prescrit: false, resultat: "" },
  });

  // Étape 4 : Diagnostic
  const [diagnostic, setDiagnostic] = useState({
    principal: "",
    secondaires: [],
    codesCIM: [],
  });

  const [nouveauDiagnosticSecondaire, setNouveauDiagnosticSecondaire] = useState("");
  const [nouveauCodeCIM, setNouveauCodeCIM] = useState("");

  // Étape 5 : Prescription
  const [prescription, setPrescription] = useState({
    medicaments: [],
    recommandations: "",
    orientationSpecialiste: "",
  });

  const [nouveauMedicament, setNouveauMedicament] = useState({
    nom: "",
    posologie: "",
    duree: "",
  });

  const etapes = [
    {
      numero: 1,
      titre: "Prise de paramètres",
      role: "Infirmier",
      icon: Activity,
      description: "Enregistrement des paramètres vitaux",
    },
    {
      numero: 2,
      titre: "Informations consultation",
      role: "Médecin",
      icon: FileText,
      description: "Motif, symptômes et anamnèse",
    },
    {
      numero: 3,
      titre: "Examens",
      role: "Médecin",
      icon: TestTube,
      description: "Examens prescrits et résultats",
    },
    {
      numero: 4,
      titre: "Diagnostic",
      role: "Médecin",
      icon: Stethoscope,
      description: "Diagnostic principal et secondaires",
    },
    {
      numero: 5,
      titre: "Prescription finale",
      role: "Médecin",
      icon: Pill,
      description: "Médicaments et recommandations",
    },
  ];

  const handleParametresChange = (field, value) => {
    setParametres((prev) => ({ ...prev, [field]: value }));
  };

  const enregistrerParametres = () => {
    // Enregistrement immédiat des paramètres
    console.log("Paramètres enregistrés:", parametres);
    setStatutDossier(STATUTS.PRE_EVALUATION);
    // Ici, vous pouvez ajouter l'appel API pour sauvegarder
  };

  const handleInformationsChange = (field, value) => {
    setInformationsConsultation((prev) => ({ ...prev, [field]: value }));
  };

  const enregistrerInformations = () => {
    setStatutDossier(STATUTS.MEDECIN);
    console.log("Informations consultation enregistrées:", informationsConsultation);
  };

  const handleExamenPrescritChange = (examen) => {
    setExamensPrescrits((prev) => ({
      ...prev,
      [examen]: !prev[examen],
    }));
  };

  const handleExamenImmediatChange = (examen, field, value) => {
    setExamensImmediats((prev) => ({
      ...prev,
      [examen]: {
        ...prev[examen],
        [field]: value,
      },
    }));
  };

  const enregistrerExamens = () => {
    const aDesExamensPrescrits = Object.values(examensPrescrits).some((v) => v);
    const aDesExamensImmediats = Object.values(examensImmediats).some(
      (e) => e.prescrit
    );

    if (aDesExamensPrescrits && !aDesExamensImmediats) {
      setStatutDossier(STATUTS.ATTENTE_EXAMENS);
    } else if (aDesExamensImmediats) {
      setStatutDossier(STATUTS.ATTENTE_RESULTATS);
    }
    console.log("Examens enregistrés:", { examensPrescrits, examensImmediats });
  };

  const ajouterDiagnosticSecondaire = () => {
    if (nouveauDiagnosticSecondaire.trim()) {
      setDiagnostic((prev) => ({
        ...prev,
        secondaires: [...prev.secondaires, nouveauDiagnosticSecondaire],
      }));
      setNouveauDiagnosticSecondaire("");
    }
  };

  const supprimerDiagnosticSecondaire = (index) => {
    setDiagnostic((prev) => ({
      ...prev,
      secondaires: prev.secondaires.filter((_, i) => i !== index),
    }));
  };

  const ajouterCodeCIM = () => {
    if (nouveauCodeCIM.trim()) {
      setDiagnostic((prev) => ({
        ...prev,
        codesCIM: [...prev.codesCIM, nouveauCodeCIM],
      }));
      setNouveauCodeCIM("");
    }
  };

  const supprimerCodeCIM = (index) => {
    setDiagnostic((prev) => ({
      ...prev,
      codesCIM: prev.codesCIM.filter((_, i) => i !== index),
    }));
  };

  const enregistrerDiagnostic = () => {
    setStatutDossier(STATUTS.DIAGNOSTIC_POSE);
    console.log("Diagnostic enregistré:", diagnostic);
  };

  const ajouterMedicament = () => {
    if (
      nouveauMedicament.nom.trim() &&
      nouveauMedicament.posologie.trim() &&
      nouveauMedicament.duree.trim()
    ) {
      setPrescription((prev) => ({
        ...prev,
        medicaments: [...prev.medicaments, { ...nouveauMedicament }],
      }));
      setNouveauMedicament({ nom: "", posologie: "", duree: "" });
    }
  };

  const supprimerMedicament = (index) => {
    setPrescription((prev) => ({
      ...prev,
      medicaments: prev.medicaments.filter((_, i) => i !== index),
    }));
  };

  const finaliserPrescription = () => {
    setStatutDossier(STATUTS.PRESCRIPTION_VALIDEE);
    console.log("Prescription finalisée:", prescription);
    // Ici, vous pouvez ajouter l'appel API pour finaliser la consultation
  };

  const etapeSuivante = () => {
    if (etapeActuelle < 5) {
      setEtapeActuelle(etapeActuelle + 1);
    }
  };

  const etapePrecedente = () => {
    if (etapeActuelle > 1) {
      setEtapeActuelle(etapeActuelle - 1);
    }
  };

  const renderEtape1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-blue-800">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Statut du dossier : {statutDossier}</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-600" />
          Paramètres vitaux
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Weight className="w-4 h-4 text-gray-500" />
              Poids (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={parametres.poids}
              onChange={(e) => handleParametresChange("poids", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="70.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-gray-500" />
              Taille (cm)
            </label>
            <input
              type="number"
              value={parametres.taille}
              onChange={(e) => handleParametresChange("taille", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="175"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-gray-500" />
              Température (°C)
            </label>
            <input
              type="number"
              step="0.1"
              value={parametres.temperature}
              onChange={(e) =>
                handleParametresChange("temperature", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="37.2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-gray-500" />
              Tension artérielle (mmHg)
            </label>
            <input
              type="text"
              value={parametres.tensionArterielle}
              onChange={(e) =>
                handleParametresChange("tensionArterielle", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="120/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-500" />
              Fréquence cardiaque (bpm)
            </label>
            <input
              type="number"
              value={parametres.frequenceCardiaque}
              onChange={(e) =>
                handleParametresChange("frequenceCardiaque", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="72"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-gray-500" />
              Saturation O₂ (%)
            </label>
            <input
              type="number"
              value={parametres.saturationO2}
              onChange={(e) =>
                handleParametresChange("saturationO2", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="98"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <TestTube className="w-4 h-4 text-gray-500" />
              Glycémie (g/L) <span className="text-gray-400 text-xs">(optionnel)</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={parametres.glycemie}
              onChange={(e) => handleParametresChange("glycemie", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="1.0"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={enregistrerParametres}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Enregistrer les paramètres
          </button>
        </div>
      </div>
    </div>
  );

  const renderEtape2 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-blue-800">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Statut du dossier : {statutDossier}</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-600" />
          Informations de la consultation
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motif de la consultation *
          </label>
          <textarea
            value={informationsConsultation.motif}
            onChange={(e) =>
              handleInformationsChange("motif", e.target.value)
            }
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Ex: Douleurs abdominales, fièvre, maux de tête..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symptômes *
          </label>
          <textarea
            value={informationsConsultation.symptomes}
            onChange={(e) =>
              handleInformationsChange("symptomes", e.target.value)
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Décrivez les symptômes du patient en détail..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anamnèse (antécédents, histoire de la maladie) *
          </label>
          <textarea
            value={informationsConsultation.anamnese}
            onChange={(e) =>
              handleInformationsChange("anamnese", e.target.value)
            }
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Antécédents médicaux, chirurgicaux, familiaux, traitements en cours..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observations cliniques *
          </label>
          <textarea
            value={informationsConsultation.observationsCliniques}
            onChange={(e) =>
              handleInformationsChange("observationsCliniques", e.target.value)
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Résultats de l'examen clinique, signes observés..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={enregistrerInformations}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Enregistrer les informations
          </button>
        </div>
      </div>
    </div>
  );

  const renderEtape3 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-blue-800">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Statut du dossier : {statutDossier}</span>
        </div>
      </div>

      {/* Examens prescrits */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TestTube className="w-5 h-5 text-teal-600" />
          Examens prescrits
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Le patient effectuera ces examens puis reviendra avec les résultats.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={examensPrescrits.analyseSanguine}
              onChange={() => handleExamenPrescritChange("analyseSanguine")}
              className="w-4 h-4 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Analyse sanguine
            </span>
          </label>

          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={examensPrescrits.urine}
              onChange={() => handleExamenPrescritChange("urine")}
              className="w-4 h-4 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm font-medium text-gray-700">Urine</span>
          </label>

          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={examensPrescrits.radio}
              onChange={() => handleExamenPrescritChange("radio")}
              className="w-4 h-4 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm font-medium text-gray-700">Radio</span>
          </label>

          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={examensPrescrits.echographie}
              onChange={() => handleExamenPrescritChange("echographie")}
              className="w-4 h-4 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Échographie
            </span>
          </label>
        </div>
      </div>

      {/* Examens réalisés immédiatement */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-teal-600" />
          Examens réalisés immédiatement
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Le médecin peut entrer les résultats directement.
        </p>

        <div className="space-y-4">
          {/* ECG */}
          <div className="border border-gray-200 rounded-md p-4">
            <label className="flex items-center gap-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={examensImmediats.ecg.prescrit}
                onChange={(e) =>
                  handleExamenImmediatChange("ecg", "prescrit", e.target.checked)
                }
                className="w-4 h-4 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm font-medium text-gray-700">ECG</span>
            </label>
            {examensImmediats.ecg.prescrit && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Résultat ECG
                </label>
                <textarea
                  value={examensImmediats.ecg.resultat}
                  onChange={(e) =>
                    handleExamenImmediatChange("ecg", "resultat", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Entrez les résultats de l'ECG..."
                />
              </div>
            )}
          </div>

          {/* Glycémie */}
          <div className="border border-gray-200 rounded-md p-4">
            <label className="flex items-center gap-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={examensImmediats.glycemie.prescrit}
                onChange={(e) =>
                  handleExamenImmediatChange(
                    "glycemie",
                    "prescrit",
                    e.target.checked
                  )
                }
                className="w-4 h-4 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm font-medium text-gray-700">Glycémie</span>
            </label>
            {examensImmediats.glycemie.prescrit && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Résultat Glycémie (g/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={examensImmediats.glycemie.resultat}
                  onChange={(e) =>
                    handleExamenImmediatChange(
                      "glycemie",
                      "resultat",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="1.0"
                />
              </div>
            )}
          </div>

          {/* Test rapide */}
          <div className="border border-gray-200 rounded-md p-4">
            <label className="flex items-center gap-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={examensImmediats.testRapide.prescrit}
                onChange={(e) =>
                  handleExamenImmediatChange(
                    "testRapide",
                    "prescrit",
                    e.target.checked
                  )
                }
                className="w-4 h-4 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm font-medium text-gray-700">Test rapide</span>
            </label>
            {examensImmediats.testRapide.prescrit && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Résultat Test rapide
                </label>
                <textarea
                  value={examensImmediats.testRapide.resultat}
                  onChange={(e) =>
                    handleExamenImmediatChange(
                      "testRapide",
                      "resultat",
                      e.target.value
                    )
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Entrez les résultats du test rapide..."
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={enregistrerExamens}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Enregistrer les examens
          </button>
        </div>
      </div>
    </div>
  );

  const renderEtape4 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-blue-800">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Statut du dossier : {statutDossier}</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-teal-600" />
          Diagnostic
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diagnostic principal *
          </label>
          <textarea
            value={diagnostic.principal}
            onChange={(e) =>
              setDiagnostic((prev) => ({ ...prev, principal: e.target.value }))
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Entrez le diagnostic principal..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diagnostics secondaires
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={nouveauDiagnosticSecondaire}
              onChange={(e) => setNouveauDiagnosticSecondaire(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  ajouterDiagnosticSecondaire();
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Ajouter un diagnostic secondaire..."
            />
            <button
              onClick={ajouterDiagnosticSecondaire}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Ajouter
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {diagnostic.secondaires.map((diag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-md text-sm"
              >
                {diag}
                <button
                  onClick={() => supprimerDiagnosticSecondaire(index)}
                  className="hover:text-teal-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Codes CIM / ICD-10 (si nécessaire)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={nouveauCodeCIM}
              onChange={(e) => setNouveauCodeCIM(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  ajouterCodeCIM();
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Ex: K59.0 (Constipation)"
            />
            <button
              onClick={ajouterCodeCIM}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Ajouter
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {diagnostic.codesCIM.map((code, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
              >
                {code}
                <button
                  onClick={() => supprimerCodeCIM(index)}
                  className="hover:text-blue-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={enregistrerDiagnostic}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Enregistrer le diagnostic
          </button>
        </div>
      </div>
    </div>
  );

  const renderEtape5 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-blue-800">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Statut du dossier : {statutDossier}</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Pill className="w-5 h-5 text-teal-600" />
          Prescription finale
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Médicaments prescrits
          </label>
          <div className="border border-gray-200 rounded-md p-4 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Nom du médicament
                </label>
                <input
                  type="text"
                  value={nouveauMedicament.nom}
                  onChange={(e) =>
                    setNouveauMedicament((prev) => ({
                      ...prev,
                      nom: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  placeholder="Paracétamol 1000mg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Posologie
                </label>
                <input
                  type="text"
                  value={nouveauMedicament.posologie}
                  onChange={(e) =>
                    setNouveauMedicament((prev) => ({
                      ...prev,
                      posologie: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  placeholder="1 comprimé x 3/jour"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Durée
                </label>
                <input
                  type="text"
                  value={nouveauMedicament.duree}
                  onChange={(e) =>
                    setNouveauMedicament((prev) => ({
                      ...prev,
                      duree: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  placeholder="5 jours"
                />
              </div>
            </div>
            <button
              onClick={ajouterMedicament}
              className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-sm"
            >
              + Ajouter le médicament
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {prescription.medicaments.map((med, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{med.nom}</p>
                  <p className="text-sm text-gray-600">
                    {med.posologie} - Durée: {med.duree}
                  </p>
                </div>
                <button
                  onClick={() => supprimerMedicament(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recommandations
          </label>
          <textarea
            value={prescription.recommandations}
            onChange={(e) =>
              setPrescription((prev) => ({
                ...prev,
                recommandations: e.target.value,
              }))
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Conseils hygiéno-diététiques, repos, suivi..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Orientation vers spécialiste (si besoin)
          </label>
          <input
            type="text"
            value={prescription.orientationSpecialiste}
            onChange={(e) =>
              setPrescription((prev) => ({
                ...prev,
                orientationSpecialiste: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Ex: Consultation cardiologue, ORL..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={finaliserPrescription}
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2 font-medium"
          >
            <CheckCircle2 className="w-5 h-5" />
            Finaliser la prescription
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Formulaire de Consultation
              </h1>
              <p className="text-gray-600">
                Suivez les étapes pour compléter la consultation du patient
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString("fr-FR")}</span>
            </div>
          </div>

          {/* Indicateur d'étapes */}
          <div className="flex items-center justify-between mt-6">
            {etapes.map((etape, index) => {
              const Icon = etape.icon;
              const estActive = etape.numero === etapeActuelle;
              const estComplete = etape.numero < etapeActuelle;

              return (
                <div key={etape.numero} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => setEtapeActuelle(etape.numero)}
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                        estActive
                          ? "bg-teal-600 border-teal-600 text-white"
                          : estComplete
                          ? "bg-teal-100 border-teal-600 text-teal-600"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {estComplete ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </button>
                    <div className="mt-2 text-center">
                      <p
                        className={`text-xs font-medium ${
                          estActive ? "text-teal-600" : "text-gray-500"
                        }`}
                      >
                        {etape.titre}
                      </p>
                      <p className="text-xs text-gray-400">{etape.role}</p>
                    </div>
                  </div>
                  {index < etapes.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        estComplete ? "bg-teal-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contenu de l'étape */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {etapeActuelle === 1 && renderEtape1()}
          {etapeActuelle === 2 && renderEtape2()}
          {etapeActuelle === 3 && renderEtape3()}
          {etapeActuelle === 4 && renderEtape4()}
          {etapeActuelle === 5 && renderEtape5()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={etapePrecedente}
            disabled={etapeActuelle === 1}
            className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
              etapeActuelle === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </button>

          <button
            onClick={etapeSuivante}
            disabled={etapeActuelle === 5}
            className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
              etapeActuelle === 5
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
          >
            Suivant
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormulaireConsultation;

