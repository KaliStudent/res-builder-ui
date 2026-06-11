interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    color: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export default function TemplateCard({ template, isSelected, onClick }: TemplateCardProps) {
  if (!template) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
        isSelected
          ? 'ring-4 ring-blue-500 shadow-xl scale-105'
          : 'ring-2 ring-gray-200 hover:ring-gray-400 hover:shadow-lg'
      }`}
    >
      {/* Template Preview */}
      <div className="bg-white p-4 h-64 relative overflow-hidden">
        {/* Mini Resume Preview */}
        <div className="space-y-2 text-xs">
          {/* Header */}
          <div className="border-b-2 pb-2" style={{ borderColor: template.color }}>
            <div className="h-3 bg-gray-800 rounded w-2/3 mb-1"></div>
            <div className="h-2 bg-gray-400 rounded w-1/2"></div>
          </div>

          {/* Contact Info */}
          <div className="flex gap-2">
            <div className="h-1.5 bg-gray-300 rounded w-1/4"></div>
            <div className="h-1.5 bg-gray-300 rounded w-1/4"></div>
          </div>

          {/* Section */}
          <div className="pt-2">
            <div className="h-2.5 rounded w-1/3 mb-2" style={{ backgroundColor: template.color }}></div>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-gray-300 rounded w-full"></div>
              <div className="h-1.5 bg-gray-300 rounded w-5/6"></div>
              <div className="h-1.5 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="pt-2">
            <div className="h-2.5 rounded w-2/5 mb-2" style={{ backgroundColor: template.color }}></div>
            <div className="mb-2">
              <div className="h-2 bg-gray-700 rounded w-1/2 mb-1"></div>
              <div className="h-1.5 bg-gray-400 rounded w-1/3 mb-1"></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded w-full"></div>
                <div className="h-1 bg-gray-300 rounded w-11/12"></div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="pt-2">
            <div className="h-2.5 rounded w-1/3 mb-2" style={{ backgroundColor: template.color }}></div>
            <div className="h-2 bg-gray-700 rounded w-3/5 mb-1"></div>
            <div className="h-1.5 bg-gray-400 rounded w-2/5"></div>
          </div>

          {/* Skills */}
          <div className="pt-2">
            <div className="h-2.5 rounded w-1/4 mb-2" style={{ backgroundColor: template.color }}></div>
            <div className="flex gap-1 flex-wrap">
              <div className="h-4 rounded px-2" style={{ backgroundColor: template.color + '20' }}>
                <div className="h-1.5 bg-gray-600 rounded w-8 mt-1"></div>
              </div>
              <div className="h-4 rounded px-2" style={{ backgroundColor: template.color + '20' }}>
                <div className="h-1.5 bg-gray-600 rounded w-10 mt-1"></div>
              </div>
              <div className="h-4 rounded px-2" style={{ backgroundColor: template.color + '20' }}>
                <div className="h-1.5 bg-gray-600 rounded w-6 mt-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Checkmark */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Template Info */}
      <div className={`p-4 ${isSelected ? 'bg-blue-50' : 'bg-gray-50'}`}>
        <h3 className="font-bold text-lg mb-1 text-gray-900">{template.name}</h3>
        <p className="text-sm text-gray-600">{template.description}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.color }}></div>
          <span className="text-xs text-gray-500">Theme color</span>
        </div>
      </div>
    </div>
  );
}
