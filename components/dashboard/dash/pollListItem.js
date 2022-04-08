import Link from "next/link";
import RightIcon from "../icons/rightIcon";

export default function PollListItem({
  title = "Should we build an anonymous voting app?",
  poll_id,
}) {
  return (
    <div className="w-full flex flex-col h-40 bg-zinc-100 rounded-xl px-4 py-4 hover:shadow-sm border border-zinc-200 hover:border-zinc-300 transition-all">
      <div className="flex-1"></div>
      <div>
        <div className="flex items-end">
          <Link href={`/dash/track/${poll_id}`}>
            <a className="flex-1 text-2xl">{title}</a>
          </Link>
          <Link href="/dash/track">
            <a>
              <RightIcon />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
