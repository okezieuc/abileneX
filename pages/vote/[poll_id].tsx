import type { GetServerSideProps } from "next";
import AppLayout from "@components/dashboard/appLayout";
import SpinningIcon from "@components/dashboard/icons/spinningIcon";
import VoteButton from "@components/dashboard/vote/voteButton";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Head from "next/head";
import { useState } from "react";
import { supabaseGraphQLClient } from "utils/supabaseGraphQLClient";

type Poll = {
  title: string;
  pollId: string;
};

type PollList = {
  pollsCollection: {
    edges: { node: Poll }[];
  };
};

type Props = {
  pollData: Poll;
};

export default function PollVotePage({ pollData }: Props) {
  const [ideaVoteRating, setIdeaVoteRating] = useState<number | null>(null);
  const [ideaText, setIdeaText] = useState<string | null>(null);
  const [sendingVote, setSendingVote] = useState<number>(0);

  async function sendPollVote() {
    try {
      if (sendingVote == 2) {
        return;
      }
      setSendingVote(1);

      if (ideaVoteRating == null) {
        setSendingVote(0);
        return;
      }

      const voteData = {
        poll_id: pollData.pollId,
        idea_rating: ideaVoteRating,
        idea_comment: ideaText,
      };

      const { data, error } = await supabaseClient
        .from("poll_votes")
        .insert([voteData], {
          returning: "minimal",
        });

      setSendingVote(2);
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
                ideaVoteRating={ideaVoteRating || -1}
              />
              <VoteButton
                number={2}
                setIdeaVoteRating={(rating) => setIdeaVoteRating(rating)}
                ideaVoteRating={ideaVoteRating || -1}
              />
              <VoteButton
                number={3}
                setIdeaVoteRating={(rating) => setIdeaVoteRating(rating)}
                ideaVoteRating={ideaVoteRating || -1}
              />
              <VoteButton
                number={4}
                setIdeaVoteRating={(rating) => setIdeaVoteRating(rating)}
                ideaVoteRating={ideaVoteRating || -1}
              />
              <VoteButton
                number={5}
                setIdeaVoteRating={(rating) => setIdeaVoteRating(rating)}
                ideaVoteRating={ideaVoteRating || -1}
              />
              <div className="w-max text-zinc-700 text-lg font-semibold ml-4">
                Awesome idea!
              </div>
            </div>
            <div className="max-w-md mx-auto mt-9">
              <textarea
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
                    {sendingVote == 2 ? (
                      "Your vote has been sent"
                    ) : (
                      <>
                        <span>
                          <SpinningIcon />
                        </span>{" "}
                        Sending your vote
                      </>
                    )}
                  </>
                ) : (
                  "Vote"
                )}
              </button>
            </div>
          </div>
        </div>
      </>
    </AppLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const poll_id = params!.poll_id;

  const data: PollList = await supabaseGraphQLClient(
    `query loadPollData($id: UUID!) {
      pollsCollection(filter: {pollId: {eq: $id }, acceptingVotes: {eq: true} }) {
        edges {
          node {
            title
            pollId
          }
        }
      }
    }`,
    {
      authorizationKey: process.env.SUPABASE_SERVICE_KEY,
      variables: {
        id: poll_id,
      },
    }
  );

  if (data.pollsCollection.edges.length != 1) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pollData: data.pollsCollection.edges[0].node,
    },
  };
};

// TODO: Fetch the name of the poll creator and customize the messages with that name.
