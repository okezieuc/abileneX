import AppLayout from "@components/dashboard/appLayout";
import CreatePollStep from "@components/dashboard/create/createPollStep";

export default function CreatePollPage() {
  return (
    <AppLayout>
      <div className="py-16">
        <div>
          <div className="text-2xl text-zinc-500 mb-7 font-light">Awesome!</div>
          <h1 className="text-4xl font-medium max-w-md mb-6">
            Let’s get started getting feedback on your ideas.
          </h1>
          <div className="bg-zinc-800 rounded-full text-white text-md w-max px-6 py-2">
            Create Poll
          </div>
        </div>
        <div className="mt-16">
            <CreatePollStep />
            <CreatePollStep />
        </div>
      </div>
    </AppLayout>
  );
}
