import UserGuideListItem from "./GuideListItem";
import CommentsList from "../../ui/CommentsList";
import CommentForm from "../../ui/CommentForm";
function CommentGuideWindow({ guide, localLikesMain, setLocalLikesMain }) {
  return (
    <div className="relative max-h-[80vh] divide-y-2 divide-gray-200 overflow-x-hidden overflow-y-scroll rounded bg-gray-100 sm:w-[50vw] xl:max-w-[35vw]">
      <UserGuideListItem
        guide={guide}
        opensAsCommentWindow={true}
        localLikesMain={localLikesMain}
        setLocalLikesMain={setLocalLikesMain}
      />
      <CommentsList comments={guide.comments} guideId={guide._id} />
      <CommentForm guideId={guide._id} />
    </div>
  );
}

export default CommentGuideWindow;
