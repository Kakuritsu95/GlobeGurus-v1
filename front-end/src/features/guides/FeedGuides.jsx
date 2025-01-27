import GuideList from "./GuideList";
import GuidePagination from "./GuidePagination";
import useGuides from "../../hooks/useGuides";
function FeedGuides() {
  const { guides, numberOfPages, isError } = useGuides();
  if (!guides) return;
  return (
    <div className="space-y-5 rounded-lg">
      <GuideList guides={guides} isError={isError} />
      <GuidePagination numberOfPages={numberOfPages} />
    </div>
  );
}

export default FeedGuides;
