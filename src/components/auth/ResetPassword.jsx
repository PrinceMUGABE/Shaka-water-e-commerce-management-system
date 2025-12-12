import React, { useState } from 'react';
import { Lock, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Send OTP to email
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Verify OTP
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Reset password
    alert(t('resetPassword.success'));
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t('resetPassword.title')}
          </h1>
          <p className="text-gray-600">
            {step === 1 && t('resetPassword.enterEmail')}
            {step === 2 && t('resetPassword.enterOtp')}
            {step === 3 && t('resetPassword.enterNewPassword')}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 relative">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              1
            </div>
            <div className={`ml-2 text-sm ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              {t('resetPassword.verifyEmail')}
            </div>
          </div>
          
          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div className={`h-full transition-all duration-300 ${
              step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
          </div>
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              2
            </div>
            <div className={`ml-2 text-sm ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              {t('resetPassword.enterOtp')}
            </div>
          </div>
          
          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div className={`h-full transition-all duration-300 ${
              step >= 3 ? 'bg-blue-600' : 'bg-gray-200'
            }`} style={{ width: step >= 3 ? '100%' : '0%' }}></div>
          </div>
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              3
            </div>
            <div className={`ml-2 text-sm ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              {t('resetPassword.newPassword')}
            </div>
          </div>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                {t('resetPassword.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="example@email.com"
                required
              />
            </div>
            
            <button type="submit" className="w-full btn-primary">
              {t('resetPassword.sendOtp')}
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">
                {t('resetPassword.otpCode')}
              </label>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-full h-14 text-center text-2xl font-bold border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        const newOtp = otp.split('');
                        newOtp[index] = value;
                        setOtp(newOtp.join(''));
                        // Auto focus next input
                        if (index < 5 && e.target.nextSibling) {
                          e.target.nextSibling.focus();
                        }
                      }
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {t('resetPassword.otpSentTo')} {email}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
              >
                {t('common.back')}
              </button>
              <button type="submit" className="flex-1 btn-primary">
                {t('resetPassword.verifyOtp')}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">
                {t('resetPassword.newPassword')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
                minLength="8"
              />
              <div className="mt-2 space-y-1">
                <PasswordRequirement 
                  met={password.length >= 8}
                  text={t('resetPassword.minCharacters')}
                />
                <PasswordRequirement 
                  met={/[A-Z]/.test(password)}
                  text={t('resetPassword.uppercase')}
                />
                <PasswordRequirement 
                  met={/\d/.test(password)}
                  text={t('resetPassword.number')}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                {t('resetPassword.confirmPassword')}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {t('resetPassword.passwordsDontMatch')}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
              >
                {t('common.back')}
              </button>
              <button 
                type="submit" 
                className="flex-1 btn-primary"
                disabled={!password || password !== confirmPassword || password.length < 8}
              >
                {t('resetPassword.resetPassword')}
              </button>
            </div>
          </form>
        )}

        <div className="text-center mt-8">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('resetPassword.backToLogin')}
          </Link>
        </div>
      </div>
    </div>
  );
};

const PasswordRequirement = ({ met, text }) => (
  <div className="flex items-center gap-2 text-sm">
    {met ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
    )}
    <span className={met ? 'text-green-600' : 'text-gray-500'}>{text}</span>
  </div>
);

export default ResetPassword;