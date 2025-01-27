import { guideService } from "../services/services";
import GuideList from "../features/guides/GuideList";
import { useQuery } from "@tanstack/react-query";
export default function BookmarkedGuides() {
  const { data: guides } = useQuery({
    queryKey: ["bookmarked"],
    queryFn: () => guideService.getBookmarkedGuides(),
  });
  if (!guides || guides.length === 0)
    return (
      <p className="mx-auto mt-44 text-center text-xl font-bold xl:w-2/3">
        Your bookmark list is currently empty.
      </p>
    );
  return (
    <div className="flex flex-col  bg-gray-200 xl:px-96 ">
      <h1 className="mt-16 text-center text-2xl font-semibold">Bookmarked</h1>
      <GuideList guides={guides} />
    </div>
  );
}
