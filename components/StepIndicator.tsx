'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="w-full py-6 mb-6">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="overflow-hidden h-2 flex rounded-full bg-gray-200/50 backdrop-blur-sm">
          <div
            style={{
              width: `${((currentStep + 1) / totalSteps) * 100}%`,
              background: 'linear-gradient(to right, #CDCECE 0%, #949492 7%, #024273 40%, #0582E3 100%)'
            }}
            className="flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-700 ease-out rounded-full shadow-lg"
          ></div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-start justify-between relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1 relative">
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 transition-all duration-500 ${
                  index < currentStep
                    ? 'bg-gradient-to-r from-[#F5C800] via-[#F59C00] to-[#724800]'
                    : 'bg-gray-200'
                }`}
              ></div>
            )}

            {/* Step Circle */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-lg relative z-10 ${
                index < currentStep
                  ? 'bg-gradient-to-br from-[#F5C800] via-[#F59C00] to-[#724800] text-white scale-100'
                  : index === currentStep
                  ? 'text-white scale-110 ring-4 ring-gray-300'
                  : 'bg-white text-gray-400 border-2 border-gray-200'
              }`}
              style={
                index === currentStep
                  ? { background: 'linear-gradient(to bottom right, #0278D3 0%, #0278D3 50%, #014071 100%)' }
                  : {}
              }
            >
              {index < currentStep ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            {/* Step Label */}
            <span
              className={`mt-3 text-xs text-center font-medium transition-all duration-300 max-w-[80px] ${
                index === currentStep
                  ? 'text-[#1F1F1E] scale-105'
                  : index < currentStep
                  ? 'text-[#724800]'
                  : 'text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
