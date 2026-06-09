const steps = ["Input", "Department", "Draft", "PDF"];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="RTI application progress" className="w-full">
      <ol className="grid grid-cols-4 gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;

          return (
            <li key={step} className="min-w-0">
              <div
                className={`h-2 rounded-full ${
                  isComplete || isActive ? "bg-[#FF9933]" : "bg-slate-200"
                }`}
              />
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    isComplete || isActive
                      ? "bg-[#0F2044] text-white"
                      : "bg-white text-slate-500 ring-1 ring-slate-200"
                  }`}
                >
                  {stepNumber}
                </span>
                <span
                  className={`truncate text-sm font-medium ${
                    isActive ? "text-[#0F2044]" : "text-slate-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
