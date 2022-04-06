import HomeIcon from "./icons/homeIcon";
import InboxIcon from "./icons/inboxIcon";
import SettingsIcon from "./icons/settingsIcon";
import UserIcon from "./icons/userIcon";

export default function AppLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-28 h-screen bg-zinc-50 px-6 py-9 flex flex-col">
        <div>
          <AbileneXLogo />
        </div>
        <div className="flex-1 w-max mx-auto h-max text-zinc-400">
          <div className="flex flex-col gap-9 h-full">
            <div className="flex-1"></div>
            <div className="text-sky-700">
              <HomeIcon />
            </div>
            <div>
              <InboxIcon />
            </div>
            <div>
              <UserIcon />
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
        <div className="w-max mx-auto">
          <span className="text-zinc-400">
            <SettingsIcon />
          </span>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-7">
        <div className="col-span-5">{children}</div>
        <div className="col-span-2 h-screen bg-zinc-50">Right side</div>
      </div>
    </div>
  );
}

function AbileneXLogo() {
  return (
    <div className="bg-sky-700 px-6 py-5 rounded-full font-bold text-white">
      aX
    </div>
  );
}
