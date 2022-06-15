import Link from "next/link";
import Image from "next/image";
import DashboardImage from "../../../public/girl-sitting-at-computer.png";
import type { User } from "@supabase/auth-helpers-shared";

type Props = {
  user: User | null;
};

export default function DashboardHeading({ user }: Props) {
  return (
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
        <Image src={DashboardImage} alt="" placeholder="blur" />
      </div>
    </div>
  );
}
