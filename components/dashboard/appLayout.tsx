import React, { ReactNode } from "react";
import Link from "next/link";
import HomeIcon from "./icons/homeIcon";
import SettingsIcon from "./icons/settingsIcon";
import RightSectionContextMenuImage from "../../public/cactus-in-pot.png";
import Image from "next/image";
import PlusIcon from "./icons/plusIcon";
import BarChartIcon from "./icons/barChartIcon";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import AbileneXLogoIcon from "./icons/ablieneXLogoIcon";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, error } = useUser();

  return (
    <div className="flex">
      <div className="w-28 h-screen bg-zinc-100 px-6 py-9 flex flex-col sticky top-0">
        <Link href="/">
          <a className="w-24 -mx-4 fill-sky-700 hover:fill-sky-900 transition-all">
            <AbileneXLogoIcon />
          </a>
        </Link>
        <div className="flex-1 w-max mx-auto h-max text-zinc-400">
          <div className="flex flex-col gap-9 h-full">
            <div className="flex-1"></div>
            <div className="">
              <ActiveLink href="/dash">
                <Link href="/dash">
                  <a>
                    <HomeIcon />
                  </a>
                </Link>
              </ActiveLink>
            </div>
            <div>
              <ActiveLink href="/dash/track/[poll_id]">
                <BarChartIcon />
              </ActiveLink>
            </div>
            <div>
              <ActiveLink href="/dash/create">
                <Link href="/dash/create">
                  <a>
                    <PlusIcon />
                  </a>
                </Link>
              </ActiveLink>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
        <div className="w-max mx-auto text-zinc-400">
          <ActiveLink href="/dash/settings">
            <Link href="/dash/settings">
              <a>
                <SettingsIcon />
              </a>
            </Link>
          </ActiveLink>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-7">
        <div className="col-span-5 px-16">{children}</div>
        <div className="col-span-2 h-screen bg-zinc-100 py-16 px-9 sticky top-0">
          <div className="h-full flex flex-col">
            <div className="h-28 w-28 bg-sky-400 rounded-full mx-auto mb-6 relative">
              {user ? (
                user.user_metadata.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    className="rounded-full"
                    layout="fill"
                    alt=""
                  />
                ) : (
                  <Image
                    src={`https://robohash.org/${user.id}.png`}
                    className="rounded-full"
                    layout="fill"
                    alt=""
                  />
                )
              ) : null}
            </div>
            <div className="mb-12 text-2xl text-zinc-500 text-center">
              {user && user.user_metadata.full_name
                ? user.user_metadata.full_name
                : null}
            </div>
            <div className="bg-zinc-800 text-white flex-1 rounded-xl px-8 py-8">
              <div className="h-full flex flex-col">
                <div className="text-3xl">
                  Create a poll in three quick steps.
                </div>
                <div className="flex-1"></div>
                <Link href="/dash/create">
                  <a className="bg-white hover:bg-sky-700 active:bg-sky-800 px-9 py-2 text-zinc-800 text-lg w-max rounded-full hover:text-white transition-all">
                    Create Poll
                  </a>
                </Link>
              </div>
              <div className="w-32 absolute bottom-16 -right-0 z-0">
                <Image src={RightSectionContextMenuImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * This component makes the color of a link to stand out if we are on the page that that link refers to
 */
function ActiveLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  const style: string = `${
    router.pathname === href
      ? "text-sky-700 hover:text-sky-700"
      : "text-zinc-400"
  } hover:text-zinc-600`;

  return <div className={style}>{children}</div>;
}
