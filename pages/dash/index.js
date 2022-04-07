import AppLayout from "@components/dashboard/appLayout";
import PollListItem from "@components/dashboard/dash/pollListItem";
import SearchIcon from "@components/dashboard/icons/searchIcon";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { user, error } = useUser();
  const [pollListData, setPollListData] = useState(null);

  useEffect(() => {
    async function loadPollListData() {
      const { data } = await supabaseClient
        .from("polls")
        .select("title, poll_id, accepting_votes");
      setPollListData(data);

      console.log("loaded poll data");
    }

    if (user) loadPollListData();
  }, [user]);

  return (
    <AppLayout>
      <div className="py-16">
        <div>
          <div className="text-2xl text-zinc-500 mb-7 font-light">Hi John</div>
          <h1 className="text-4xl font-medium max-w-md mb-6">
            It’s time to build with confidence. Create a poll.
          </h1>
          <Link href="/dash/create">
            <a className="bg-zinc-800 hover:bg-zinc-900 active:bg-black rounded-full text-white text-md w-max px-6 py-2">
              Create Poll
            </a>
          </Link>
        </div>
        <div className="flex items-center mt-16">
          <div>
            <SearchIcon />
          </div>
          <div className="ml-2 text-zinc-400">Search</div>
          <div className="flex-1"></div>
          <div className="text-sm">4 results</div>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8">
          {pollListData
            ? pollListData.map((poll) => (
                <PollListItem
                  title={poll.title}
                  id={poll.poll_id}
                  acceptingVotes={poll.accepting_votes}
                />
              ))
            : "Loading poll data"}
        </div>
      </div>
    </AppLayout>
  );
}
