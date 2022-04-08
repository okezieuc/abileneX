import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useEffect, useState } from "react";
import AppLayout from "@components/dashboard/appLayout";

const LoginPage = () => {
  const { user, error } = useUser();
  // const [data, setData] = useState();
  /*
  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*');
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);
  */
  if (!user)
    // max-w-lg mx-auto border mt-12 p-6 rounded-lg
    return (
      <AppLayout>
        <div className="grid grid-cols-2 items-center">
          <div className="min-h-screen flex flex-col pr-8">
            <div className="flex-1"></div>
            {error && <p>{error.message}</p>}
            <h1 className="text-3xl font-semibold text-left">
              <div>Join</div> <div className="text-5xl mt-4 font-bold text-sky-600">AbileneX</div>
            
          </h1>
          <p className="mt-8 text-lg">AbileneX creates sharable voting links for you to get feedback on your ideas before you start building. AbileneX lets you build with confidence.</p>
            <div className="flex-1"></div>
          </div>
          <Auth
            supabaseClient={supabaseClient}
            providers={["google"]}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      </AppLayout>
    );

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default LoginPage;
