import AppLayout from "@components/dashboard/appLayout";
import CreatePollStep from "@components/dashboard/create/createPollStep";
import LinkCopyComponent from "@components/dashboard/create/linkCopyComponent";
import { useState } from "react";

export default function CreatePollPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <AppLayout>
      <div className="py-16">
        <div>
          <div className="text-2xl text-zinc-500 mb-7 font-light">Awesome!</div>
          <h1 className="text-4xl font-medium max-w-md mb-6">
            Let’s get started getting feedback on your ideas.
          </h1>
          <div className="bg-zinc-800 rounded-full text-white text-md w-max px-6 py-2">
            Create Poll
          </div>
        </div>
        <button onClick={() => setCurrentStep(1)}>
          Reset step counter; Current: {currentStep}
        </button>
        <div className="mt-16 w-full">
          <CreatePollStep
            step={1}
            heading="What are we voting on?"
            currentStep={currentStep}
            moveToNextStepFunc={() => setCurrentStep(currentStep + 1)}
          >
            <textarea
              type="textarea"
              placeholder="e.g. Should we build an anonymous voting app for young startup founders?"
              className="w-full text-xl border-zinc-400 border-0 border-b py-4 mb-4"
              autoFocus={true}
            />
          </CreatePollStep>
          <CreatePollStep
            step={2}
            currentStep={currentStep}
            heading="Share your poll link."
            moveToNextStepFunc={() => setCurrentStep(currentStep + 1)}
          >
            <LinkCopyComponent />
          </CreatePollStep>
          <CreatePollStep
            step={3}
            currentStep={currentStep}
            heading="Watch the results roll in."
            moveToNextStepFunc={() => setCurrentStep(currentStep + 1)}
            hasProceed={false}
          >
            <>
              <div className="text-xl mb-4">
                We have created a page for you where you will track responses,
                end the poll, and view results.
              </div>
              <div className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2">
                Go to tracking page
              </div>
            </>
          </CreatePollStep>
        </div>
      </div>
    </AppLayout>
  );
}
