import AppLayout from "@components/dashboard/appLayout";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1"></div>
        <div>
          <h1 className="text-left text-3xl font-medium mb-6">Settings</h1>
          <div>
            <ConnectZoomSetting />
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </AppLayout>
  );
}

function ConnectZoomSetting() {
  const { user, error } = useUser();
  const zoomLoginEnabled = false;

  async function ConnectZoomAccount() {
    const { user, session, error } = await supabaseClient.auth.signIn({
      provider: "zoom",
    });
  }

  return (
    <div className="flex items-center my-6">
      <div className="flex-1">
        <h2 className="text-xl">Connect Zoom</h2>
        <h3>This allows to create polls from the chatbox during meetings</h3>
        {zoomLoginEnabled ? null : (
          <p className="mt-2">
            * This option is disabled. Click here to learn why.
          </p>
        )}
      </div>
      <div>
        {user && user.app_metadata.providers.includes("zoom") ? (
          <div className="text-gray-600 rounded-md border border-gray-300 px-6 py-2">
            Successfully connected
          </div>
        ) : (
          <div>
            {!zoomLoginEnabled ? (
              <div className="text-gray-600 rounded-md border border-gray-300 px-6 py-2">
                Currently disabled
              </div>
            ) : (
              <button
                className="px-6 py-2 rounded-md bg-sky-700 hover:bg-sky-800 text-white"
                onClick={ConnectZoomAccount}
              >
                Connect
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
