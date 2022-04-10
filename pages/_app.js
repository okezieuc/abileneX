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
          <title>AbileneX</title>
          <meta
            name="Description"
            content="Get honest feedback on your ideas so you can build with confidence."
          />
          <link rel="icon" type="image/x-icon" href="/logo.png"></link>
        </Head>

        <Component {...pageProps} />
      </>
    </UserProvider>
  );
}

export default MyApp;
