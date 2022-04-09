import AppLayout from "@components/dashboard/appLayout";
import SpinningIcon from "@components/dashboard/icons/spinningIcon";
import VoteButton from "@components/dashboard/vote/voteButton";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Head from "next/head";
import { useState } from "react";

export default function PollVotePage({ pollData }) {
  const [ideaVoteRating, setIdeaVoteRating] = useState(null);
  const [ideaText, setIdeaText] = useState(null);
  const [sendingVote, setSendingVote] = useState(false);

  async function sendPollVote() {
    try {
      setSendingVote(true);

      if (ideaVoteRating == null) {
        setSendingVote(false);
        return;
      }

      const voteData = {
        poll_id: pollData.poll_id,
        idea_rating: ideaVoteRating,
        idea_comment: ideaText,
      };

      const { data, error } = await supabaseClient
        .from("poll_votes")
        .insert([voteData], {
          returning: "minimal",
        });

      setSendingVote(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppLayout>
      <>
      <Head>
        <title>Vote: {pollData.title}</title>
      </Head>
      <div className="my-16">
        <div className="text-center">
          <div className="text-2xl text-zinc-500 mb-7 font-light">
            We are asking for your honest feedback
          </div>
          <h1 className="text-4xl font-medium max-w-md mb-6 mx-auto">
            {pollData.title}
          </h1>
        </div>
        <div>
          <div className="flex gap-4 w-min mx-auto items-center">
            <div className="w-max text-zinc-700 text-lg font-semibold mr-4">
              Nah
            </div>
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
            <div className="w-max text-zinc-700 text-lg font-semibold ml-4">
              Awesome idea!
            </div>
          </div>
          <div className="max-w-md mx-auto mt-9">
            <textarea
              type="textarea"
              placeholder="(optional) The creator of this poll will appreciate you sharing more detail about why you voted what you did, how to improve the idea, or alternatives you suggest?"
              className="w-full text-lg border-zinc-500 mb-4 rounded-md h-32"
              autoFocus={true}
              onChange={(e) => {
                setIdeaText(e.target.value);
              }}
            />
          </div>
          <div className="mt-12 w-max mx-auto">
            <button
              className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2 mx-auto flex items-center"
              onClick={() => sendPollVote()}
            >
              {sendingVote ? (
                <>
                  <span>
                    <SpinningIcon />
                  </span>{" "}
                  Sending your vote{" "}
                </>
              ) : (
                "Vote"
              )}
            </button>
          </div>
        </div>
      </div></>
    </AppLayout>
  );
}

export async function getServerSideProps({ req, params }) {
  const poll_id = params.poll_id;

  const { data } = await supabaseClient
    .from("polls")
    .select("title, poll_id")
    .eq("poll_id", poll_id)
    .eq("accepting_votes", true);

  if (data.length != 1) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pollData: data[0],
    },
  };
}

// TODO: Fetch the name of the poll creator and customize the messages with that name.