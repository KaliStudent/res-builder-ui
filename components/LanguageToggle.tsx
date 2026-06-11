'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
      title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      <span className="text-2xl">{language === 'en' ? '🇪🇸' : '🇺🇸'}</span>
      <span className="font-semibold text-gray-800">
        {language === 'en' ? 'ES' : 'EN'}
      </span>
    </button>
  );
}
