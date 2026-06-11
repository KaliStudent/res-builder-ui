import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import ScratchPad from '@/components/ScratchPad';

export const metadata: Metadata = {
  title: 'iRW - instant Resume Writer | AI-Powered Resume Builder',
  description: 'Create professional, tailored resumes in minutes with AI-powered tools. Save job listings, research companies, and generate bilingual resumes. Developed by Jarvis Designs-Technical Consulting.',
  keywords: ['resume builder', 'AI resume', 'professional resume', 'iRW', 'instant resume', 'job application', 'career tools', 'bilingual resume'],
  authors: [{ name: 'Jarvis Designs-Technical Consulting' }],
  creator: 'Jarvis Designs-Technical Consulting',
  publisher: 'Jarvis Consulting',
  applicationName: 'iRW - instant Resume Writer',
  generator: 'Next.js',
  openGraph: {
    title: 'iRW - instant Resume Writer',
    description: 'Create professional, tailored resumes in minutes with AI-powered tools',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9090611700619794" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9090611700619794"
          crossOrigin="anonymous"
        ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;600;700;800&family=Roboto:wght@300;400;500;700;900&family=Lora:wght@400;600;700&family=Raleway:wght@300;400;600;700;800&family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          <LanguageToggle />
          {children}
          <ScratchPad />
        </LanguageProvider>
      </body>
    </html>
  );
}
