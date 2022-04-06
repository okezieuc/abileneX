import RightIcon from "../icons/rightIcon";

export default function PollListItem() {
  return (
    <div className="w-full flex flex-col h-40 bg-gray-50 rounded-xl px-4 py-4">
      <div className="flex-1"></div>
      <div>
        <div className="flex items-end">
          <div className="flex-1 text-2xl">Should we build an anonymous voting app?</div>
          <div>
            <RightIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
