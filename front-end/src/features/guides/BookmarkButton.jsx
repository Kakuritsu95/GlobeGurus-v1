import { userService } from "../../services/services";
import { BsBookmarkStar } from "react-icons/bs";
import { BsBookmarkStarFill } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import GuideActionButton from "./GuideActionButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleLocalBookmark } from "../../redux/slices/userSlice";
function BookmarkButton({ guideId }) {
  const { bookmarks: localBookmarks } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const isGuideBookmarked = localBookmarks?.includes(guideId);

  const { mutate: toggleBookmark, isPending: isSubmitting } = useMutation({
    mutationFn: () => userService.toggleBookmark(guideId),
    onMutate: () => {
      dispatch(toggleLocalBookmark(guideId));
    },
  });

  return (
    <GuideActionButton handleClick={toggleBookmark} isSubmitting={isSubmitting}>
      {isGuideBookmarked ? (
        <BsBookmarkStarFill
          className={isSubmitting && "animate-bookmark"}
          color="blue"
          size={22}
        />
      ) : (
        <BsBookmarkStar
          className={isSubmitting && "animate-bookmark"}
          size={22}
        />
      )}
      <span className="hidden sm:inline">Bookmark</span>
    </GuideActionButton>
  );
}

export default BookmarkButton;
