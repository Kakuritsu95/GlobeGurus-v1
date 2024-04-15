import UserGuideListItem from "./UserGuideListItem";
import CommentsList from "../../ui/CommentsList";
import CommentForm from "../../ui/CommentForm";
function CommentGuideWindow({ guide }) {
  return (
    <div className="relative max-h-[80vh] overflow-y-scroll rounded sm:w-[50vw] xl:w-[35vw]">
      <UserGuideListItem guide={guide} opensAsCommentWindow={true} />
      <CommentsList comments={guide.comments} />
      <CommentForm guideId={guide._id} />
    </div>
  );
}

export default CommentGuideWindow;
