// src/components/OTP.jsx
import React, { useState, useEffect } from 'react';

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);

  // Gérer le changement dans les champs OTP
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Passer au champ suivant si un chiffre est entré
      if (value && index < 4) {
        document.getElementById(`otp-input-${index + 1}`).focus();
        setActiveInput(index + 1);
      }
    }
  };

  // Gérer les touches (backspace, flèches)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      document.getElementById(`otp-input-${index - 1}`).focus();
      setActiveInput(index - 1);
    }
  };

  // Gérer la soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 5) {
      alert(`Code OTP soumis : ${otpValue}`);
    } else {
      alert('Veuillez entrer un code OTP complet (5 chiffres).');
    }
  };

  // Réinitialiser les champs si la page est rechargée
  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
      input.addEventListener('paste', (e) => {
        const pasteData = e.clipboardData.getData('text').slice(0, 5).split('');
        const newOtp = [...otp];
        pasteData.forEach((digit, i) => {
          if (i < 5 && /^\d$/.test(digit)) {
            newOtp[i] = digit;
          }
        });
        setOtp(newOtp);
        document.getElementById(`otp-input-${Math.min(4, pasteData.length - 1)}`).focus();
        setActiveInput(Math.min(4, pasteData.length - 1));
      });
    });
  }, [otp]);

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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 001 1h3a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2">Vérification Requise</h2>
        <p className="text-gray-600 mb-4">
          Un code de sécurité a été envoyé à votre adresse e-mail.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          >
            Vérifier
          </button>
        </form>
        <p className="text-sm text-teal-500 mt-2">
          Vous n'avez pas reçu le code ?{' '}
          <a href="#" className="underline hover:text-teal-600">Renouveler le code</a>
        </p>
      </div>
    </div>
  );
}