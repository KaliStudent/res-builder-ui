'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LegalModal from './LegalModal';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-2">{t('app.title')}</h3>
            <p className="text-sm text-gray-400 mb-1">({t('app.acronym')})</p>
            <p className="text-sm text-gray-400">{t('app.subtitle')}</p>
          </div>

          {/* Developer Section */}
          <div>
            <h4 className="font-semibold mb-2">Developed By</h4>
            <p className="text-sm text-gray-400">Jarvis Designs-Technical Consulting</p>
            <p className="text-sm text-gray-400">(JDTC)</p>
            <a
              href="https://varietybase.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
            >
              varietybase.xyz ↗
            </a>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowTerms(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a href="https://varietybase.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Support</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6">
          {/* Copyright and Trademarks */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              © {currentYear} Jarvis Designs-Technical Consulting. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              KARW™, IECK™, JDTC™, and varietybase.xyz® are registered trademarks of Jarvis Consulting.
            </p>
            <p className="text-xs text-gray-500">
              Copyright © {currentYear} JDTC, KARW, IECK
            </p>
          </div>

          {/* Powered By */}
          <div className="text-center mt-4 text-xs text-gray-500">
            Powered by OpenAI • Next.js • Vercel
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      <LegalModal type="terms" isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <LegalModal type="privacy" isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </footer>
  );
}
