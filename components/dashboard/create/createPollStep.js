export default function CreatePollStep() {
  return (
    <div className="flex gap-4 mb-12">
      <div className="px-4 py-2 h-min rounded-full bg-sky-700">1</div>
      <div className="max-w-xl">
        <div className="text-2xl mb-4">What are we voting on?</div>
        <div>
          <div className="text-zinc-500 text-xl mb-4">
            e.g. Should we build an anonymous voting app for young startup
            founders?
          </div>
        </div>
        <div>
          <div className="bg-zinc-800 rounded-full text-white text-md w-max px-8 py-2">
            Proceed
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: Install TailwindCSS form library and replace the div component with a text component
