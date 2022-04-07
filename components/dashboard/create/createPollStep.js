export default function CreatePollStep({
  heading,
  step,
  hasProceed = true,
  moveToNextStepFunc,
  currentStep,
  children,
}) {
  const collapsed = currentStep != step;
  return (
    <div className="flex gap-4 mb-8 w-full">
      <div className="px-4 py-2 h-min rounded-full bg-sky-700 text-white">
        {step}
      </div>
      <div className="max-w-xl w-full">
        <div className="text-2xl mb-4">{heading}</div>
        <div className={`${collapsed ? "hidden" : "block w-full"}`}>
          {children}
          <div className={`${hasProceed ? "block" : "hidden"}`}>
            <button
              className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2"
              onClick={moveToNextStepFunc}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: Install TailwindCSS form library and replace the div component with a text component
