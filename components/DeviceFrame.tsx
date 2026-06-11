'use client';

import CheatSheet from './CheatSheet';
import { useState, useEffect } from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
  device?: 'ipad' | 'desktop' | 'none';
  currentStep?: number;
  totalSteps?: number;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
}

export default function DeviceFrame({ children, device = 'none', currentStep = 0 }: DeviceFrameProps) {
  if (device === 'none') {
    return <>{children}</>;
  }

  if (device === 'ipad') {
    return (
      <>
        {/* Desktop/Tablet View - iPad Frame */}
        <div
          className="hidden md:flex min-h-screen p-8 items-center justify-center relative overflow-hidden"
          style={{
            background: `radial-gradient(circle at center, #4F9B70 0%, #195D37 60%, #195D42 100%)`
          }}
        >
        {/* Felt Texture Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Cheat Sheet - Tips for current step */}
        <CheatSheet step={currentStep} />

        {/* iPad Frame with Drop Shadow */}
        <div className="relative" style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))' }}>
          {/* iPad Body */}
          <div
            className="bg-gray-900 rounded-[2.5rem] p-6"
            style={{ width: '820px', height: '1180px' }}
          >
            {/* Screen Bezel */}
            <div className="bg-black rounded-[2rem] p-3 h-full">
              {/* Camera */}
              <div className="flex justify-center mb-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              </div>

              {/* Screen Content */}
              <div className="bg-white rounded-[1.5rem] h-full overflow-hidden shadow-inner">
                <div className="h-full overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
          </div>

          {/* Power Button */}
          <div className="absolute top-24 -right-1 w-1 h-16 bg-gray-800 rounded-l"></div>

          {/* Volume Buttons */}
          <div className="absolute top-48 -right-1 w-1 h-12 bg-gray-800 rounded-l"></div>
          <div className="absolute top-64 -right-1 w-1 h-12 bg-gray-800 rounded-l"></div>
        </div>
      </div>

      {/* Mobile View - Direct Content */}
      <div className="md:hidden min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 pb-20">
        {children}

        {/* iOS Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 safe-area-inset-bottom">
          <div className="flex justify-around items-center py-2 px-4">
            <CheatSheet step={currentStep} />
          </div>
          {/* iOS Home Indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
    );
  }

  return <>{children}</>;
}
