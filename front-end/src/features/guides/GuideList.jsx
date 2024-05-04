import useGuides from "../../hooks/useGuides";
import GuideListItem from "./GuideListItem";

function GuideList() {
  const { guides, isError } = useGuides();
  if (isError) return <p>No guides found</p>;
  if (!guides) return null;

  return (
    <ul className="h-full space-y-1 font-normal">
      {guides.map((guide) => (
        <GuideListItem key={guide._id} guide={guide} />
      ))}
    </ul>
  );
}

export default GuideList;
