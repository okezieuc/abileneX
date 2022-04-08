import AppLayout from "@components/dashboard/appLayout";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import StatusPageImage1 from "../../../public/girl-stretching.png";

/* const { data } = await supabaseClient
.from("poll_votes")
.select("vote_id, idea_rating, poll_id, idea_comment");
*/

export default function TrackPollPage() {
  const { user, error } = useUser();
  const router = useRouter();
  const [pollAcceptingVotes, setPollAcceptingVotes] = useState(null);
  const [pollVoteData, setPollVoteData] = useState(null);
  const [pollVoteRatings, setPollVoteRatings] = useState(null);
  const [pollVoteComments, setPollVoteComments] = useState([]);

  useEffect(() => {
    async function checkPollAcceptingVotes() {
      // check if the poll is still accepting responses
      const { data } = await supabaseClient
        .from("polls")
        .select("accepting_votes")
        .eq("poll_id", router.query.poll_id);

      if (data.length != 1) {
        router.push("/"); // return to the homepage if we receive bad data
      }

      if (data[0].accepting_votes == true) {
        setPollAcceptingVotes(true); // set pollAcceptingVotes to true if the poll is still accepting votes
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

        setPollAcceptingVotes(false); // update pollAcceptingVotes to false
        setPollVoteData(data);
      }
    }

    if (user) checkPollAcceptingVotes();
  }, [user]);

  return (
    <AppLayout>
      <div className="flex my-16 flex-col min-h-[75%]">
        <div className="text-center">
          <div className="text-2xl text-zinc-500 mb-7 font-light">
            12 Responses Received
          </div>
          <h1 className="text-4xl font-medium max-w-md mb-6 mx-auto">
            Should we build an anonymous voting app for young startup founders?
          </h1>
        </div>
        {pollAcceptingVotes ? (
          <>
            <div className="flex-1">
              <div className="w-56 mx-auto">
                <Image src={StatusPageImage1} />
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2 mx-auto">
                End poll and view results
              </div>
            </div>
          </>
        ) : (
          "Poll is closed"
        )}
      </div>
    </AppLayout>
  );
}

// TODO: Add textarea component after installing tailwincss/forms
