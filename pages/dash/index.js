import AppLayout from "@components/dashboard/appLayout";
import PollListItem from "@components/dashboard/dash/pollListItem";
import SearchIcon from "@components/dashboard/icons/searchIcon";
import SpinningIcon from "@components/dashboard/icons/spinningIcon";
import LoadingIndicator from "@components/dashboard/loadingIndicator";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DashBoardImage from "../../public/girl-sitting-at-computer.png";

export default function Dashboard() {
  const { user, error } = useUser();
  const [pollListData, setPollListData] = useState(null);

  useEffect(() => {
    async function loadPollListData() {
      const { data } = await supabaseClient
        .from("polls")
        .select("title, poll_id, accepting_votes");
      setTimeout(() => setPollListData(data), 1500);

      console.log("loaded poll data");
    }

    if (user) loadPollListData();
  }, [user]);

  return (
    <AppLayout>
      <div className="py-16">
        <Head>
          <title>My AbileneX Dashboard</title>
        </Head>
        <div className="relative">
          <div className="text-2xl text-zinc-500 mb-7 font-light">
            Hi, {user ? user.user_metadata.full_name : null}
          </div>
          <h1 className="text-4xl font-medium max-w-md mb-6">
            It’s time to build with confidence. Create a poll.
          </h1>
          <Link href="/dash/create">
            <a className="bg-zinc-800 hover:bg-sky-700 active:bg-sky-800 rounded-full text-white text-md w-max px-6 py-2 transition-all">
              Create Poll
            </a>
          </Link>
          <div className="w-72 absolute top-0 right-0">
            <Image src={DashBoardImage} alt="" placeholder="blur" />
          </div>
        </div>
        <div className="flex items-center mt-32">
          <div>
            <SearchIcon />
          </div>
          <div className="ml-2 text-zinc-400">Search</div>
          <div className="flex-1"></div>
          <div className="text-sm">
            {pollListData ? <>{pollListData.length} results</> : null}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8">
          {pollListData ? (
            pollListData.length != 0 ? (
              pollListData.map((poll) => (
                <PollListItem
                  title={poll.title}
                  key={poll.poll_id}
                  poll_id={poll.poll_id}
                  acceptingVotes={poll.accepting_votes}
                />
              ))
            ) : <div>You have not created any poll yet. Click <Link href="/dash/create"><a className="underline hover:text-sky-600">here</a></Link> to create your first poll. </div>
          ) : (
            <LoadingIndicator text="Please wait while we load your polls." />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
