'use client';

import { JobListing } from '@/lib/types/jobs';

interface JobPreviewModalProps {
  job: JobListing | null;
  onClose: () => void;
  onApplyJob: (job: JobListing) => void;
}

export default function JobPreviewModal({ job, onClose, onApplyJob }: JobPreviewModalProps) {
  if (!job) return null;

  const handleApply = () => {
    onApplyJob(job);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {job.favicon && (
              <img
                src={job.favicon}
                alt=""
                className="w-8 h-8 rounded flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{job.title}</h2>
              <p className="text-sm text-gray-500 truncate">{job.url}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Apply to This Job
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Browser View */}
        <div className="flex-1 relative overflow-hidden">
          <iframe
            src={job.url}
            className="w-full h-full border-0"
            title={job.title}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Tip:</span> Review the job posting and click "Apply to This Job" to tailor your resume with AI
          </p>
        </div>
      </div>
    </div>
  );
}
