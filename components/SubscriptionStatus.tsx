'use client';

import { useState, useEffect } from 'react';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';

interface UsageData {
  isPremium: boolean;
  usage: {
    resumeGeneration: number;
    aiTailoring: number;
    companyResearch: number;
    translation: number;
  };
}

export default function SubscriptionStatus() {
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      const userId = localStorage.getItem('userId') || crypto.randomUUID();
      const email = localStorage.getItem('userEmail') || '';

      if (!localStorage.getItem('userId')) {
        localStorage.setItem('userId', userId);
      }

      const response = await fetch('/api/usage/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsageData(data);
      }
    } catch (error) {
      console.error('Failed to fetch usage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      setUpgrading(true);
      const userId = localStorage.getItem('userId') || '';
      const email = localStorage.getItem('userEmail') || '';

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          email,
          priceId: SUBSCRIPTION_TIERS.premium.priceId,
        }),
      });

      const data = await response.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Failed to start checkout:', error);
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!usageData) return null;

  const tier = usageData.isPremium ? SUBSCRIPTION_TIERS.premium : SUBSCRIPTION_TIERS.free;
  const limits = tier.limits;

  const getUsagePercentage = (current: number, limit: number) => {
    if (limit === 999) return 0; // Premium unlimited
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {tier.name} Plan
            {usageData.isPremium && (
              <span className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full">
                Premium
              </span>
            )}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {usageData.isPremium ? 'Unlimited access to all features' : 'Limited monthly usage'}
          </p>
        </div>
        {!usageData.isPremium && (
          <button
            onClick={handleUpgrade}
            disabled={upgrading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md disabled:opacity-50"
          >
            {upgrading ? 'Processing...' : 'Upgrade to Premium'}
          </button>
        )}
      </div>

      {/* Usage Meters */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Resume Generation</span>
            <span className="text-gray-600">
              {usageData.usage.resumeGeneration} / {limits.resumeGeneration === 999 ? '∞' : limits.resumeGeneration}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${getUsageColor(
                getUsagePercentage(usageData.usage.resumeGeneration, limits.resumeGeneration)
              )}`}
              style={{
                width: `${getUsagePercentage(usageData.usage.resumeGeneration, limits.resumeGeneration)}%`,
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">AI Tailoring</span>
            <span className="text-gray-600">
              {usageData.usage.aiTailoring} / {limits.aiTailoring === 999 ? '∞' : limits.aiTailoring}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${getUsageColor(
                getUsagePercentage(usageData.usage.aiTailoring, limits.aiTailoring)
              )}`}
              style={{
                width: `${getUsagePercentage(usageData.usage.aiTailoring, limits.aiTailoring)}%`,
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Company Research</span>
            <span className="text-gray-600">
              {usageData.usage.companyResearch} / {limits.companyResearch === 999 ? '∞' : limits.companyResearch}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${getUsageColor(
                getUsagePercentage(usageData.usage.companyResearch, limits.companyResearch)
              )}`}
              style={{
                width: `${getUsagePercentage(usageData.usage.companyResearch, limits.companyResearch)}%`,
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Translation</span>
            <span className="text-gray-600">
              {usageData.usage.translation} / {limits.translation === 999 ? '∞' : limits.translation}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${getUsageColor(
                getUsagePercentage(usageData.usage.translation, limits.translation)
              )}`}
              style={{
                width: `${getUsagePercentage(usageData.usage.translation, limits.translation)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Premium Benefits */}
      {!usageData.isPremium && (
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Upgrade to Premium for:</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {SUBSCRIPTION_TIERS.premium.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-purple-600">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <p className="text-sm font-semibold text-purple-700 mt-3">
            Only ${SUBSCRIPTION_TIERS.premium.price}/month
          </p>
        </div>
      )}
    </div>
  );
}
