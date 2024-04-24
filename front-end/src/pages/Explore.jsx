import UserGuidesList from "../features/guides/UserGuidesList";

import useFeedGuides from "../hooks/useFeedGuides";
function Explore() {
  const { feedGuides } = useFeedGuides();
  console.log(feedGuides);
  return (
    <div className="container mx-auto ">
      <div className="h-full overflow-y-scroll">
        <UserGuidesList userGuides={feedGuides} />
      </div>
    </div>
  );
}

export default Explore;
