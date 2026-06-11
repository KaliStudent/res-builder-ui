'use client';

import { useState, useEffect } from 'react';

interface CompanyResearch {
  companyName: string;
  overview: string;
  industry: string;
  size: string;
  culture: string;
  products: string;
  notable: string;
  workplace: string;
  redFlags: string[];
  timestamp: string;
}

interface CompanyInfoProps {
  companyName: string;
  companyUrl?: string;
  onClose: () => void;
}

export default function CompanyInfo({ companyName, companyUrl, onClose }: CompanyInfoProps) {
  const [research, setResearch] = useState<CompanyResearch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResearch = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/company/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, companyUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to research company');
      }

      const data = await response.json();
      setResearch(data.research);
    } catch (err: any) {
      setError(err.message || 'Failed to research company');
    } finally {
      setLoading(false);
    }
  };

  // Auto-research on mount
  useEffect(() => {
    handleResearch();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{companyName}</h2>
              <p className="text-sm text-blue-100 mt-1">Company Research & Insights</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Researching {companyName}...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          ) : research ? (
            <div className="space-y-6">
              {/* Red Flags Alert (if any) */}
              {research.redFlags && research.redFlags.length > 0 && (
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800 mb-2">⚠️ Important Concerns</h3>
                      <ul className="list-disc list-inside space-y-1 text-red-700">
                        {research.redFlags.map((flag, index) => (
                          <li key={index}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Company Overview */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  Company Overview
                </h3>
                <p className="text-gray-700">{research.overview}</p>
              </div>

              {/* Industry & Size */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Industry</h3>
                  <p className="text-gray-700">{research.industry}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Size & Scale</h3>
                  <p className="text-gray-700">{research.size}</p>
                </div>
              </div>

              {/* Culture & Values */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Culture & Values
                </h3>
                <p className="text-gray-700">{research.culture}</p>
              </div>

              {/* Products & Services */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Products & Services</h3>
                <p className="text-gray-700">{research.products}</p>
              </div>

              {/* Workplace Insights */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">Workplace Insights</h3>
                <p className="text-gray-700">{research.workplace}</p>
              </div>

              {/* Notable Information */}
              {research.notable && (
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-indigo-900 mb-2">Notable Information</h3>
                  <p className="text-gray-700">{research.notable}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        {research && (
          <div className="p-4 border-t bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
            <span>Researched on {new Date(research.timestamp).toLocaleString()}</span>
            <button
              onClick={handleResearch}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Refresh Research
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
