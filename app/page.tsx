'use client';

import { useState } from 'react';
import ResumeForm from '@/components/ResumeForm';
import DeviceFrame from '@/components/DeviceFrame';
import Footer from '@/components/Footer';
import WelcomeModal from '@/components/WelcomeModal';
import AdBanner from '@/components/AdBanner';
import SubscriptionStatus from '@/components/SubscriptionStatus';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <DeviceFrame device="ipad" currentStep={currentStep}>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
        <WelcomeModal />
        <main className="py-8 relative">
          <ResumeForm onStepChange={setCurrentStep} />
        </main>
        <Footer />
      </div>
    </DeviceFrame>
  );
}
