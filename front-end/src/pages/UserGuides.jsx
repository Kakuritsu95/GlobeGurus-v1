import UserGuidesWindow from "../features/guides/UserGuidesWindow";
import useGuides from "../hooks/useGuides";
function UserGuides() {
  // const { guides } = useGuides();
  // console.log(guides);
  // if (guides?.length == 0) return null;
  // else
  return (
    <div className="h-full bg-slate-500 ">
      <div className="mx-auto h-full overflow-y-scroll bg-zinc-50 p-5 shadow-lg md:w-2/3 2xl:w-1/3">
        <UserGuidesWindow />
      </div>
    </div>
  );
}

export default UserGuides;
