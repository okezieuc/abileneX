import AppLayout from "@components/dashboard/appLayout";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
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

    setPollData(data[0]); // update poll data

    if (data[0].accepting_votes == true) {
      return;
    } else {
      // continue fetching otherwise
      const { data } = await supabaseClient
        .from("poll_votes")
        .select("vote_id, idea_rating, idea_comment")
        .eq("poll_id", router.query.poll_id);

      let temporaryPollVoteRatings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let temportaryPollVoteComments = [];

      data.forEach((vote) => {
        temporaryPollVoteRatings[vote.idea_rating] =
          temporaryPollVoteRatings[vote.idea_rating] + 1;
        if (vote.idea_comment !== null) {
          temportaryPollVoteComments.push(vote.idea_comment);
        }
      });

      setPollVoteRatings(temporaryPollVoteRatings);
      setPollVoteComments(temportaryPollVoteComments);

      setPollVoteData(data);
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
      <div className="flex my-16 flex-col min-h-[75%]">
        {pollData ? (
          <>
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
            ) : (
              <>
                <div className="grid grid-cols-2">Poll results</div>
              </>
            )}
          </>
        ) : (
          "loading poll data"
        )}
      </div>
    </AppLayout>
  );
}

// TODO: Add textarea component after installing tailwincss/forms
