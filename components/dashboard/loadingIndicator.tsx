import SpinningIcon from "./icons/spinningIcon";

type LoadingIndicatorPropType = {
  /**
   * Text on loading indicator
   */
  text: string;
};

export default function LoadingIndicator({ text }: LoadingIndicatorPropType) {
  return (
    <div className="bg-sky-700 text-white flex gap-2 h-min px-5 py-3 w-max text-center rounded-full items-center font-semibold">
      <SpinningIcon /> {text}
    </div>
  );
}
