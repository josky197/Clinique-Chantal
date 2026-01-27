'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, Heart, Activity, Thermometer, Weight, Ruler, AlertCircle } from 'lucide-react';

export default function ConsultationForm() {
  const [patient, setPatient] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: 'M',
    adresse: '',
    telephone: '',
    email: '',
    securiteSociale: ''
  });

  const [consultation, setConsultation] = useState({
    date: new Date().toISOString().split('T')[0],
    heure: new Date().toTimeString().slice(0, 5),
    motif: '',
    antecedentsMedicaux: '',
    antecedentsChirurgicaux: '',
    antecedentsFamiliaux: '',
    traitements: '',
    poids: '',
    taille: '',
    imc: '',
    ta: '',
    fc: '',
    temperature: '',
    observations: '',
    diagnostic: '',
    examens: '',
    traitement: '',
    conseils: '',
    prochainRdv: '',
    suivi: ''
  });

  const calculateIMC = () => {
    const poids = parseFloat(consultation.poids);
    const taille = parseFloat(consultation.taille) / 100;
    if (poids > 0 && taille > 0) {
      const imc = (poids / (taille * taille)).toFixed(1);
      setConsultation(prev => ({ ...prev, imc }));
    }
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-lg print:shadow-none print:max-w-full">
        <div className="border-b-2 border-blue-600 pb-4 mb-6 print:border-b print:border-gray-400">
          <h1 className="text-3xl font-bold text-center text-blue-700">FICHE DE CONSULTATION</h1>
        </div>

        {/* === 1. IDENTITÉ DU PATIENT === */}
        <section className="mb-8 print:mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            1. Identité du patient
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                value={patient.nom}
                onChange={e => setPatient({ ...patient, nom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent print:border-0 print:p-0 print:bg-transparent"
                placeholder="DUPONT"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                type="text"
                value={patient.prenom}
                onChange={e => setPatient({ ...patient, prenom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="Marie"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input
                type="date"
                value={patient.dateNaissance}
                onChange={e => setPatient({ ...patient, dateNaissance: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
              <div className="flex gap-4 print:gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sexe"
                    value="M"
                    checked={patient.sexe === 'M'}
                    onChange={e => setPatient({ ...patient, sexe: 'M' })}
                    className="mr-2 print:hidden"
                  />
                  <span className="print:inline">M</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sexe"
                    value="F"
                    checked={patient.sexe === 'F'}
                    onChange={e => setPatient({ ...patient, sexe: 'F' })}
                    className="mr-2 print:hidden"
                  />
                  <span className="print:inline">F</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sexe"
                    value="Autre"
                    checked={patient.sexe === 'Autre'}
                    onChange={e => setPatient({ ...patient, sexe: 'Autre' })}
                    className="mr-2 print:hidden"
                  />
                  <span className="print:inline">Autre</span>
                </label>
              </div>
              {patient.sexe === 'Autre' && (
                <input
                  type="text"
                  value={patient.autreSexe || ''}
                  onChange={e => setPatient({ ...patient, autreSexe: e.target.value })}
                  placeholder="Préciser"
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md print:border-0 print:p-0"
                />
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                value={patient.adresse}
                onChange={e => setPatient({ ...patient, adresse: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="12 rue des Lilas, 75001 Paris"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Phone className="w-4 h-4" /> Téléphone
              </label>
              <input
                type="tel"
                value={patient.telephone}
                onChange={e => setPatient({ ...patient, telephone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="06 12 34 56 78"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4" /> Email
              </label>
              <input
                type="email"
                value={patient.email}
                onChange={e => setPatient({ ...patient, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="marie.dupont@email.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">N° Sécurité sociale / Mutuelle</label>
              <input
                type="text"
                value={patient.securiteSociale}
                onChange={e => setPatient({ ...patient, securiteSociale: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="1 23 45 67 890 123"
              />
            </div>
          </div>
        </section>

        {/* === 2. DATE ET MOTIF === */}
        <section className="mb-8 print:mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Date
              </label>
              <input
                type="date"
                value={consultation.date}
                onChange={e => setConsultation({ ...consultation, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Clock className="w-4 h-4" /> Heure
              </label>
              <input
                type="time"
                value={consultation.heure}
                onChange={e => setConsultation({ ...consultation, heure: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
              />
            </div>
            <div className="md:col-span-1"></div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <AlertCircle className="w-4 h-4 inline mr-1" />
              Motif de consultation
            </label>
            <textarea
              value={consultation.motif}
              onChange={e => setConsultation({ ...consultation, motif: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:border-dashed print:p-2"
              placeholder="Douleurs abdominales depuis 3 jours, fièvre..."
            />
          </div>
        </section>

        {/* === 3. ANTÉCÉDENTS === */}
        <section className="mb-8 print:mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Antécédents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Médicaux</label>
              <textarea
                value={consultation.antecedentsMedicaux}
                onChange={e => setConsultation({ ...consultation, antecedentsMedicaux: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:p-1"
                placeholder="HTA, Diabète de type 2..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chirurgicaux</label>
              <textarea
                value={consultation.antecedentsChirurgicaux}
                onChange={e => setConsultation({ ...consultation, antecedentsChirurgicaux: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:p-1"
                placeholder="Appendicectomie 2018..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Familiaux</label>
              <textarea
                value={consultation.antecedentsFamiliaux}
                onChange={e => setConsultation({ ...consultation, antecedentsFamiliaux: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:p-1"
                placeholder="Mère : cancer du sein..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Traitements en cours</label>
              <textarea
                value={consultation.traitements}
                onChange={e => setConsultation({ ...consultation, traitements: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:p-1"
                placeholder="Amlor 5mg 1/j, Metformine 1000mg 2/j..."
              />
            </div>
          </div>
        </section>

        {/* === 4. EXAMEN CLINIQUE === */}
        <section className="mb-8 print:mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            4. Examen clinique
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4 print:gap-2">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Weight className="w-4 h-4" /> Poids (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={consultation.poids}
                onChange={e => {
                  setConsultation({ ...consultation, poids: e.target.value });
                  calculateIMC();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="70"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Ruler className="w-4 h-4" /> Taille (cm)
              </label>
              <input
                type="number"
                value={consultation.taille}
                onChange={e => {
                  setConsultation({ ...consultation, taille: e.target.value });
                  calculateIMC();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="170"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IMC</label>
              <input
                type="text"
                value={consultation.imc}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md print:bg-transparent print:border-0 print:p-0"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Heart className="w-4 h-4" /> TA (mmHg)
              </label>
              <input
                type="text"
                value={consultation.ta}
                onChange={e => setConsultation({ ...consultation, ta: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">FC (bpm)</label>
              <input
                type="text"
                value={consultation.fc}
                onChange={e => setConsultation({ ...consultation, fc: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="78"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Thermometer className="w-4 h-4" /> Temp. (°C)
              </label>
              <input
                type="text"
                value={consultation.temperature}
                onChange={e => setConsultation({ ...consultation, temperature: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="37.2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Observations</label>
            <textarea
              value={consultation.observations}
              onChange={e => setConsultation({ ...consultation, observations: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:p-1"
              placeholder="Abdomen souple, douloureux en FID..."
            />
          </div>
        </section>

        {/* === 5. DIAGNOSTIC === */}
        <section className="mb-8 print:mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Diagnostic / Hypothèse</h2>
          <textarea
            value={consultation.diagnostic}
            onChange={e => setConsultation({ ...consultation, diagnostic: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:p-1"
            placeholder="Gastro-entérite aiguë probable..."
          />
        </section>

        {/* === 6. EXAMENS COMPLÉMENTAIRES === */}
        <section className="mb-8 print:mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Examens complémentaires demandés</h2>
          <textarea
            value={consultation.examens}
            onChange={e => setConsultation({ ...consultation, examens: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:p-1"
            placeholder="NFS, CRP, ECBU..."
          />
        </section>

        {/* === 7. TRAITEMENT === */}
        <section className="mb-8 print:mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Traitement / Conduite à tenir</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Médicaments prescrits</label>
              <textarea
                value={consultation.traitement}
                onChange={e => setConsultation({ ...consultation, traitement: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:p-1"
                placeholder="Paracétamol 1g x3/j si douleur..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conseils hygiéno-diététiques</label>
              <textarea
                value={consultation.conseils}
                onChange={e => setConsultation({ ...consultation, conseils: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:p-1"
                placeholder="Hydratation abondante, repos..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prochain RDV</label>
              <input
                type="text"
                value={consultation.prochainRdv}
                onChange={e => setConsultation({ ...consultation, prochainRdv: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                placeholder="Dans 1 semaine si pas d'amélioration"
              />
            </div>
          </div>
        </section>

        {/* === 8. SUIVI === */}
        <section className="mb-8 print:mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Observations / Suivi</h2>
          <textarea
            value={consultation.suivi}
            onChange={e => setConsultation({ ...consultation, suivi: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 print:border print:p-1"
            placeholder="À revoir en cas de fièvre persistante..."
          />
        </section>

        {/* === SIGNATURE === */}
        <div className="mt-12 print:mt-8 border-t-2 border-gray-300 pt-4 print:border-t print:border-gray-400">
          <div className="flex justify-between items-center print:flex print:justify-between">
            <div>
              <p className="text-sm text-gray-600">Signature du praticien :</p>
              <div className="mt-8 w-48 border-t border-gray-600 print:border-t-2 print:mt-6"></div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Cachet</p>
              <div className="mt-2 w-32 h-20 border-2 border-dashed border-gray-400 print:border print:border-gray-600"></div>
            </div>
          </div>
        </div>

        {/* Bouton d'impression */}
        <div className="mt-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            🖨️ Imprimer la fiche
          </button>
        </div>
      </div>
    </div>
  );
}