'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DomainSuggestionProps {
  firstName?: string;
  lastName?: string;
}

interface DomainResult {
  domainName: string;
  purchasable: boolean;
  purchasePrice?: number;
  purchaseType?: string;
  renewalPrice?: number;
  premium?: boolean;
}

export default function DomainSuggestion({ firstName, lastName }: DomainSuggestionProps) {
  const { t } = useLanguage();
  const [suggestions, setSuggestions] = useState<DomainResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (firstName && lastName) {
      fetchDomainSuggestions();
    }
  }, [firstName, lastName]);

  const fetchDomainSuggestions = async () => {
    setLoading(true);
    try {
      // Generate domain name suggestions
      const fullName = `${firstName}${lastName}`.toLowerCase().replace(/\s/g, '');
      const lastNameOnly = lastName?.toLowerCase().replace(/\s/g, '') || '';

      const domainCandidates = [
        `${fullName}.com`,
        `${lastNameOnly}.com`,
        `${fullName}.net`,
        `${fullName}.co`,
        `${lastNameOnly}.co`,
      ];

      // Check availability
      const response = await fetch('/api/domains/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainNames: domainCandidates }),
      });

      if (response.ok) {
        const data = await response.json();
        const available = data.results?.filter((d: DomainResult) => d.purchasable) || [];
        setSuggestions(available.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching domain suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDomainSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const response = await fetch('/api/domains/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: searchQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results || []);
      }
    } catch (error) {
      console.error('Error searching domains:', error);
    } finally {
      setSearching(false);
    }
  };

  const handlePurchase = (domain: string) => {
    // Open Name.com purchase page with affiliate tracking
    const purchaseUrl = `https://www.name.com/domain/search/${domain}`;
    window.open(purchaseUrl, '_blank');
  };

  if (!firstName || !lastName) {
    return (
      <div className="w-full py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
        <div className="px-6 text-left">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <h3 className="text-lg font-bold text-gray-800">{t('domain.getDomain')}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            {t('domain.standOut')}
          </p>
          <p className="text-xs text-gray-500">
            {t('domain.fillName')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
        <div className="px-6 text-left">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-800">{t('domain.getEmail')}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            {t('domain.boostCredibility')}
          </p>

          {loading ? (
            <div className="flex gap-2 mb-3">
              <div className="animate-pulse bg-gray-200 h-10 w-40 rounded-lg"></div>
              <div className="animate-pulse bg-gray-200 h-10 w-40 rounded-lg"></div>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((domain) => (
                <button
                  key={domain.domainName}
                  onClick={() => setShowPopover(true)}
                  className="group px-4 py-2 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800 group-hover:text-blue-600">
                      {domain.domainName}
                    </span>
                    {domain.purchasePrice && (
                      <span className="text-xs text-green-600 font-medium">
                        ${domain.purchasePrice}/yr
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : null}

          <button
            onClick={() => setShowPopover(true)}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t('domain.searchMore')}
          </button>
        </div>
      </div>

      {/* Domain Search Slide-in Panel */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 transition-transform duration-500 ease-in-out ${
          showPopover ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 100 }}
      >
        <div className="h-full overflow-y-auto">
          {/* Header with Back Button */}
          <div className="p-6 text-white sticky top-0 z-10" style={{ background: 'linear-gradient(to right, #0278D3, #043D69)' }}>
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setShowPopover(false)}
                className="flex items-center gap-2 text-white hover:bg-white/20 rounded-lg px-3 py-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-semibold">{t('domain.resume')}</span>
              </button>
              <h2 className="text-2xl font-bold flex-1">{t('domain.findPerfect')}</h2>
            </div>

            <form onSubmit={handleDomainSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('domain.searchPlaceholder')}
                className="flex-1 px-4 py-3 rounded-lg text-white font-bold placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white bg-white/20"
              />
              <button
                type="submit"
                disabled={searching}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {searching ? t('domain.searching') : t('domain.search')}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="p-6">
            {searching ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-100 h-20 rounded-lg"></div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-3 max-w-4xl mx-auto">
                {searchResults.map((domain) => (
                  <div
                    key={domain.domainName}
                    className="flex items-center justify-between p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="font-bold text-lg text-gray-800">{domain.domainName}</div>
                      {domain.purchasePrice && (
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-semibold text-green-600">${domain.purchasePrice}</span>/year
                          {domain.renewalPrice && domain.renewalPrice !== domain.purchasePrice && (
                            <span className="text-gray-500 ml-2">(renews at ${domain.renewalPrice}/year)</span>
                          )}
                        </div>
                      )}
                      {domain.premium && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                          {t('domain.premium')}
                        </span>
                      )}
                    </div>
                    {domain.purchasable ? (
                      <button
                        onClick={() => handlePurchase(domain.domainName)}
                        className="px-6 py-3 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                        style={{ background: 'linear-gradient(to right, #0278D3, #043D69)' }}
                      >
                        {t('domain.buyNow')}
                      </button>
                    ) : (
                      <span className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg font-medium">
                        {t('domain.unavailable')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-500 text-lg">{t('domain.searchPrompt')}</p>
                <p className="text-gray-400 text-sm mt-2">{t('domain.trySearching')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
