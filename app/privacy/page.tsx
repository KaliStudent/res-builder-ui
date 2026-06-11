'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to App
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: October 4, 2025</p>

        <div className="space-y-6 text-gray-800">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
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
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold mt-4 mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Email Address:</strong> Required for account creation and communication</li>
              <li><strong>Name:</strong> Used in resume generation and personalization</li>
              <li><strong>Contact Information:</strong> Phone number, portfolio links, personal website</li>
              <li><strong>Professional Information:</strong> Work experience, education, skills</li>
              <li><strong>Resume Content:</strong> All text and data you input into the platform</li>
              <li><strong>Job Listings:</strong> URLs and content of jobs you save or apply to</li>
              <li><strong>Notes:</strong> Content from the scratch pad feature</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Automatically Collected Information</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
              <li><strong>Device Information:</strong> Browser type, OS, device type, screen resolution</li>
              <li><strong>IP Address:</strong> For security and analytics purposes</li>
              <li><strong>Cookies & Local Storage:</strong> For session management and preferences</li>
              <li><strong>API Usage:</strong> Number and type of AI requests made</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">2.3 Third-Party Data</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>OpenAI:</strong> Resume content is processed through OpenAI's API</li>
              <li><strong>Job Site Data:</strong> Metadata from URLs you provide</li>
              <li><strong>Company Information:</strong> Publicly available company data for research features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
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
            <h2 className="text-2xl font-semibold mb-3">4. Data Sharing & Disclosure</h2>

            <h3 className="text-xl font-semibold mt-4 mb-2">We Share Data With:</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>OpenAI:</strong> Resume content for AI processing (subject to OpenAI's privacy policy)</li>
              <li><strong>Analytics Providers:</strong> Anonymized usage data for analysis</li>
              <li><strong>Advertising Partners:</strong> User behavior data for targeted ads (free tier)</li>
              <li><strong>Payment Processors:</strong> Stripe for subscription management</li>
              <li><strong>Cloud Services:</strong> Vercel for hosting, storage providers</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">We DO NOT:</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Sell individual user data to third parties</li>
              <li>Share personally identifiable resume content publicly</li>
              <li>Use your data for purposes other than those described herein without consent</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">We MAY Share Data:</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>If required by law or legal process</li>
              <li>In connection with business mergers, acquisitions, or asset sales</li>
              <li>To protect our rights, safety, or property</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Data Storage & Security</h2>
            <p>
              We implement reasonable security measures to protect your data:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Encryption in transit (HTTPS/TLS)</li>
              <li>Secure cloud storage with access controls</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to user data</li>
            </ul>
            <p className="mt-3">
              <strong>However:</strong> No system is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
            <p>We retain your data:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Account Data:</strong> Until account deletion + 90 days for backup</li>
              <li><strong>Resume Data:</strong> While account is active + 30 days after deletion</li>
              <li><strong>Analytics Data:</strong> Aggregated data retained indefinitely</li>
              <li><strong>Legal Requirements:</strong> As required by applicable laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
            <p>Depending on your location, you may have rights to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Correction:</strong> Update inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Data Portability:</strong> Export your data in a standard format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Object:</strong> Object to certain data processing activities</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us via <a href="https://varietybase.xyz" className="text-blue-600 hover:text-blue-800">varietybase.xyz</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Cookies & Tracking</h2>
            <p>We use:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Essential Cookies:</strong> For authentication and basic functionality</li>
              <li><strong>Analytics Cookies:</strong> To understand usage patterns</li>
              <li><strong>Advertising Cookies:</strong> For targeted ads (free tier)</li>
              <li><strong>Local Storage:</strong> To save preferences and draft data</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings, but this may limit functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Children's Privacy</h2>
            <p>
              KARW is not intended for users under 16 years of age. We do not knowingly collect data from children.
              If we discover we have collected data from a child, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. International Data Transfers</h2>
            <p>
              Your data may be processed in countries outside your residence, including the United States.
              By using KARW, you consent to such transfers, which may have different data protection standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Changes to Privacy Policy</h2>
            <p>
              We may update this policy periodically. We will notify you of significant changes via email or in-app notification.
              Continued use after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Contact Us</h2>
            <p>
              For privacy-related questions or concerns:<br />
              Jarvis Designs-Technical Consulting<br />
              Website: <a href="https://varietybase.xyz" className="text-blue-600 hover:text-blue-800">varietybase.xyz</a>
            </p>
          </section>

          <section className="pt-6 border-t bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Important Notice About Data Collection</h3>
            <p className="text-sm">
              <strong>Data is money.</strong> We collect comprehensive user data to improve services, understand market trends,
              and generate business insights. Your data contributes to our analytics, machine learning models, and business intelligence.
              By using KARW, you acknowledge that your information (including email, usage patterns, and behavioral data) will be collected,
              analyzed, and may be used in aggregated form for various business purposes. While we don't sell individual profiles,
              we do use data to generate revenue through targeted advertising and service improvements.
            </p>
          </section>

          <section className="pt-6 border-t">
            <p className="text-sm text-gray-600">
              © 2025 Jarvis Designs-Technical Consulting. All rights reserved.<br />
              KARW™, IECK™, JDTC™, and varietybase.xyz® are registered trademarks of Jarvis Consulting.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
