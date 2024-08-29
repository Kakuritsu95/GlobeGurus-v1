import useGuides from "../../hooks/useGuides";
import GuideListItem from "./GuideListItem";

function GuideList() {
  const { guides, isError } = useGuides();

  if (isError)
    return <p>There was an error loading guides, please try again later</p>;
  if (!guides) return null;

  return (
    <ul className="relative space-y-1">
      {guides.map((guide) => (
        <GuideListItem key={guide._id} guide={guide} />
      ))}
    </ul>
  );
}

export default GuideList;
