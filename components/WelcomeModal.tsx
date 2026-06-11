'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LegalModal from './LegalModal';

interface UserData {
  email: string;
  name: string;
  phoneNumber?: string;
  industry?: string;
  hearAboutUs?: string;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  agreedToMarketing: boolean;
}

export default function WelcomeModal() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    phoneNumber: '',
    industry: '',
    hearAboutUs: '',
    agreedToTerms: false,
    agreedToPrivacy: false,
    agreedToMarketing: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Check if user has already completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete');
    if (!hasCompletedOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!userData.agreedToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service';
    }
    if (!userData.agreedToPrivacy) {
      newErrors.privacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!userData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(userData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!userData.name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      // Save user data to localStorage and send to analytics endpoint
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('onboardingComplete', 'true');
      localStorage.setItem('userConsent', JSON.stringify({
        terms: userData.agreedToTerms,
        privacy: userData.agreedToPrivacy,
        marketing: userData.agreedToMarketing,
        timestamp: new Date().toISOString(),
      }));

      // Send to analytics/user collection endpoint
      await fetch('/api/users/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          language: navigator.language,
        }),
      });

      setIsOpen(false);
    } catch (error) {
      console.error('Failed to save user data:', error);
      // Still allow them to proceed even if analytics fail
      localStorage.setItem('onboardingComplete', 'true');
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 1 ? (
          /* Step 1: Terms and Privacy */
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {t('app.title')}
              </h1>
              <p className="text-xl text-gray-600">{t('app.acronym')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('app.subtitle')}</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Welcome! 👋</h2>
                <p className="text-gray-700 mb-4">
                  Before you start creating amazing resumes, please review and accept our terms:
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className={`border-2 rounded-lg p-4 ${errors.terms ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userData.agreedToTerms}
                    onChange={(e) => setUserData({ ...userData, agreedToTerms: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-800">
                    I have read and agree to the{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTerms(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                      Terms of Service
                    </button>
                    {' '}(required)
                  </span>
                </label>
                {errors.terms && <p className="text-red-600 text-xs mt-2 ml-8">{errors.terms}</p>}
              </div>

              {/* Privacy Checkbox */}
              <div className={`border-2 rounded-lg p-4 ${errors.privacy ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userData.agreedToPrivacy}
                    onChange={(e) => setUserData({ ...userData, agreedToPrivacy: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-800">
                    I have read and agree to the{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPrivacy(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                      Privacy Policy
                    </button>
                    , including data collection practices (required)
                  </span>
                </label>
                {errors.privacy && <p className="text-red-600 text-xs mt-2 ml-8">{errors.privacy}</p>}
              </div>

              {/* Marketing Checkbox */}
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userData.agreedToMarketing}
                    onChange={(e) => setUserData({ ...userData, agreedToMarketing: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-800">
                    I agree to receive marketing emails, product updates, and tips (optional)
                  </span>
                </label>
              </div>

              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                <p className="text-xs text-yellow-900">
                  <strong>Data Collection Notice:</strong> We collect user data for analytics, service improvement,
                  and business intelligence. By proceeding, you consent to our data collection practices as described
                  in our Privacy Policy.
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                Continue →
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: User Data Collection */
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-600">Help us personalize your experience</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  value={userData.phoneNumber}
                  onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry/Field (optional)
                </label>
                <select
                  value={userData.industry}
                  onChange={(e) => setUserData({ ...userData, industry: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your industry...</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Data Science">Data Science & Analytics</option>
                  <option value="Design">Design & Creative</option>
                  <option value="Marketing">Marketing & Sales</option>
                  <option value="Business">Business & Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education & Teaching</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about us? (optional)
                </label>
                <select
                  value={userData.hearAboutUs}
                  onChange={(e) => setUserData({ ...userData, hearAboutUs: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an option...</option>
                  <option value="Search Engine">Search Engine (Google, Bing, etc.)</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Friend/Colleague">Friend or Colleague</option>
                  <option value="Online Ad">Online Advertisement</option>
                  <option value="Blog/Article">Blog or Article</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  Start Creating! →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legal Modals */}
      <LegalModal type="terms" isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <LegalModal type="privacy" isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
}
