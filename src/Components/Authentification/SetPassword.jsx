// src/components/PasswordChange.jsx
import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react';

export default function PasswordChange() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Gérer les changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Basculer la visibilité du mot de passe
  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  // Gérer la soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    if (formData.newPassword.length < 8) {
      alert("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    alert(`Mot de passe modifié avec succès : ${formData.newPassword}`);
    // Ici, vous pouvez ajouter une logique pour envoyer les données à un serveur
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <span className="text-teal-500 bg-teal-100 p-2 rounded-full">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm2 5h-4V6a2 2 0 114 0v1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2">Modifier votre mot de passe</h2>
        <p className="text-gray-600 mb-4">
          Pour votre sécurité, choisissez un mot de passe fort.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ancien mot de passe</label>
            <div className="relative">
              <input
                type={showPassword.oldPassword ? 'text' : 'password'}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('oldPassword')}
                className="absolute right-2 top-3 text-teal-500 hover:text-teal-700"
              >
                {showPassword.oldPassword ? (<EyeClosed size={18}/>) : (<Eye size={18}/>)}
              </button>
            </div>
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showPassword.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
                className="absolute right-2 top-3 text-teal-500 hover:text-teal-700"
              >
                {showPassword.newPassword ? (<EyeClosed size={18}/>) : (<Eye size={18}/>)}
              </button>
            </div>
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute right-2 top-3 text-teal-500 hover:text-teal-700"
              >
                {!showPassword.confirmPassword ? (<Eye size={18}/>) : (<EyeClosed size={18}/>)}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          >
            Modifier le Mot de Passe
          </button>
        </form>
      </div>
    </div>
  );
}