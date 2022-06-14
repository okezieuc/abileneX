import Link from "next/link";
import RightIcon from "../icons/rightIcon";

type Props = {
  title: String;
  poll_id: String;
};

export default function PollListItem({
  title = "Should we build an anonymous voting app?",
  poll_id,
}: Props) {
  return (
    <div className="group w-full flex flex-col h-40 bg-zinc-100 rounded-xl px-4 py-4 hover:shadow-sm border border-zinc-200 hover:border-zinc-300 transition-all">
      <div className="flex-1"></div>
      <div>
        <div className="flex items-end gap-6">
          <Link href={`/dash/track/${poll_id}`}>
            <a className="flex-1 text-xl">{title}</a>
          </Link>
          <Link href="/dash/track">
            <a className="group-hover:text-sky-600 group-hover:translate-x-1 group-active:translate-x-2 transition-all">
              <RightIcon />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
