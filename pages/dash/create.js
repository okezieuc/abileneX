import AppLayout from "@components/dashboard/appLayout";
import CreatePollStep from "@components/dashboard/create/createPollStep";
import LinkCopyComponent from "@components/dashboard/create/linkCopyComponent";
import SpinningIcon from "@components/dashboard/icons/spinningIcon";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CreatePageImage from "../../public/girl-working-on-laptop.png";

export default function CreatePollPage() {
  const { user, error } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [newPollTitle, setNewPollTitle] = useState(null);
  const [newPollId, setNewPollId] = useState(null);
  const [step1Loading, setStep1Loading] = useState(false);

  async function createNewPoll() {
    // add the loading indicator
    setStep1Loading(true);

    // prepare entry to be sent
    const newPollData = {
      title: newPollTitle,
      creator_id: user.id,
    };

    try {
      // create new poll entry on supabase
      const { data, error } = await supabaseClient
        .from("polls")
        .insert([newPollData]);
      setNewPollId(data[0].poll_id);

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
        <div className="relative">
          <div className="text-2xl text-zinc-500 mb-7 font-light">Awesome!</div>
          <h1 className="text-4xl font-medium max-w-md mb-8">
            Let’s get started getting feedback on your ideas.
          </h1>
          <div className="w-80 absolute -top-4 -right-4">
            <Image src={CreatePageImage} alt="" />
          </div>
        </div>
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
                type="textarea"
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
          >
            <LinkCopyComponent id={newPollId} />
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
