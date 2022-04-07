import AppLayout from "@components/dashboard/appLayout";
import VoteButton from "@components/dashboard/vote/voteButton";
import { useState } from "react";

export default function PollVotePage() {
  const [ideaVoteRating, setIdeaVoteRating] = useState(null);

  return (
    <AppLayout>
      <div className="my-16">
        <div className="text-center">
          <div className="text-2xl text-zinc-500 mb-7 font-light">
            Okezie is asking for your honest feedback
          </div>
          <h1 className="text-4xl font-medium max-w-md mb-6 mx-auto">
            Should we build an anonymous voting app for young startup founders?
          </h1>
        </div>
        {ideaVoteRating}
        <div>
          <div className="flex gap-4 w-min mx-auto items-center">
            <div className="w-max text-zinc-700 text-lg font-semibold mr-4">Nah</div>
            <VoteButton
              number={1}
              setIdeaVoteRating={(rating) => setIdeaVoteRating(rating)}
              ideaVoteRating={ideaVoteRating}
            />
            <VoteButton
              number={2}
              setIdeaVoteRating={(rating) => setIdeaVoteRating(rating)}
              ideaVoteRating={ideaVoteRating}
            />
            <VoteButton
              number={3}
              setIdeaVoteRating={(rating) => setIdeaVoteRating(rating)}
              ideaVoteRating={ideaVoteRating}
            />
            <VoteButton
              number={4}
              setIdeaVoteRating={(rating) => setIdeaVoteRating(rating)}
              ideaVoteRating={ideaVoteRating}
            />
            <VoteButton
              number={5}
              setIdeaVoteRating={(rating) => setIdeaVoteRating(rating)}
              ideaVoteRating={ideaVoteRating}
            />
            <div className="w-max text-zinc-700 text-lg font-semibold ml-4">Awesome idea!</div>
          </div>
          <div className="max-w-md mx-auto mt-9">
            <textarea
              type="textarea"
              placeholder="(optional) Okezie will appreciate you sharing more detail about why you voted what you did, how to improve the idea, or alternatives you suggest?"
              className="w-full text-lg border-zinc-500 mb-4 rounded-md h-32"
              autoFocus={true}
            />
          </div>
          <div className="mt-12">
            <div className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2 mx-auto">
              Proceed
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// TODO: Add textarea component after installing tailwincss/forms
