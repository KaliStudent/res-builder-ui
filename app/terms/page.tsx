'use client';

import Link from 'next/link';

export default function TermsOfService() {
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

        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: October 4, 2025</p>

        <div className="space-y-6 text-gray-800">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using KARW (Katy's Amazing Resume Writer), you accept and agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Service Description</h2>
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
            <h2 className="text-2xl font-semibold mb-3">3. User Data & Privacy</h2>
            <p>
              By using KARW, you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>We collect email addresses and user-provided information for service delivery and analytics</li>
              <li>Your resume data, job listings, and notes are stored locally and on our servers</li>
              <li>We may use aggregated, anonymized data for service improvement and analytics</li>
              <li>We do not sell individual user data to third parties</li>
              <li>Your data helps us improve our service and understand user needs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. AI-Generated Content</h2>
            <p>
              Our service uses AI (OpenAI) to generate and tailor resume content. You acknowledge that:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>AI-generated content is provided as suggestions and should be reviewed by you</li>
              <li>You are responsible for the accuracy and truthfulness of your final resume</li>
              <li>We are not liable for any consequences arising from AI-generated content</li>
              <li>You should verify all company research information independently</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Usage Limits & Subscriptions</h2>
            <p>
              Free users have access to basic features with API usage limits. Premium subscriptions offer:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Ad-free experience</li>
              <li>Higher API usage limits</li>
              <li>Priority support</li>
              <li>Advanced features as they become available</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</h2>
            <p className="mb-2">
              KARW™, IECK™, JDTC™, and varietybase.xyz® are registered trademarks of Jarvis Consulting.
            </p>
            <p>
              You retain ownership of your resume content. By using our service, you grant us a license to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Process and store your content to provide the service</li>
              <li>Use anonymized data for service improvement</li>
              <li>Display your content to you through our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Prohibited Uses</h2>
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
            <h2 className="text-2xl font-semibold mb-3">8. Disclaimer of Warranties</h2>
            <p>
              KARW is provided "as is" without warranties of any kind. We do not guarantee:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Job placement or interview success</li>
              <li>Accuracy of AI-generated content</li>
              <li>Uninterrupted or error-free service</li>
              <li>Compatibility with all devices or browsers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p>
              Jarvis Designs-Technical Consulting shall not be liable for any indirect, incidental, special, or consequential damages
              arising from your use of KARW, including but not limited to lost opportunities, data loss, or service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance
              of the modified terms. We will notify users of significant changes via email or in-app notification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact:<br />
              Jarvis Designs-Technical Consulting<br />
              Website: <a href="https://varietybase.xyz" className="text-blue-600 hover:text-blue-800">varietybase.xyz</a>
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
