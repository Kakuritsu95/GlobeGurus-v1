import { useSelector } from "react-redux";

function CommentsList({ comments }) {
  const userId = useSelector((store) => store.user.id);
  const sortedComments = !userId
    ? comments
    : comments.sort((a, b) => (a.commenter._id === userId ? -1 : 1));
  return (
    <ul className="bg-gray-100 px-3">
      {sortedComments.map((comment) => (
        <li key={comment._id} className="flex items-center space-x-2 space-y-5">
          <img
            className="h-8 w-8"
            src={comment.commenter.avatarUrl}
            alt="avatar"
          />
          <div className="rounded-lg bg-slate-300 p-2 text-start">
            <h5 className="text-xs font-semibold text-gray-900 hover:cursor-pointer hover:text-blue-800 hover:underline">
              {comment.commenter.username}
            </h5>
            <h3 className="">{comment.comment}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentsList;
