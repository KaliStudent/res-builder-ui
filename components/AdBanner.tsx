'use client';

import { useEffect, useState, useRef } from 'react';

interface AdBannerProps {
  adSlot?: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  fullWidthResponsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner({
  adSlot = 'auto',
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
}: AdBannerProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Check if user is premium
    const checkPremiumStatus = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('userEmail');

        if (userId && email) {
          const response = await fetch('/api/usage/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, email }),
          });

          if (response.ok) {
            const data = await response.json();
            setIsPremium(data.isPremium);
          }
        }
      } catch (error) {
        console.error('Failed to check premium status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkPremiumStatus();
  }, []);

  useEffect(() => {
    // Only load ads if user is not premium and not already loaded
    if (!isPremium && !isLoading && !adLoaded && adRef.current) {
      try {
        // Load AdSense script if not already loaded
        if (!document.querySelector('script[src*="adsbygoogle"]')) {
          const script = document.createElement('script');
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
          script.async = true;
          script.crossOrigin = 'anonymous';
          script.dataset.adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';
          document.head.appendChild(script);

          script.onload = () => {
            pushAd();
          };
        } else {
          pushAd();
        }
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [isPremium, isLoading, adLoaded]);

  const pushAd = () => {
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch (error) {
      console.error('Error pushing ad:', error);
    }
  };

  // Don't show ads for premium users
  if (isPremium) {
    return null;
  }

  // Show loading placeholder
  if (isLoading) {
    return (
      <div className={`bg-gray-100 border border-gray-200 rounded-lg p-4 ${className}`}>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      <div ref={adRef} className="ad-banner">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ''}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive.toString()}
        ></ins>
      </div>
      <style jsx>{`
        .ad-container {
          margin: 1rem 0;
          padding: 0.5rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .ad-banner {
          min-height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
