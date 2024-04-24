import UserGuideListItem from "./UserGuideListItem";
import CommentsList from "../../ui/CommentsList";
import CommentForm from "../../ui/CommentForm";
function CommentGuideWindow({ guide }) {
  return (
    <div className="relative max-h-[80vh] divide-y-2 divide-gray-200 overflow-x-hidden overflow-y-scroll rounded sm:w-[50vw] xl:max-w-[35vw]">
      <UserGuideListItem guide={guide} opensAsCommentWindow={true} />
      <CommentsList comments={guide.comments} guideId={guide._id} />
      <CommentForm guideId={guide._id} />
    </div>
  );
}

export default CommentGuideWindow;
