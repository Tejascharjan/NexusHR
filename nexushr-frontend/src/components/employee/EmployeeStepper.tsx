interface EmployeeStepperProps {
  currentStep: number;
}

const steps = ["Employee Details", "Compensation", "Payroll", "Review"];

const EmployeeStepper = ({ currentStep }: EmployeeStepperProps) => {
  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const isCompleted = currentStep > stepNumber;

          const isActive = currentStep === stepNumber;

          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  isCompleted
                    ? "bg-orange-500 text-white"
                    : isActive
                      ? "bg-orange-500 text-white ring-4 ring-orange-500/20"
                      : "bg-slate-800 text-slate-400"
                }`}>
                {stepNumber}
              </div>

              <span className={`mt-3 text-sm font-medium ${isActive ? "text-orange-400" : "text-slate-400"}`}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeStepper;
