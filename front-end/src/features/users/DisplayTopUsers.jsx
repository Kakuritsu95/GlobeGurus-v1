import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { userService } from "../../services/services";
import Avatar from "./Avatar";
function DisplayTopUsers() {
  const { data: users } = useQuery({
    queryKey: ["topUsers"],
    queryFn: userService.getTopUsers,
  });
  if (!users) return null;
  return (
    <div className="w-96 rounded-lg border-2 bg-gray-700 ">
      <h3 className="mt-3 text-center font-bold text-gold">OUR TOP GURUS</h3>
      <ul className="space-y-5 px-2 py-5 text-gray-100 ">
        <div className="mx-2 my-2 flex rounded bg-gray-600 py-3">
          {users.slice(0, 2).map((user, i) => {
            return (
              <li
                className="mx-auto flex flex-col space-y-0.5 text-center"
                key={i}
              >
                <div className="mx-auto">
                  <Avatar avatarUrl={user.owner.avatarUrl} />
                </div>
                <Link
                  to={`/guides/user/${user.owner._id}`}
                  className="font-semibold hover:underline"
                >
                  {user.owner.username}
                </Link>
                <span>{user.points}</span>
              </li>
            );
          })}
        </div>
        <div>
          {users.slice(2).map((user, i) => {
            return (
              <li
                className="mx-2 my-3 flex items-center justify-between rounded bg-gray-600 px-10 py-2"
                key={i}
              >
                <Avatar avatarUrl={user.owner.avatarUrl} />
                <Link
                  to={`/guides/user/${user.owner._id}`}
                  className="hover:underline"
                >
                  {user.owner.username}
                </Link>
                <span>{user.points}</span>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
}

export default DisplayTopUsers;
