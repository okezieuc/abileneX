import Image from "next/image";
import CreatePageImage from "../../../public/girl-working-on-laptop.png";

export default function CreatePageHeading() {
  return (
    <div className="relative">
      <div className="text-2xl text-zinc-500 mb-7 font-light">Awesome!</div>
      <h1 className="text-4xl font-medium max-w-md mb-8">
        Let’s get started getting feedback on your ideas.
      </h1>
      <div className="w-80 absolute -top-4 -right-4">
        <Image src={CreatePageImage} alt="" placeholder="blur" />
      </div>
    </div>
  );
}
