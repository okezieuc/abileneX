import AppLayout from "@components/dashboard/appLayout";
import DashboardHeading from "@components/dashboard/dash/dashboardHeading";
import PollListItem from "@components/dashboard/dash/pollListItem";
import SearchIcon from "@components/dashboard/icons/searchIcon";
import LoadingIndicator from "@components/dashboard/loadingIndicator";
import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabaseGraphQLClient } from "utils/supabaseGraphQLClient";

type Poll = {
  pollId: string;
  title: string;
};

type PollList = {
  pollsCollection: {
    edges: { node: Poll }[];
  };
};

export default function Dashboard() {
  const { user, accessToken } = useUser();
  const [pollListData, setPollListData] = useState<PollList | null>(null);

  useEffect(() => {
    async function loadPollListData() {
      const data = await supabaseGraphQLClient(
        `query LoadPollListData {
        pollsCollection {
          edges {
            node {
              title
              pollId
            }
          }
        }
      }`,
        {
          authorizationKey: accessToken,
        }
      );
      setTimeout(() => setPollListData(data), 1500);
    }

    if (user && accessToken) loadPollListData();
  }, [user, accessToken]);

  return (
    <AppLayout>
      <div className="py-16">
        <Head>
          <title>My AbileneX Dashboard</title>
        </Head>
        <DashboardHeading user={user} />
        <div className="flex items-center mt-32">
          <div>
            <SearchIcon />
          </div>
          <div className="ml-2 text-zinc-400">Search</div>
          <div className="flex-1"></div>
          <div className="text-sm">
            {pollListData ? (
              <>{pollListData.pollsCollection.edges.length} results</>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8">
          {pollListData ? (
            pollListData.pollsCollection.edges.length != 0 ? (
              pollListData.pollsCollection.edges.map((poll) => (
                <PollListItem
                  title={poll.node.title}
                  key={poll.node.pollId}
                  poll_id={poll.node.pollId}
                />
              ))
            ) : (
              <div>
                You have not created any poll yet. Click{" "}
                <Link href="/dash/create">
                  <a className="underline hover:text-sky-600">here</a>
                </Link>{" "}
                to create your first poll.{" "}
              </div>
            )
          ) : (
            <LoadingIndicator text="Please wait while we load your polls." />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
