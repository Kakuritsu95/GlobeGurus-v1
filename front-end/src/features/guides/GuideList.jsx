import useGuides from "../../hooks/useGuides";
import GuideListItem from "./GuideListItem";

function GuideList() {
  const { guides } = useGuides();
  console.log(guides);
  return (
    <>
      {guides ? (
        <ul className="h-full space-y-1 font-normal">
          {guides.map((guide) => (
            <GuideListItem key={guide._id} guide={guide} />
          ))}
        </ul>
      ) : (
        <p>No guides found with this id</p>
      )}
    </>
  );
}

export default GuideList;
