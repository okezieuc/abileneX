import AppLayout from "@components/dashboard/appLayout";
import CreatePageHeading from "@components/dashboard/create/createPageHeading";
import CreatePollStep from "@components/dashboard/create/createPollStep";
import LinkCopyComponent from "@components/dashboard/create/linkCopyComponent";
import SpinningIcon from "@components/dashboard/icons/spinningIcon";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

type NewPollDataType = {
  title: string;
  creator_id: string;
  poll_id?: string;
};

export default function CreatePollPage() {
  const { user, error } = useUser();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [newPollTitle, setNewPollTitle] = useState<string>("");
  const [newPollId, setNewPollId] = useState<string | null>(null);
  // step 1 loading controls the loading indicator that is diplayed while the entry is uploaded to supabase
  const [step1Loading, setStep1Loading] = useState(false);

  async function createNewPoll() {
    // only proceed if the string is non-empty
    if (newPollTitle === "" || user === null) return;

    // display the loading indicator while we upload the entry
    // a loading indicator is only displayed at step 1
    setStep1Loading(true);

    const newPollData: NewPollDataType = {
      title: newPollTitle,
      creator_id: user.id,
    };

    try {
      // create new poll entry on supabase
      const { data, error } = await supabaseClient
        .from<NewPollDataType>("polls")
        .insert([newPollData]);

      if (data !== null) setNewPollId(data[0].poll_id || null);

      // move to the next step after 1000ms
      setTimeout(() => setCurrentStep(currentStep + 1), 1000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppLayout>
      <div className="py-16">
        <Head>
          <title>Create AbileneX Poll</title>
        </Head>
        <CreatePageHeading />
        <button
          className="hidden"
          onClick={() => setCurrentStep((currentStep % 3) + 1)}
        >
          proceed step counter; Current: {currentStep}
        </button>
        <div className="border-b mt-24 mb-16 -mx-16"></div>
        <div className="w-full">
          <CreatePollStep
            step={1}
            heading="What are we voting on?"
            currentStep={currentStep}
            moveToNextStepFunc={() => setCurrentStep(currentStep + 1)}
            hasProceed={false}
          >
            <>
              <textarea
                placeholder="e.g. Should we build an anonymous voting app for young startup founders?"
                className="w-full text-xl border-zinc-400 border-0 border-b py-4 mb-4"
                autoFocus={true}
                onChange={(e) => setNewPollTitle(e.target.value)}
              />

              <button
                className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2 flex items-center"
                onClick={() => createNewPoll()}
              >
                {step1Loading ? (
                  <>
                    <span>
                      <SpinningIcon />
                    </span>{" "}
                    Loading...{" "}
                  </>
                ) : (
                  "Proceed"
                )}
              </button>
            </>
          </CreatePollStep>
          <CreatePollStep
            step={2}
            currentStep={currentStep}
            heading="Share your poll link."
            moveToNextStepFunc={() => setCurrentStep(currentStep + 1)}
            hasProceed
          >
            <LinkCopyComponent id={newPollId || "An error occurred"} />
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
              <Link href={`/dash/track/${newPollId}`}>
                <a className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2">
                  Go to tracking page
                </a>
              </Link>
            </>
          </CreatePollStep>
        </div>
      </div>
    </AppLayout>
  );
}

// redirect non-logged in users to landing page
export const getServerSideProps = withPageAuth({ redirectTo: "/" });
