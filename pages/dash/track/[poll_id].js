import AppLayout from "@components/dashboard/appLayout";
import LoadingIndicator from "@components/dashboard/loadingIndicator";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import StatusPageImage1 from "../../../public/girl-stretching.png";

// Refactor the code in this page
// Rename functions and variables
// Consider fetching initial poll data on server side

export default function TrackPollPage() {
  const { user, error } = useUser();
  const router = useRouter();
  const [pollData, setPollData] = useState(null);
  const [pollVoteData, setPollVoteData] = useState(null);
  const [pollVoteRatings, setPollVoteRatings] = useState(null);
  const [pollVoteComments, setPollVoteComments] = useState([]);

  async function checkPollAcceptingVotes() {
    // check if the poll is still accepting responses
    const { data } = await supabaseClient
      .from("polls")
      .select("poll_id, title, accepting_votes, number_of_votes_received")
      .eq("poll_id", router.query.poll_id);

    if (data.length != 1) {
      router.push("/"); // return to the homepage if we receive bad data
    }

    // setPollData(data[0]); // update poll data

    if (data[0].accepting_votes == true) {
      setTimeout(() => setPollData(data[0]), 1500);
      return;
    } else {
      // continue fetching otherwise
      const { data: voteData } = await supabaseClient
        .from("poll_votes")
        .select("vote_id, idea_rating, idea_comment")
        .eq("poll_id", router.query.poll_id);

      let temporaryPollVoteRatings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let temportaryPollVoteComments = [];

      voteData.forEach((vote) => {
        temporaryPollVoteRatings[vote.idea_rating] =
          temporaryPollVoteRatings[vote.idea_rating] + 1;
        if (vote.idea_comment !== null) {
          temportaryPollVoteComments.push(vote.idea_comment);
        }
      });

      setPollVoteRatings(temporaryPollVoteRatings);
      setPollVoteComments(temportaryPollVoteComments);
      setTimeout(() => setPollData(data[0]), 1000);
      setPollVoteData(voteData);
    }
  }

  useEffect(() => {
    if (user) checkPollAcceptingVotes();
  }, [user]);

  async function stopPollAcceptingVotes() {
    const { data, error } = await supabaseClient
      .from("polls")
      .update({ accepting_votes: false })
      .match({ poll_id: router.query.poll_id });
    checkPollAcceptingVotes();
  }

  return (
    <AppLayout>
      <>
        <div className="flex my-16 flex-col min-h-[75%]">
          {pollData ? (
            <>
              <Head>
                <title>Poll Status: {pollData.title}</title>
              </Head>
              <div className="text-center">
                <div className="text-2xl text-zinc-500 mb-7 font-light">
                  {pollData.number_of_votes_received} Response(s) Received
                </div>
                <h1 className="text-4xl font-medium max-w-md mb-6 mx-auto">
                  {pollData.title}
                </h1>
              </div>
              {pollData.accepting_votes ? (
                <>
                  <div className="flex-1">
                    <div className="w-56 mx-auto">
                      <Image src={StatusPageImage1} />
                    </div>
                  </div>
                  <div className="mt-4 w-max mx-auto">
                    <button
                      className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2 mx-auto"
                      onClick={() => stopPollAcceptingVotes()}
                    >
                      End poll and view results
                    </button>
                  </div>
                </>
              ) : pollVoteRatings ? (
                <>
                  <div className="grid grid-cols-2 mt-8 divide-x divide-solid">
                    <div className="grid grid-cols-2 h-min">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div className="py-4 text-xl text-center ">
                          <span className="text-4xl font-semibold mr-2">
                            {num}
                          </span>{" "}
                          {pollVoteRatings[num]} vote(s)
                        </div>
                      ))}
                    </div>
                    <div className="">
                      <h2 className="text-3xl font-semibold mb-4 pl-6">
                        Feedback responses
                      </h2>
                      {pollVoteComments.length != 0 ? (
                        <div className="divide-y">
                          {pollVoteComments.map((comment) => (
                            <div className="px-6 py-4">{comment}</div>
                          ))}
                        </div>
                      ) : (
                        <div className="pl-6">
                          No optional comments received
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                "Loading poll results"
              )}
            </>
          ) : (
            <div className="w-min mx-auto"><LoadingIndicator text="Getting your poll status ready" /></div>
          )}
        </div>
      </>
    </AppLayout>
  );
}

// TODO: Add textarea component after installing tailwincss/forms
