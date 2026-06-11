'use client';

import { useState, useEffect } from 'react';
import { JobListing } from '@/lib/types/jobs';
import { useLanguage } from '@/contexts/LanguageContext';
import CompanyInfo from './CompanyInfo';

interface JobListingsManagerProps {
  onSelectJob: (job: JobListing) => void;
  selectedJobId?: string;
  onResearchCompany?: (companyName: string, companyUrl?: string) => void;
}

export default function JobListingsManager({ onSelectJob, selectedJobId, onResearchCompany }: JobListingsManagerProps) {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [newJobUrl, setNewJobUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [researchCompany, setResearchCompany] = useState<{ name: string; url?: string } | null>(null);

  // Load jobs from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('savedJobListings');
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (e) {
        console.error('Failed to load saved jobs:', e);
      }
    }
  }, []);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem('savedJobListings', JSON.stringify(jobs));
    }
  }, [jobs]);

  const handleAddJob = async () => {
    if (!newJobUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fetch metadata
      const metadataResponse = await fetch('/api/jobs/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newJobUrl }),
      });

      if (!metadataResponse.ok) {
        throw new Error('Failed to fetch job listing metadata');
      }

      const { metadata } = await metadataResponse.json();

      // Create new job listing
      const newJob: JobListing = {
        id: Date.now().toString(),
        ...metadata,
      };

      setJobs([newJob, ...jobs]);
      setNewJobUrl('');
    } catch (err: any) {
      setError(err.message || 'Failed to add job listing');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
    if (jobs.length === 1) {
      localStorage.removeItem('savedJobListings');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleAddJob();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="url"
          value={newJobUrl}
          onChange={(e) => setNewJobUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Paste job listing URL..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0278D3] focus:border-transparent"
          disabled={loading}
        />
        <button
          onClick={handleAddJob}
          disabled={loading}
          className="px-6 py-2 bg-[#0278D3] text-white rounded-lg hover:bg-[#043D69] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Adding...' : '+ Add Job'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {jobs.length > 0 && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedJobId === job.id
                  ? 'border-[#0278D3] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => onSelectJob(job)}
            >
              <div className="flex items-start gap-3">
                {job.favicon && (
                  <img
                    src={job.favicon}
                    alt=""
                    className="w-6 h-6 rounded flex-shrink-0 mt-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
                  {job.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{job.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2 truncate">{job.url}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-xs text-gray-400">
                      Added {new Date(job.dateAdded).toLocaleDateString()}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Extract company name from URL hostname
                        const hostname = new URL(job.url).hostname.replace('www.', '').split('.')[0];
                        const companyName = hostname.charAt(0).toUpperCase() + hostname.slice(1);
                        setResearchCompany({ name: companyName, url: job.url });
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Research Company
                    </button>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteJob(job.id);
                  }}
                  className="text-red-500 hover:text-red-700 p-2"
                  aria-label="Delete job"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {jobs.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p>No saved job listings yet</p>
          <p className="text-sm mt-1">Add URLs to jobs you're applying for</p>
        </div>
      )}

      {/* Company Info Modal */}
      {researchCompany && (
        <CompanyInfo
          companyName={researchCompany.name}
          companyUrl={researchCompany.url}
          onClose={() => setResearchCompany(null)}
        />
      )}
    </div>
  );
}
