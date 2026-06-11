interface ResumePreviewProps {
  resume: any;
  layout?: string;
  photo?: string | null;
  selectedColor?: string;
  fontFamily?: string;
  headingFont?: string;
}

export default function ResumePreview({ resume, layout, photo, selectedColor, fontFamily, headingFont }: ResumePreviewProps) {
  if (!resume || !resume.content) {
    return <div className="p-8 text-center text-gray-500">No resume data available</div>;
  }

  const { header, summary, experience, education, skills } = resume.content;
  const color = selectedColor || resume.content.color || '#2563eb';
  const actualLayout = layout || resume.content.template || 'teal-split';
  const bodyFont = fontFamily || "'Inter', sans-serif";
  const titleFont = headingFont || fontFamily || "'Inter', sans-serif";

  // 1. Split Layout (Two-column with dark sidebar)
  if (actualLayout === 'teal-split') {
    return (
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto overflow-hidden" style={{ fontFamily: bodyFont }}>
        <div className="grid grid-cols-3">
          {/* Left Sidebar */}
          <div className="col-span-1 bg-gray-800 text-white p-6">
            <div className="mb-6">
              <h1 className="text-lg font-bold mb-1 uppercase" style={{ fontFamily: titleFont }}>{header.name}</h1>
              <p className="text-sm uppercase tracking-wide" style={{ color }}>{header.title}</p>
            </div>

            {/* Contact */}
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 pb-2 border-b uppercase" style={{ borderColor: color, color }}>
                CONTACT
              </h2>
              <div className="space-y-2 text-xs">
                {header.contact.phone && <p>📞 {header.contact.phone}</p>}
                {header.contact.email && <p>✉️ {header.contact.email}</p>}
                {header.contact.website && <p>🌐 {header.contact.website}</p>}
              </div>
            </div>

            {/* Skills */}
            {skills && (
              <div>
                <h2 className="text-sm font-bold mb-3 pb-2 border-b uppercase" style={{ borderColor: color, color }}>
                  SKILLS
                </h2>
                <ul className="space-y-1 text-xs">
                  {skills.technical?.map((skill: string, i: number) => (
                    <li key={i} style={{ color }}>• {skill}</li>
                  ))}
                  {skills.soft?.map((skill: string, i: number) => (
                    <li key={i}>• {skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="col-span-2 p-6">
            <div className="mb-4 p-3 text-white uppercase font-bold text-sm" style={{ backgroundColor: color }}>
              PROFILE
            </div>
            {summary && <p className="text-xs mb-6 text-gray-700">{summary}</p>}

            {/* Experience */}
            {experience && experience.length > 0 && experience[0].title && (
              <div className="mb-6">
                <div className="mb-3 p-3 text-white uppercase font-bold text-sm" style={{ backgroundColor: color }}>
                  EXPERIENCE
                </div>
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold text-sm">{exp.title}</h3>
                    <p className="text-xs" style={{ color }}>{exp.company} | {exp.duration}</p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="text-xs mt-1 space-y-0.5 text-gray-700">
                        {exp.responsibilities.map((resp: string, i: number) => (
                          <li key={i}>• {resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && education[0].degree && (
              <div>
                <div className="mb-3 p-3 text-white uppercase font-bold text-sm" style={{ backgroundColor: color }}>
                  EDUCATION
                </div>
                {education.map((edu: any, index: number) => (
                  <div key={index} className="mb-2">
                    <h3 className="font-bold text-xs">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution} | {edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Bordered Layout with Photo (Red Classic)
  if (actualLayout === 'red-bordered') {
    return (
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-8 border-4" style={{ borderColor: color, fontFamily: bodyFont }}>
        {/* Header with Photo */}
        <div className="flex items-start gap-6 mb-6 pb-6 border-b-2" style={{ borderColor: color }}>
          {photo && (
            <img src={photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4" style={{ borderColor: color }} />
          )}
          <div className="flex-1">
            <h1 className="text-lg font-bold uppercase mb-2" style={{ color, fontFamily: titleFont }}>{header.name}</h1>
            <p className="text-sm text-gray-600 mb-3">{header.contact.email} | {header.contact.phone}</p>
            {summary && <p className="text-xs text-gray-700 italic">{summary}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            {/* Experience */}
            {experience && experience.length > 0 && experience[0].title && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase mb-3" style={{ color }}>EXPERIENCE</h2>
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-4 relative pl-4 border-l-2" style={{ borderColor: color }}>
                    <p className="text-xs font-bold uppercase" style={{ color }}>{exp.duration}</p>
                    <h3 className="font-bold text-sm">{exp.title}</h3>
                    <p className="text-xs text-gray-600 mb-1">{exp.company}</p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="text-xs space-y-0.5 text-gray-700">
                        {exp.responsibilities.map((resp: string, i: number) => (
                          <li key={i}>• {resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Education */}
            {education && education.length > 0 && education[0].degree && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase mb-3" style={{ color }}>EDUCATION</h2>
                {education.map((edu: any, index: number) => (
                  <div key={index} className="mb-3">
                    <p className="text-xs font-bold uppercase" style={{ color }}>{edu.year}</p>
                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills && (
              <div>
                <h2 className="text-sm font-bold uppercase mb-3" style={{ color }}>SKILLS</h2>
                <ul className="text-xs space-y-1">
                  {skills.technical?.map((skill: string, i: number) => (
                    <li key={i}>• {skill}</li>
                  ))}
                  {skills.soft?.map((skill: string, i: number) => (
                    <li key={i}>• {skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Green Diamond / Sidebar with Photo
  if (actualLayout === 'green-diamond') {
    return (
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto overflow-hidden" style={{ fontFamily: bodyFont }}>
        <div className="grid grid-cols-3">
          {/* Left Column */}
          <div className="col-span-1 p-6 border-r-4" style={{ borderColor: color }}>
            {photo && (
              <div className="mb-6 flex justify-center">
                <div className="w-32 h-32 rotate-45 overflow-hidden border-4" style={{ borderColor: color }}>
                  <img src={photo} alt="Profile" className="w-full h-full object-cover -rotate-45 scale-150" />
                </div>
              </div>
            )}
            <h1 className="text-lg font-bold mb-1">{header.name}</h1>
            <p className="text-sm mb-6" style={{ color }}>{header.title}</p>

            {/* Contact */}
            <div className="mb-6">
              <h2 className="font-bold mb-2 uppercase text-xs">CONTACT</h2>
              <div className="space-y-1 text-xs text-gray-700">
                {header.contact.phone && <p>{header.contact.phone}</p>}
                {header.contact.email && <p>{header.contact.email}</p>}
                {header.contact.website && <p>{header.contact.website}</p>}
              </div>
            </div>

            {/* Skills */}
            {skills && (
              <div>
                <h2 className="font-bold mb-2 uppercase text-xs">SKILLS</h2>
                <ul className="text-xs space-y-1">
                  {skills.technical?.map((skill: string, i: number) => (
                    <li key={i}>• {skill}</li>
                  ))}
                  {skills.soft?.map((skill: string, i: number) => (
                    <li key={i}>• {skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2 p-6">
            {/* Experience */}
            {experience && experience.length > 0 && experience[0].title && (
              <div className="mb-6">
                <div className="mb-3 py-2 px-4 text-white font-bold uppercase text-sm" style={{ backgroundColor: color }}>
                  WORK EXPERIENCE
                </div>
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold text-sm uppercase">{exp.title}</h3>
                    <p className="text-xs font-semibold" style={{ color }}>{exp.company}</p>
                    <p className="text-xs text-gray-500 mb-1">{exp.duration}</p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="text-xs space-y-0.5 text-gray-700">
                        {exp.responsibilities.map((resp: string, i: number) => (
                          <li key={i}>• {resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && education[0].degree && (
              <div>
                <div className="mb-3 py-2 px-4 text-white font-bold uppercase text-sm" style={{ backgroundColor: color }}>
                  EDUCATION
                </div>
                {education.map((edu: any, index: number) => (
                  <div key={index} className="mb-2">
                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                    <p className="text-xs" style={{ color }}>{edu.institution}</p>
                    <p className="text-xs text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. Gray Sidebar (Executive)
  if (actualLayout === 'gray-sidebar') {
    return (
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto overflow-hidden" style={{ fontFamily: bodyFont }}>
        <div className="grid grid-cols-3">
          {/* Left Sidebar */}
          <div className="col-span-1 p-6" style={{ backgroundColor: color }}>
            {photo && (
              <img src={photo} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4 mx-auto border-4 border-white" />
            )}

            {/* Contact */}
            <div className="mb-6">
              <h2 className="text-white font-bold mb-3 text-sm flex items-center gap-2">
                <span className="text-base">▶</span> EDUCATION
              </h2>
              {education && education.map((edu: any, index: number) => (
                <div key={index} className="mb-3 text-white text-xs">
                  <p className="font-bold">{edu.degree}</p>
                  <p className="text-xs opacity-90">{edu.institution}</p>
                  <p className="text-xs opacity-75">{edu.year}</p>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div className="mb-6">
              <h2 className="text-white font-bold mb-3 text-sm flex items-center gap-2">
                <span className="text-base">▶</span> TECHNICAL SKILLS
              </h2>
              <ul className="text-white text-xs space-y-1">
                {skills?.technical?.map((skill: string, i: number) => (
                  <li key={i}>• {skill}</li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-white font-bold mb-3 text-sm flex items-center gap-2">
                <span className="text-base">▶</span> CERTIFICATIONS
              </h2>
              <div className="text-white text-xs space-y-2">
                {skills?.other?.map((item: string, i: number) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-2 p-8">
            <div className="mb-6">
              <h1 className="text-lg font-bold mb-1">{header.name}</h1>
              <p className="text-sm text-gray-600 mb-3">{header.title}</p>
              <div className="text-xs text-gray-600 space-y-1">
                {header.contact.phone && <p>📱 {header.contact.phone}</p>}
                {header.contact.email && <p>✉️ {header.contact.email}</p>}
                {header.contact.website && <p>🌐 {header.contact.website}</p>}
              </div>
            </div>

            {/* Profile */}
            {summary && (
              <div className="mb-6">
                <h2 className="font-bold mb-2 text-sm flex items-center gap-2">
                  <span className="text-base">▶</span> PROFILE
                </h2>
                <p className="text-xs text-gray-700">{summary}</p>
              </div>
            )}

            {/* Work Experience */}
            {experience && experience.length > 0 && experience[0].title && (
              <div>
                <h2 className="font-bold mb-3 text-sm flex items-center gap-2">
                  <span className="text-base">▶</span> WORK EXPERIENCE
                </h2>
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold text-sm">{exp.title}</h3>
                    <p className="text-xs text-gray-600 mb-1">{exp.company} | {exp.duration}</p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="text-xs space-y-0.5 text-gray-700">
                        {exp.responsibilities.map((resp: string, i: number) => (
                          <li key={i}>• {resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 5. Minimal Black & White
  if (actualLayout === 'minimal-bw') {
    return (
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-12" style={{ fontFamily: bodyFont }}>
        <div className="border-b pb-6 mb-6" style={{ borderColor: color }}>
          <h1 className="text-lg font-bold mb-2 uppercase tracking-wide">{header.name}</h1>
          <p className="text-sm text-gray-600 uppercase tracking-widest mb-3">{header.title}</p>
          <div className="flex gap-6 text-xs text-gray-600">
            {header.contact.email && <span>{header.contact.email}</span>}
            {header.contact.phone && <span>{header.contact.phone}</span>}
            {header.contact.website && <span>{header.contact.website}</span>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-6">
            {/* Skills */}
            {skills && (
              <div>
                <h2 className="font-bold mb-3 text-sm uppercase tracking-wide">SKILLS</h2>
                <ul className="text-xs space-y-1 text-gray-700">
                  {skills.technical?.map((skill: string, i: number) => (
                    <li key={i}>• {skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && education[0].degree && (
              <div>
                <h2 className="font-bold mb-3 text-sm uppercase tracking-wide">EDUCATION</h2>
                {education.map((edu: any, index: number) => (
                  <div key={index} className="mb-3">
                    <p className="text-xs font-bold">{edu.degree}</p>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2">
            {/* Experience */}
            {experience && experience.length > 0 && experience[0].title && (
              <div>
                <h2 className="font-bold mb-4 text-sm uppercase tracking-wide">EXPERIENCE</h2>
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-5">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-sm uppercase">{exp.title}</h3>
                      <p className="text-xs text-gray-500 uppercase">{exp.duration}</p>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{exp.company}</p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="text-xs space-y-1 text-gray-700">
                        {exp.responsibilities.map((resp: string, i: number) => (
                          <li key={i}>• {resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 6. Yellow Circle / Modern Accent
  if (actualLayout === 'yellow-circle') {
    return (
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-8 relative overflow-hidden" style={{ fontFamily: bodyFont }}>
        {/* Yellow Circle Accent */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-30" style={{ backgroundColor: color }}></div>

        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-lg font-bold mb-2">{header.name}</h1>
            <div className="h-1 w-24 mb-3" style={{ backgroundColor: color }}></div>
            <div className="flex gap-6 text-xs">
              {header.contact.email && <span>{header.contact.email}</span>}
              {header.contact.phone && <span>{header.contact.phone}</span>}
              {header.contact.website && <span>{header.contact.website}</span>}
            </div>
          </div>

          {/* About Me */}
          {summary && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-2 uppercase">ABOUT ME</h2>
              <p className="text-xs text-gray-700">{summary}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              {/* Experience */}
              {experience && experience.length > 0 && experience[0].title && (
                <div className="mb-6">
                  <h2 className="text-sm font-bold mb-3 uppercase">EXPERIENCE</h2>
                  {experience.map((exp: any, index: number) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-bold text-sm uppercase">{exp.title}</h3>
                      <p className="text-xs mb-1" style={{ color }}>{exp.company}</p>
                      <p className="text-xs text-gray-500 mb-1">{exp.duration}</p>
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="text-xs space-y-0.5 text-gray-700">
                          {exp.responsibilities.slice(0, 2).map((resp: string, i: number) => (
                            <li key={i}>• {resp}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column */}
            <div>
              {/* Education */}
              {education && education.length > 0 && education[0].degree && (
                <div className="mb-6">
                  <h2 className="text-sm font-bold mb-3 uppercase">EDUCATION</h2>
                  {education.map((edu: any, index: number) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-bold text-sm">{edu.degree}</h3>
                      <p className="text-xs" style={{ color }}>{edu.institution}</p>
                      <p className="text-xs text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {skills && (
                <div>
                  <h2 className="text-sm font-bold mb-3 uppercase">SKILLS</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical?.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: color + '20', color }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-8">
      <p className="text-gray-500">Template preview not available</p>
    </div>
  );
}
