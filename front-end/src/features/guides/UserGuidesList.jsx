import UserGuideListItem from "./UserGuideListItem";
function UserGuidesList({ userGuides }) {
  if (userGuides)
    return (
      <ul className="my-5 space-y-1 font-normal">
        {userGuides.map((guide) => (
          <UserGuideListItem guide={guide} />
        ))}
      </ul>
    );
}

export default UserGuidesList;
