'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import StepIndicator from './StepIndicator';
import FormInput from './FormInput';
import ResumePreview from './ResumePreview';
import TemplateCard from './TemplateCard';
import DomainSuggestion from './DomainSuggestion';
import JobListingsManager from './JobListingsManager';
import JobPreviewModal from './JobPreviewModal';
import { resumeApi, ResumeData } from '@/lib/api';
import { templates, colorOptions } from '@/lib/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import { JobListing } from '@/lib/types/jobs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const skillCategories: { [key: string]: string[] } = {
  'Software Development': ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'TypeScript', 'SQL', 'MongoDB', 'Git', 'Docker', 'AWS', 'Azure', 'REST APIs', 'GraphQL', 'Agile', 'CI/CD', 'Testing', 'Debugging'],
  'Data Science & Analytics': ['Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Data Visualization', 'Tableau', 'Power BI', 'Statistics', 'A/B Testing', 'Big Data', 'Hadoop', 'Spark'],
  'Design & Creative': ['Adobe Photoshop', 'Illustrator', 'Figma', 'Sketch', 'InDesign', 'After Effects', 'UI/UX Design', 'Typography', 'Color Theory', 'Wireframing', 'Prototyping', 'Brand Design', '3D Modeling', 'Animation'],
  'Marketing & Sales': ['SEO', 'SEM', 'Google Analytics', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'CRM', 'Salesforce', 'Market Research', 'Brand Strategy', 'Copywriting', 'Lead Generation', 'HubSpot'],
  'Business & Finance': ['Financial Analysis', 'Excel', 'PowerPoint', 'Budgeting', 'Forecasting', 'QuickBooks', 'SAP', 'Project Management', 'Stakeholder Management', 'Strategic Planning', 'Risk Management', 'Compliance'],
  'Healthcare': ['Patient Care', 'Medical Terminology', 'EMR/EHR', 'HIPAA Compliance', 'CPR', 'Clinical Skills', 'Pharmacology', 'Diagnostic Testing', 'Treatment Planning', 'Medical Coding', 'Healthcare Administration'],
  'Education & Teaching': ['Curriculum Development', 'Lesson Planning', 'Classroom Management', 'Educational Technology', 'Assessment', 'Student Engagement', 'Special Education', 'Online Teaching', 'Learning Management Systems'],
  'Engineering': ['AutoCAD', 'SolidWorks', 'MATLAB', 'CAD/CAM', 'Technical Drawing', 'Quality Control', 'Project Management', 'Problem Solving', 'Circuit Design', 'Systems Engineering', 'Manufacturing Processes'],
  'Customer Service': ['Communication', 'Problem Solving', 'Conflict Resolution', 'Active Listening', 'Empathy', 'CRM Software', 'Multi-tasking', 'Time Management', 'Product Knowledge', 'Customer Retention'],
  'Human Resources': ['Recruitment', 'Onboarding', 'Performance Management', 'Employee Relations', 'HRIS', 'Payroll', 'Benefits Administration', 'Training & Development', 'HR Compliance', 'Talent Management'],
};

interface ResumeFormProps {
  onStepChange?: (step: number) => void;
}

export default function ResumeForm({ onStepChange }: ResumeFormProps) {
  const { t } = useLanguage();
  const steps = [
    t('step.personalInfo'),
    t('step.workExperience'),
    t('step.educationSkills'),
    t('step.template'),
    t('step.review')
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('teal-split');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0] || { name: 'Teal', primary: '#0d9488', accent: '#14b8a6' });
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<any>(null);
  const [skillCategory, setSkillCategory] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [previewJob, setPreviewJob] = useState<JobListing | null>(null);
  const [jobContent, setJobContent] = useState<string>('');

  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      website: '',
      jobListing: '',
      employers: [{ title: '', company: '', duration: '', location: '', responsibilities: '' }],
      education: [{ degree: '', institution: '', year: '', details: '' }],
      skills: '',
    },
  });

  const { fields: employerFields, append: appendEmployer, remove: removeEmployer } = useFieldArray({
    control,
    name: 'employers',
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Generate a simple user ID (in production, use auth)
      const userId = localStorage.getItem('userId') || `user_${Date.now()}`;
      localStorage.setItem('userId', userId);

      // Parse responsibilities and skills
      let formattedData: ResumeData = {
        ...data,
        userId,
        template: selectedTemplate,
        employers: data.employers.map((emp: any) => ({
          ...emp,
          responsibilities: emp.responsibilities
            ? emp.responsibilities
                .split('\n')
                .filter((r: string) => r.trim())
                .map((r: string) => r.trim())
            : [],
        })),
        skills: selectedSkills.length > 0
          ? selectedSkills
          : (data.skills
              ? data.skills
                  .split(',')
                  .filter((s: string) => s.trim())
                  .map((s: string) => s.trim())
              : []),
      };

      // If job description is provided (from scraped content or manual input), tailor the resume using AI
      const jobDescription = jobContent || data.jobListing;
      if (jobDescription && jobDescription.trim()) {
        try {
          const tailorResponse = await fetch('/api/resume/tailor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jobListing: jobDescription,
              experience: formattedData.employers,
              skills: formattedData.skills,
            }),
          });

          if (tailorResponse.ok) {
            const { suggestions } = await tailorResponse.json();

            // Apply AI suggestions to improve the resume
            if (suggestions.summary) {
              formattedData.summary = suggestions.summary;
            }

            if (suggestions.topSkills && suggestions.topSkills.length > 0) {
              // Prioritize AI-suggested skills but keep all user-selected skills
              const aiSkills = suggestions.topSkills;
              const userSkills = formattedData.skills || [];

              // Put AI-suggested skills first, then add remaining user skills
              const prioritizedSkills = [
                ...aiSkills,
                ...userSkills.filter((skill: string) => !aiSkills.includes(skill))
              ];

              formattedData.skills = prioritizedSkills;
            }
          }
        } catch (aiError) {
          console.error('AI tailoring failed, continuing with original data:', aiError);
          // Continue with original data if AI fails
        }
      }

      const response = await resumeApi.generate(formattedData);
      setGeneratedResume(response);
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Failed to generate resume. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectJob = (job: JobListing) => {
    setSelectedJob(job);
    setPreviewJob(job);
  };

  const handleApplyJob = async (job: JobListing) => {
    setSelectedJob(job);
    // Scrape the job content for AI analysis
    try {
      const scrapeResponse = await fetch('/api/jobs/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: job.url }),
      });

      if (scrapeResponse.ok) {
        const { content } = await scrapeResponse.json();
        setJobContent(content);
      }
    } catch (error) {
      console.error('Failed to scrape job content:', error);
    }
  };

  const downloadPDF = async (language: 'en' | 'es') => {
    if (!generatedResume) return;
    const element = document.getElementById('resume-preview');
    if (!element) return;

    try {
      // Show loading state
      const originalResume = generatedResume;

      // Create translated version using AI if Spanish is requested
      if (language === 'es') {
        const translateResponse = await fetch('/api/resume/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resume: generatedResume.content,
            targetLanguage: 'es',
          }),
        });

        if (translateResponse.ok) {
          const { translatedResume } = await translateResponse.json();
          // Temporarily update the displayed resume
          setGeneratedResume({
            ...generatedResume,
            content: translatedResume,
          });
          // Wait for React to re-render
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Restore original resume if we translated
      if (language === 'es') {
        setGeneratedResume(originalResume);
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      const fileName = `${watch('name') || 'resume'}_${language === 'es' ? 'ES' : 'EN'}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Failed to generate ${language === 'es' ? 'Spanish' : 'English'} PDF. Please try again.`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Modern Header with Gradient */}
      <div className="text-center mb-8">
        <div className="inline-block">
          <h1
            className="text-5xl font-bold mb-3 bg-[linear-gradient(to_right,#1F1F1E,#949492,#0278D3,#0278D3,#949492,#1F1F1E)] bg-clip-text text-transparent"
            style={{
              WebkitTextStroke: '1px rgba(0, 0, 0, 0.3)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {t('app.acronym')}
          </h1>
          <div className="h-1 w-full bg-[linear-gradient(to_right,#1F1F1E,#949492,#0278D3,#0278D3,#949492,#1F1F1E)] rounded-full shadow-md"></div>
        </div>
        <p className="text-black mt-3 text-xl font-semibold">{t('app.title')}</p>
        <p className="text-gray-600 mt-2 text-base">{t('app.subtitle')}</p>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
        {/* Step 0: Personal Info */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">{t('step.personalInfo')}</h2>
            <FormInput
              label={t('form.fullName')}
              name="name"
              register={register}
              error={errors.name}
              placeholder="John Doe"
              required
            />
            <FormInput
              label={t('form.email')}
              name="email"
              type="email"
              register={register}
              error={errors.email}
              placeholder="john@example.com"
              required
            />
            <FormInput
              label={t('form.phone')}
              name="phone"
              type="tel"
              register={register}
              placeholder="+1 (555) 123-4567"
            />
            <FormInput
              label={t('form.portfolio')}
              name="portfolio"
              type="url"
              register={register}
              placeholder="https://yourportfolio.com"
            />
            <FormInput
              label={t('form.website')}
              name="website"
              type="url"
              register={register}
              placeholder="https://yourwebsite.com"
            />
          </div>
        )}

        {/* Step 1: Work Experience */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">{t('step.workExperience')}</h2>
            <p className="text-black mb-4">Add up to 3 of your most recent positions</p>
            {employerFields.map((field, index) => (
              <div key={field.id} className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-black">Position {index + 1}</h3>
                  {employerFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmployer(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      {t('form.remove')}
                    </button>
                  )}
                </div>
                <FormInput
                  label={t('form.jobTitle')}
                  name={`employers.${index}.title`}
                  register={register}
                  placeholder="Senior Developer"
                />
                <FormInput
                  label={t('form.company')}
                  name={`employers.${index}.company`}
                  register={register}
                  placeholder="Tech Corp"
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label={t('form.duration')}
                    name={`employers.${index}.duration`}
                    register={register}
                    placeholder="Jan 2020 - Present"
                  />
                  <FormInput
                    label={t('form.location')}
                    name={`employers.${index}.location`}
                    register={register}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <FormInput
                  label={t('form.responsibilities')}
                  name={`employers.${index}.responsibilities`}
                  register={register}
                  rows={4}
                  placeholder="Led team of 5 developers&#10;Increased performance by 40%&#10;Implemented CI/CD pipeline"
                />
              </div>
            ))}
            {employerFields.length < 3 && (
              <button
                type="button"
                onClick={() =>
                  appendEmployer({ title: '', company: '', duration: '', location: '', responsibilities: '' })
                }
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-black hover:border-blue-500 hover:text-blue-500 transition"
              >
                + {t('form.addAnother')} Position
              </button>
            )}
          </div>
        )}

        {/* Step 2: Education & Skills */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">{t('step.educationSkills')}</h2>

            <h3 className="text-lg font-medium mb-4 text-black">Education</h3>
            {educationFields.map((field, index) => (
              <div key={field.id} className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-black">Education {index + 1}</h4>
                  {educationFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      {t('form.remove')}
                    </button>
                  )}
                </div>
                <FormInput
                  label={t('form.degree')}
                  name={`education.${index}.degree`}
                  register={register}
                  placeholder="Bachelor of Science in Computer Science"
                />
                <FormInput
                  label={t('form.institution')}
                  name={`education.${index}.institution`}
                  register={register}
                  placeholder="University of California"
                />
                <FormInput
                  label={t('form.year')}
                  name={`education.${index}.year`}
                  register={register}
                  placeholder="2019"
                />
                <FormInput
                  label={t('form.details')}
                  name={`education.${index}.details`}
                  register={register}
                  placeholder="GPA: 3.8, Dean's List"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendEducation({ degree: '', institution: '', year: '', details: '' })}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-black hover:border-blue-500 hover:text-blue-500 transition mb-6"
            >
              + {t('form.addAnother')} Education
            </button>

            <h3 className="text-lg font-medium mb-4 text-black">{t('form.skillsJobTarget')}</h3>

            {/* Skill Category Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-black">{t('form.selectCategory')}</label>
              <select
                value={skillCategory}
                onChange={(e) => {
                  setSkillCategory(e.target.value);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
              >
                <option value="">Choose a category...</option>
                <option value="Software Development">{t('category.softwareDevelopment')}</option>
                <option value="Data Science & Analytics">{t('category.dataScience')}</option>
                <option value="Design & Creative">{t('category.designCreative')}</option>
                <option value="Marketing & Sales">{t('category.marketingSales')}</option>
                <option value="Business & Finance">{t('category.businessFinance')}</option>
                <option value="Healthcare">{t('category.healthcare')}</option>
                <option value="Education & Teaching">{t('category.educationTeaching')}</option>
                <option value="Engineering">{t('category.engineering')}</option>
                <option value="Customer Service">{t('category.customerService')}</option>
                <option value="Human Resources">{t('category.humanResources')}</option>
              </select>
            </div>

            {/* Skill Word Cloud */}
            {skillCategory && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-black">{t('form.tapToSelect')}</label>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <div className="flex flex-wrap gap-3">
                    {skillCategories[skillCategory].map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedSkills(selectedSkills.filter((s) => s !== skill));
                            } else {
                              setSelectedSkills([...selectedSkills, skill]);
                            }
                          }}
                          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#0278D3] to-[#014071] text-white shadow-lg'
                              : 'bg-white text-black border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
                          }`}
                          style={{
                            fontSize: `${Math.random() * 0.4 + 0.9}rem`,
                          }}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {selectedSkills.length > 0 && (
                  <p className="text-sm text-black mt-3">
                    Selected: {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )}

            {/* Job Listings Manager */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4 text-black">Saved Job Listings</h3>
              <JobListingsManager
                onSelectJob={handleSelectJob}
                selectedJobId={selectedJob?.id}
              />
              {selectedJob && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">
                      Tailoring resume for: {selectedJob.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewJob(selectedJob)}
                    className="mt-2 text-sm text-green-700 hover:text-green-900 underline"
                  >
                    Preview job posting
                  </button>
                </div>
              )}
            </div>

            <FormInput
              label={t('form.jobListing')}
              name="jobListing"
              register={register}
              rows={4}
              placeholder="Or paste job description manually (optional)..."
            />

            {/* Hidden field to store selected skills */}
            <input
              type="hidden"
              {...register('skills')}
              value={selectedSkills.join(', ')}
            />
          </div>
        )}

        {/* Step 3: Template Selection */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">{t('template.chooseTemplate')}</h2>
            <p className="text-black mb-6">Select a template that best fits your style and industry</p>

            {/* Template Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {templates.map((template) => (
                <TemplateCard
                  key={template?.id}
                  template={{
                    id: template?.id || '',
                    name: template?.name || '',
                    description: template?.description || '',
                    color: selectedColor?.primary || '#0d9488',
                  }}
                  isSelected={selectedTemplate === template?.id}
                  onClick={() => setSelectedTemplate(template?.id)}
                />
              ))}
            </div>

            {/* Color Picker */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-black">{t('template.chooseColor')}</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-3">
                {colorOptions.filter(c => c).map((colorOption) => (
                  <button
                    key={colorOption.name}
                    type="button"
                    onClick={() => setSelectedColor(colorOption)}
                    className={`group relative aspect-square rounded-lg transition-all ${
                      selectedColor?.name === colorOption.name
                        ? 'ring-4 ring-blue-500 scale-110'
                        : 'ring-2 ring-gray-200 hover:ring-gray-400'
                    }`}
                    style={{ backgroundColor: colorOption.primary }}
                    title={colorOption.name}
                  >
                    {selectedColor?.name === colorOption.name && (
                      <svg className="w-6 h-6 text-white absolute inset-0 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span className="sr-only">{colorOption.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Upload for templates with photos */}
            {templates.find(t => t.id === selectedTemplate)?.hasPhoto && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-black">{t('template.uploadPhoto')}</h3>
                <div className="flex items-center gap-6">
                  {uploadedPhoto ? (
                    <div className="relative">
                      <img
                        src={uploadedPhoto}
                        alt="Profile"
                        className="w-32 h-32 object-cover rounded-full border-4"
                        style={{ borderColor: selectedColor.primary }}
                      />
                      <button
                        type="button"
                        onClick={() => setUploadedPhoto(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setUploadedPhoto(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF (max 5MB)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">{t('step.review')} & Generate</h2>
            {generatedResume ? (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-green-800 mb-1">{t('resume.generated')}</h3>
                      <p className="text-green-700">{t('resume.createdSuccess')}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => downloadPDF('en')}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0278D3] to-[#043D69] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      🇺🇸 {t('resume.downloadEnglish')}
                    </button>
                    <button
                      onClick={() => downloadPDF('es')}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      🇪🇸 {t('resume.downloadSpanish')}
                    </button>
                  </div>
                </div>
                <div id="resume-preview">
                  <ResumePreview
                    resume={generatedResume}
                    layout={selectedTemplate}
                    photo={uploadedPhoto}
                    selectedColor={selectedColor.primary}
                    fontFamily={templates.find(t => t.id === selectedTemplate)?.fontFamily}
                    headingFont={templates.find(t => t.id === selectedTemplate)?.headingFont}
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-black mb-4">
                  Review your information and click "Generate Resume" to create your professional resume.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800"><strong>Name:</strong> {watch('name')}</p>
                  <p className="text-gray-800"><strong>Email:</strong> {watch('email')}</p>
                  <p className="text-gray-800"><strong>Template:</strong> {templates.find(t => t.id === selectedTemplate)?.name}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10 gap-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-8 py-3 bg-gray-400 text-white rounded-xl hover:bg-gray-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            ← {t('button.previous')}
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-8 py-3 text-white rounded-xl hover:opacity-90 transition-all duration-200 font-medium"
              style={{
                background: 'linear-gradient(to bottom right, #0278D3 0%, #0278D3 50%, #014071 100%)'
              }}
            >
              {t('button.next')} →
            </button>
          ) : !generatedResume ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all duration-200 font-medium"
              style={{
                background: 'linear-gradient(to bottom right, #0278D3 0%, #0278D3 50%, #014071 100%)'
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('button.generating')}
                </span>
              ) : (
                t('button.generateResume')
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setCurrentStep(0);
                setGeneratedResume(null);
              }}
              className="px-8 py-3 text-white rounded-xl hover:opacity-90 transition-all duration-200 font-medium"
              style={{
                background: 'linear-gradient(to bottom right, #0278D3 0%, #0278D3 50%, #014071 100%)'
              }}
            >
              {t('button.createAnother')}
            </button>
          )}
        </div>
      </form>

      {/* Domain Suggestion Component */}
      <DomainSuggestion
        firstName={watch('name')?.split(' ')[0]}
        lastName={watch('name')?.split(' ').slice(1).join(' ')}
      />

      {/* Job Preview Modal */}
      <JobPreviewModal
        job={previewJob}
        onClose={() => setPreviewJob(null)}
        onApplyJob={handleApplyJob}
      />
    </div>
  );
}
