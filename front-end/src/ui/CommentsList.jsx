import { useState } from "react";
import { useSelector } from "react-redux";
import CommentListItem from "./CommentListItem";

function CommentsList({ comments, guideId }) {
  const [editCommentId, setEditCommentId] = useState("");

  function setCommentId(id) {
    setEditCommentId(id);
  }
  const userId = useSelector((store) => store.user.id);
  const sortedComments = !userId
    ? comments
    : comments.sort((a, b) => (a.commenter._id === userId ? -1 : 1));
  return (
    <ul className="bg-gray-100 px-3">
      {sortedComments.map((comment) => (
        <CommentListItem
          key={comment._id}
          comment={comment}
          userId={userId}
          isEdit={editCommentId === comment._id}
          onSetCommentId={setCommentId}
          guideId={guideId}
        />
      ))}
    </ul>
  );
}

export default CommentsList;
