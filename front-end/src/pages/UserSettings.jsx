import { useSelector } from "react-redux";
import UserEditAvatar from "../features/users/UserEditAvatar";
import UserEditDetailsForm from "../features/users/UserEditDetailsForm";

function UserSettings() {
  const {
    email,
    username,
    avatar: avatarUrl,
  } = useSelector((store) => store.user);

  return (
    <div className="mx-auto h-[80vh] w-full space-y-16 border bg-gray-50 p-6 sm:my-14 sm:w-2/3">
      <div className="flex gap-32">
        <UserEditAvatar username={username} avatarUrl={avatarUrl} />
      </div>

      {username && <UserEditDetailsForm username={username} email={email} />}
    </div>
  );
}

export default UserSettings;
