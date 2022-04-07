import AppLayout from "@components/dashboard/appLayout";

export default function TrackPollPage() {
  return (
    <AppLayout>
      <div className="flex my-16 flex-col min-h-[75%]">
        <div className="text-center">
          <div className="text-2xl text-zinc-500 mb-7 font-light">
            12 Responses Received
          </div>
          <h1 className="text-4xl font-medium max-w-md mb-6 mx-auto">
            Should we build an anonymous voting app for young startup founders?
          </h1>
        </div>
        <div className="flex-1"></div>
        <div className="mt-12">
          <div className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2 mx-auto">
            End poll and view results
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// TODO: Add textarea component after installing tailwincss/forms
