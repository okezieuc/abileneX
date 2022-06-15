import { useState } from "react";

type Props = {
  id: string;
};

export default function LinkCopyComponent({
  id = "abcd-1234-wxyz-5678",
}: Props) {
  // intitalize state tracker for clickeed status of copy button
  const [clickedCopy, setClickedCopy] = useState(false);
  const link: string = `https://abilenex.vercel.app/vote/${id}`;

  return (
    <div className="w-96 px-2 py-2 flex border border-zinc-500 rounded-md items-center gap-2 mb-4">
      <div className="flex-1 truncate">{link}</div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(link);
          setClickedCopy(true);
          setTimeout(() => setClickedCopy(false), 2000);
        }}
        className="px-2 bg-zinc-700 active:bg-zinc-800 rounded-md text-white py-0.5"
      >
        {clickedCopy ? "copied" : "copy"}
      </button>
    </div>
  );
}
