interface CheatSheetProps {
  step: number;
}

const stepTips = [
  {
    title: 'Personal Information Tips',
    source: 'Harvard Career Services',
    tips: [
      'Use a professional email address (firstname.lastname@email.com)',
      'Include your LinkedIn profile URL if it\'s up to date',
      'Add your city and state, but full address is optional',
      'Use a phone number where employers can easily reach you',
      'Portfolio links are essential for creative/tech roles',
    ],
  },
  {
    title: 'Work Experience Best Practices',
    source: 'Stanford Career Education',
    tips: [
      'Start each bullet with a strong action verb',
      'Quantify achievements with numbers and percentages',
      'Focus on accomplishments, not just responsibilities',
      'Use the STAR method: Situation, Task, Action, Result',
      'List experiences in reverse chronological order',
      'Keep to 3-5 bullet points per position',
    ],
  },
  {
    title: 'Education & Skills Guidelines',
    source: 'MIT Career Development',
    tips: [
      'List your most recent degree first',
      'Include GPA if it\'s 3.5 or higher',
      'Mention relevant coursework for entry-level positions',
      'Highlight honors, awards, and academic achievements',
      'Choose 8-12 relevant skills for your target role',
      'Match skills from the job description',
    ],
  },
  {
    title: 'Template Selection Advice',
    source: 'Yale Career Services',
    tips: [
      'Choose colors that match your industry standards',
      'Conservative fields: stick to minimal, professional designs',
      'Creative fields: show personality with modern templates',
      'Ensure template is ATS (Applicant Tracking System) friendly',
      'Professional photos work well for international resumes',
    ],
  },
  {
    title: 'Final Review Checklist',
    source: 'Princeton Career Services',
    tips: [
      'Proofread for spelling and grammar errors',
      'Ensure consistent formatting throughout',
      'Keep resume to 1 page (or 2 for experienced professionals)',
      'Remove any irrelevant information',
      'Check that dates and contact info are current',
      'Have someone else review before submitting',
    ],
  },
];

export default function CheatSheet({ step }: CheatSheetProps) {
  const currentTips = stepTips[step] || stepTips[0];

  return (
    <div
      className="absolute top-32 right-40 w-80 transform rotate-2 hover:rotate-0 transition-transform duration-300"
      style={{
        filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))',
      }}
    >
      {/* Paper with curl effect */}
      <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-sm">
        {/* Top fold/curl */}
        <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 transform rotate-45 rounded-br-3xl shadow-lg"></div>

        {/* Main content */}
        <div className="relative p-6 border-l-4 border-t border-r border-b border-amber-200">
          {/* Punched holes at top */}
          <div className="absolute -left-2 top-8 w-4 h-4 rounded-full bg-[#4F9B70] border-2 border-gray-300"></div>
          <div className="absolute -left-2 top-20 w-4 h-4 rounded-full bg-[#4F9B70] border-2 border-gray-300"></div>
          <div className="absolute -left-2 top-32 w-4 h-4 rounded-full bg-[#4F9B70] border-2 border-gray-300"></div>

          {/* Handwritten style header */}
          <h3
            className="text-2xl font-bold mb-1 text-gray-800"
            style={{
              fontFamily: "'Caveat', cursive",
              transform: 'rotate(-1deg)',
            }}
          >
            {currentTips.title}
          </h3>

          {/* Source attribution */}
          <p
            className="text-xs text-gray-500 italic mb-4 border-b border-dashed border-gray-300 pb-3"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Source: {currentTips.source}
          </p>

          {/* Tips list */}
          <ul className="space-y-3">
            {currentTips.tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
                style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1rem' }}
              >
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                <span className="leading-snug">{tip}</span>
              </li>
            ))}
          </ul>

          {/* Coffee stain */}
          <div
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #8B4513 0%, transparent 70%)',
            }}
          ></div>

          {/* Sticky note effect line */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-100/50 to-transparent"></div>
        </div>

        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none rounded-sm"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
    </div>
  );
}
