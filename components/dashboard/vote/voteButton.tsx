type Props = {
  number: number;
  ideaVoteRating: number;
  setIdeaVoteRating: (number: number) => void;
};

export default function VoteButton({
  number,
  ideaVoteRating,
  setIdeaVoteRating,
}: Props) {
  return (
    <button
      className={`${
        ideaVoteRating == number
          ? "bg-sky-700 border-sky-700 text-white"
          : " border-zinc-700 text-zinc-700"
      }  border px-8 py-3 rounded-full w-min transition-all active:bg-sky-800 active:text-white`}
      onClick={() => setIdeaVoteRating(number)}
    >
      {number}
    </button>
  );
}
