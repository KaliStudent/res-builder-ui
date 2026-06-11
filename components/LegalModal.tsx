'use client';

import { useState, useEffect } from 'react';

interface LegalModalProps {
  type: 'terms' | 'privacy';
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ type, isOpen, onClose }: LegalModalProps) {
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (isOpen) {
      if (type === 'terms') {
        setContent(<TermsContent />);
      } else {
        setContent(<PrivacyContent />);
      }
    }
  }, [type, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Liquid Glass Modal */}
      <div
        className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden animate-slideDown"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          borderRadius: '24px',
        }}
      >
        {/* Header with gradient */}
        <div
          className="sticky top-0 z-10 px-8 py-6 border-b"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/50 transition-all duration-200 group"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">Last Updated: October 4, 2025</p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-8 py-6" style={{ maxHeight: 'calc(85vh - 100px)' }}>
          {content}
        </div>

        {/* Footer gradient */}
        <div
          className="sticky bottom-0 px-8 py-4 border-t"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="space-y-6 text-gray-800">
      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">1. Acceptance of Terms</h3>
        <p>
          By accessing and using KARW (Katy's Amazing Resume Writer), you accept and agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use our service.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">2. Service Description</h3>
        <p>
          KARW is an AI-powered resume building platform developed by Jarvis Designs-Technical Consulting (JDTC).
          We provide tools to create, customize, and manage professional resumes with features including:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>AI-powered resume generation and tailoring</li>
          <li>Job listing management and company research</li>
          <li>Bilingual resume creation (English/Spanish)</li>
          <li>Professional templates and customization</li>
          <li>PDF export functionality</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">3. User Data & Privacy</h3>
        <p>By using KARW, you acknowledge and agree that:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>We collect email addresses and user-provided information for service delivery and analytics</li>
          <li>Your resume data, job listings, and notes are stored locally and on our servers</li>
          <li>We may use aggregated, anonymized data for service improvement and analytics</li>
          <li>We do not sell individual user data to third parties</li>
          <li>Your data helps us improve our service and understand user needs</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">4. AI-Generated Content</h3>
        <p>Our service uses AI (OpenAI) to generate and tailor resume content. You acknowledge that:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>AI-generated content is provided as suggestions and should be reviewed by you</li>
          <li>You are responsible for the accuracy and truthfulness of your final resume</li>
          <li>We are not liable for any consequences arising from AI-generated content</li>
          <li>You should verify all company research information independently</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">5. Usage Limits & Subscriptions</h3>
        <p>Free users have access to basic features with API usage limits. Premium subscriptions offer:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Ad-free experience</li>
          <li>Higher API usage limits</li>
          <li>Priority support</li>
          <li>Advanced features as they become available</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">6. Intellectual Property</h3>
        <p className="mb-2">
          KARW™, IECK™, JDTC™, and varietybase.xyz® are registered trademarks of Jarvis Consulting.
        </p>
        <p>You retain ownership of your resume content. By using our service, you grant us a license to:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Process and store your content to provide the service</li>
          <li>Use anonymized data for service improvement</li>
          <li>Display your content to you through our platform</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">7. Prohibited Uses</h3>
        <p>You agree not to:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Use the service for any illegal purpose</li>
          <li>Attempt to reverse engineer or copy our technology</li>
          <li>Create false or misleading resumes</li>
          <li>Abuse or overload our systems</li>
          <li>Share your account credentials</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">8. Disclaimer of Warranties</h3>
        <p>KARW is provided "as is" without warranties of any kind. We do not guarantee:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Job placement or interview success</li>
          <li>Accuracy of AI-generated content</li>
          <li>Uninterrupted or error-free service</li>
          <li>Compatibility with all devices or browsers</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">9. Limitation of Liability</h3>
        <p>
          Jarvis Designs-Technical Consulting shall not be liable for any indirect, incidental, special, or consequential damages
          arising from your use of KARW, including but not limited to lost opportunities, data loss, or service interruptions.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">10. Modifications to Terms</h3>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance
          of the modified terms. We will notify users of significant changes via email or in-app notification.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-indigo-900">11. Contact Information</h3>
        <p>
          For questions about these Terms of Service, please contact:<br />
          Jarvis Designs-Technical Consulting<br />
          Website: <a href="https://varietybase.xyz" className="text-indigo-600 hover:text-indigo-800 underline">varietybase.xyz</a>
        </p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          © 2025 Jarvis Designs-Technical Consulting. All rights reserved.<br />
          KARW™, IECK™, JDTC™, and varietybase.xyz® are registered trademarks of Jarvis Consulting.
        </p>
      </section>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-6 text-gray-800">
      <section>
        <h3 className="text-2xl font-semibold mb-3 text-purple-900">1. Introduction</h3>
        <p>
          Jarvis Designs-Technical Consulting ("we," "our," or "JDTC") operates KARW (Katy's Amazing Resume Writer).
          This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our service.
        </p>
        <p className="mt-2 font-semibold">
          Data is valuable. We collect data to improve our services, understand our users, and provide analytics.
          By using KARW, you acknowledge and consent to our data collection and usage practices as described herein.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-purple-900">2. Information We Collect</h3>

        <h4 className="text-xl font-semibold mt-4 mb-2">2.1 Information You Provide</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><strong>Email Address:</strong> Required for account creation and communication</li>
          <li><strong>Name:</strong> Used in resume generation and personalization</li>
          <li><strong>Contact Information:</strong> Phone number, portfolio links, personal website</li>
          <li><strong>Professional Information:</strong> Work experience, education, skills</li>
          <li><strong>Resume Content:</strong> All text and data you input into the platform</li>
          <li><strong>Job Listings:</strong> URLs and content of jobs you save or apply to</li>
          <li><strong>Notes:</strong> Content from the scratch pad feature</li>
        </ul>

        <h4 className="text-xl font-semibold mt-4 mb-2">2.2 Automatically Collected Information</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
          <li><strong>Device Information:</strong> Browser type, OS, device type, screen resolution</li>
          <li><strong>IP Address:</strong> For security and analytics purposes</li>
          <li><strong>Cookies & Local Storage:</strong> For session management and preferences</li>
          <li><strong>API Usage:</strong> Number and type of AI requests made</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-purple-900">3. How We Use Your Information</h3>
        <p>We use collected data for:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li><strong>Service Delivery:</strong> Generate resumes, tailor content, provide features</li>
          <li><strong>Analytics & Insights:</strong> Understand usage patterns, popular features, user behavior</li>
          <li><strong>Service Improvement:</strong> Enhance AI models, improve UX, develop new features</li>
          <li><strong>Marketing & Communication:</strong> Send updates, tips, promotional offers</li>
          <li><strong>Business Intelligence:</strong> Aggregated data analysis for business decisions</li>
          <li><strong>Compliance & Legal:</strong> Meet legal obligations, enforce terms</li>
          <li><strong>Revenue Generation:</strong> Target advertising (free tier), subscription management</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-purple-900">4. Data Sharing & Disclosure</h3>

        <h4 className="text-xl font-semibold mt-4 mb-2">We Share Data With:</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><strong>OpenAI:</strong> Resume content for AI processing (subject to OpenAI's privacy policy)</li>
          <li><strong>Analytics Providers:</strong> Anonymized usage data for analysis</li>
          <li><strong>Advertising Partners:</strong> User behavior data for targeted ads (free tier)</li>
          <li><strong>Payment Processors:</strong> Stripe for subscription management</li>
          <li><strong>Cloud Services:</strong> Vercel for hosting, storage providers</li>
        </ul>

        <h4 className="text-xl font-semibold mt-4 mb-2">We DO NOT:</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Sell individual user data to third parties</li>
          <li>Share personally identifiable resume content publicly</li>
          <li>Use your data for purposes other than those described herein without consent</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 text-purple-900">5. Your Rights</h3>
        <p>Depending on your location, you may have rights to:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li><strong>Access:</strong> Request a copy of your data</li>
          <li><strong>Correction:</strong> Update inaccurate information</li>
          <li><strong>Deletion:</strong> Request deletion of your account and data</li>
          <li><strong>Data Portability:</strong> Export your data in a standard format</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
          <li><strong>Object:</strong> Object to certain data processing activities</li>
        </ul>
      </section>

      <section className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
        <h4 className="text-lg font-semibold mb-2">Important Notice About Data Collection</h4>
        <p className="text-sm">
          <strong>Data is money.</strong> We collect comprehensive user data to improve services, understand market trends,
          and generate business insights. Your data contributes to our analytics, machine learning models, and business intelligence.
          By using KARW, you acknowledge that your information (including email, usage patterns, and behavioral data) will be collected,
          analyzed, and may be used in aggregated form for various business purposes.
        </p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          © 2025 Jarvis Designs-Technical Consulting. All rights reserved.<br />
          KARW™, IECK™, JDTC™, and varietybase.xyz® are registered trademarks of Jarvis Consulting.
        </p>
      </section>
    </div>
  );
}
