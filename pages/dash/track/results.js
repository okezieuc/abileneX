import AppLayout from "@components/dashboard/appLayout";

export default function PollResultsPage() {
  return (
    <AppLayout>
      <div className="my-16">
        <div className="text-center">
          <div className="text-2xl text-zinc-500 mb-7 font-light">
            12 Responses Received
          </div>
          <h1 className="text-4xl font-medium max-w-md mb-6 mx-auto">
            Should we build an anonymous voting app for young startup founders?
          </h1>
        </div>
        <div className="grid grid-cols-2 max-w-md gap-4 mx-auto mt-16">
          <div>Result chart comes here</div>
          <div>
            <div className="text-2xl">
              <h2 className="font-medium">Average</h2>
              <p>4.32</p>
            </div>
            <div className="text-2xl my-4">
              <h2 className="font-medium">Average</h2>
              <p>4.32</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// TODO: Add textarea component after installing tailwincss/forms
