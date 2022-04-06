import "../css/index.css";
import Head from "next/head";
import Layout from "@components/layout";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <>
        <Head>
          <title>Next.js Starter Tailwind</title>
          <meta
            name="Description"
            content="A Next.js starter styled using Tailwind CSS."
          />
        </Head>

        <Component {...pageProps} />
      </>
    </UserProvider>
  );
}

export default MyApp;
