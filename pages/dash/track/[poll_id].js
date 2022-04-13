import AppLayout from "@components/dashboard/appLayout";
import LinkCopyComponent from "@components/dashboard/create/linkCopyComponent";
import SpinningIcon from "@components/dashboard/icons/spinningIcon";
import LoadingIndicator from "@components/dashboard/loadingIndicator";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { supabaseGraphQLClient } from "utils/supabaseGraphQLClient";
import StatusPageImage1 from "../../../public/girl-stretching.png";

// Refactor the code in this page
// Rename functions and variables
// Consider fetching initial poll data on server side

export default function TrackPollPage() {
  const { user, accessToken, error } = useUser();
  const router = useRouter();
  const [pollData, setPollData] = useState(null);
  const [pollVoteData, setPollVoteData] = useState(null);
  const [pollVoteRatings, setPollVoteRatings] = useState(null);
  const [pollVoteComments, setPollVoteComments] = useState([]);
  const [stoppingPoll, setStoppingPoll] = useState(false);
  const [numberOfVotesReceived, setNumberOfVotesReceived] = useState(null);

  const checkPollAcceptingVotes = useCallback(
    async (loadingAfterStopping = false) => {
      // check if the poll is still accepting responses
      const data = await supabaseGraphQLClient(
        `query LoadPollData($id: UUID!) {
        pollsCollection(filter: {pollId: {eq: $id } }) {
          edges {
            node {
              title
              pollId
              acceptingVotes
              numberOfVotesReceived
            }
          }
        }
      }`,
        {
          authorizationKey: accessToken,
          variables: {
            id: router.query.poll_id,
          },
        }
      );

      if (data.pollsCollection.edges.length != 1) {
        router.push("/"); // return to the homepage if we receive bad data
      }

      if (data.pollsCollection.edges[0].node.acceptingVotes == true) {
        setTimeout(() => setPollData(data.pollsCollection.edges[0]), 1500);
        return;
      } else {
        const voteData = await supabaseGraphQLClient(
          `query LoadVoteData($id: UUID!) {
          pollVotesCollection(filter: {pollId: {eq: $id } }) {
            edges {
              node {
                pollId
                voteId
                ideaRating
                ideaComment
              }
            }
          }
        }`,
          {
            authorizationKey: accessToken,
            variables: {
              id: router.query.poll_id,
            },
          }
        );

        let temporaryPollVoteRatings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let temportaryPollVoteComments = [];

        voteData.pollVotesCollection.edges.forEach((vote) => {
          temporaryPollVoteRatings[vote.node.ideaRating] =
            temporaryPollVoteRatings[vote.node.ideaRating] + 1;
          if (vote.node.ideaComment !== null) {
            temportaryPollVoteComments.push(vote.node.ideaComment);
          }
        });

        setPollVoteRatings(temporaryPollVoteRatings);
        setPollVoteComments(temportaryPollVoteComments);
        setTimeout(() => setPollData(data.pollsCollection.edges[0]), 1000);
        setPollVoteData(voteData);
      }
    },
    [accessToken, router]
  );
  
  //load data on login
  useEffect(() => {
    if (user) checkPollAcceptingVotes();
  }, [user, checkPollAcceptingVotes]);

  useEffect(() => {
    // automatically update number of votes received
    async function setupVoteCountSubscription() {
      const updateVoteCount = await supabaseClient
        .from(`polls:poll_id=eq.${router.query.poll_id}`)
        .on("UPDATE", (payload) => {
          console.log("Change received!", payload);
          setNumberOfVotesReceived(payload.new.number_of_votes_received);
        })
        .subscribe();
    }

    setupVoteCountSubscription();
  }, [router.query.poll_id]);

  async function stopPollAcceptingVotes() {
    setStoppingPoll(true);
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
                <title>Poll Status: {pollData.node.title}</title>
              </Head>
              <div className="text-center">
                <div className="text-2xl text-zinc-500 mb-7 font-light">
                  {numberOfVotesReceived
                    ? numberOfVotesReceived
                    : pollData.node.numberOfVotesReceived}{" "}
                  Response(s) Received
                </div>
                <h1 className="text-4xl font-medium max-w-md mb-6 mx-auto">
                  {pollData.node.title}
                </h1>
              </div>
              {pollData.node.acceptingVotes ? (
                <>
                  <div className="flex-1">
                    <div className="mx-auto w-min">
                      <LinkCopyComponent id={pollData.node.pollId} />
                    </div>
                    <div className="w-56 mx-auto">
                      <Image src={StatusPageImage1} alt="" placeholder="blur" />
                    </div>
                  </div>
                  <div className="mt-4 w-max mx-auto">
                    <button
                      className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2 mx-auto flex w-max"
                      onClick={() => stopPollAcceptingVotes()}
                    >
                      {stoppingPoll ? (
                        <>
                          <span>
                            <SpinningIcon />
                          </span>{" "}
                          Ending your poll
                        </>
                      ) : (
                        "End poll and view results"
                      )}
                    </button>
                  </div>
                </>
              ) : pollVoteRatings ? (
                <>
                  <div className="mt-8  w-full max-w-2xl mx-auto">
                    <div className="text-3xl font-bold text-center mt-4 mb-12">
                      Poll <br /> Results
                    </div>
                    <div className="grid grid-cols-3 h-min gap-7">
                      {[1, 2, 3].map((num) => (
                        <div
                          key={num}
                          className="flex flex-col border border-gray-200 px-4 py-4 text-xl rounded-lg hover:bg-gray-50"
                        >
                          <div className="text-3xl mr-2">{num}</div>
                          <div className="h-6"></div>
                          <div className="text-lg text-gray-600">
                            {pollVoteRatings[num]} vote(s)
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-6 h-min gap-7 mt-7">
                      <div></div>
                      {[4, 5].map((num) => (
                        <div
                          key={num}
                          className="col-span-2 flex flex-col border border-gray-200 px-4 py-4 text-xl rounded-lg hover:bg-gray-50"
                        >
                          <div className="text-3xl mr-2">{num}</div>
                          <div className="h-6"></div>
                          <div className="text-lg text-gray-600">
                            {pollVoteRatings[num]} vote(s)
                          </div>
                        </div>
                      ))}
                      <div></div>
                    </div>
                    <div className="border-b w-full my-24"></div>
                    <div className="">
                      <h2 className="text-3xl font-bold mb-4 pl-6 text-center mb-20">
                        Feedback <br /> responses
                      </h2>
                      {pollVoteComments.length != 0 ? (
                        <div className="max-w-xl mx-auto w-full">
                          {pollVoteComments.map((comment) => (
                            <div className="px-6 mb-9 text-lg" key={comment}>
                              {comment}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="pl-6 text-center">
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
            <div className="w-min mx-auto">
              <LoadingIndicator text="Getting your poll status ready" />
            </div>
          )}
        </div>
      </>
    </AppLayout>
  );
}

// TODO: Add textarea component after installing tailwincss/forms
