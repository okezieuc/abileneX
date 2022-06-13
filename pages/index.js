import { Auth } from "@supabase/ui";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import AppLayout from "@components/dashboard/appLayout";
import Link from "next/link";
import Image from "next/image";
import LoggedInImage from "../public/girl-looking-at-laptop.png";

const LoginPage = () => {
  const { user, error } = useUser();

  return (
    <AppLayout>
      <div className="grid grid-cols-2 items-center">
        <div className="min-h-screen flex flex-col pr-8">
          <div className="flex-1"></div>
          <h1 className="text-3xl font-semibold text-left">
            <div>Join</div>
            <div className="text-5xl mt-4 font-bold text-sky-600">AbileneX</div>
          </h1>
          <p className="mt-8 text-lg">
            AbileneX is a free tool that creates sharable voting links for you
            to get feedback on your ideas before you start building. AbileneX
            lets you build with confidence.
          </p>
          <p className="my-2 text-lg">
            Read{" "}
            <a
              className="underline hover:text-sky-600"
              href="https://github.com/okezieuc/abilenex#the-whitepaper"
            >
              our whitepaper
            </a>{" "}
            to learn more.
          </p>
          <div className="flex-1"></div>
        </div>
        <div>
          {!user ? (
            <Auth
              supabaseClient={supabaseClient}
              providers={["google"]}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
              redirectTo="https://3000-okezieuc-abilenex-mh2ogarglzn.ws-eu47.gitpod.io"
            />
          ) : (
            <>
              <div className="text-3xl text-center font-semibold">
                {"You're set"}
              </div>
              <div className="w-56 mx-auto my-4">
                <Image src={LoggedInImage} alt="" placeholder="blur" />
              </div>
              <div className="text-md text-center mb-4 text-gray-700 max-w-xs mx-auto">
                Click the button below to go to your dashboard
              </div>
              <div className="w-max mx-auto">
                <Link href="/dash">
                  <a className="bg-zinc-800 hover:bg-sky-700 active:bg-sky-800 rounded-full text-white text-md w-max px-8 py-2 mx-auto flex w-max">
                    Return to my Dashboard
                  </a>
                </Link>
                <button
                  onClick={() => supabaseClient.auth.signOut()}
                  className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-full text-white text-md w-full px-8 py-2 text-center mt-2"
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
