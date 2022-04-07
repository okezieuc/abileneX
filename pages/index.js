import AppLayout from "@components/dashboard/appLayout";
import Header from "@components/header";
import Image from "next/image";

export default function IndexPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center space-y-12">
        <Header />
        <Image
          src="/team-of-critters.svg"
          alt="Four one-eyed aliens playing"
          width={576}
          height={429.734}
          priority
        />

        <h2 className="p-3 font-bold bg-yellow-300 md:text-2xl">
          Hi! Welcome to your first Next.js site.
        </h2>
      </div>
    </AppLayout>
  );
}
