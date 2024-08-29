import UserGuidesWindow from "../features/guides/UserGuidesWindow";
function UserGuides() {
  return (
    <div className="h-full bg-slate-500 ">
      <div className="mx-auto h-full overflow-y-scroll bg-zinc-50 p-5 shadow-lg md:w-2/3 2xl:w-1/3">
        <UserGuidesWindow />
      </div>
    </div>
  );
}

export default UserGuides;
