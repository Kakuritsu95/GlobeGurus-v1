import { userService } from "../../services/services";
import { useState } from "react";
import { BsBookmarkStar } from "react-icons/bs";
import { BsBookmarkStarFill } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import GuideActionButton from "./GuideActionButton";
import { useEffect } from "react";

function BookmarkButton({ guideId }) {
  const [localBookmarks, setLocalBookmarks] = useState([]);

  useEffect(() => {
    async function getUserBookmarks() {
      const data = await userService.getUserBookmarks();
      setLocalBookmarks(data?.bookmarks);
    }
    return () => getUserBookmarks();
  }, []);
  const isGuideBookmarked = localBookmarks?.includes(guideId);

  const { mutate: toggleBookmark, isPending } = useMutation({
    mutationFn: () => userService.toggleBookmark(guideId),

    onMutate: () => {
      if (localBookmarks.includes(guideId))
        setLocalBookmarks(localBookmarks.filter((id) => id !== guideId));
      else setLocalBookmarks([...localBookmarks, guideId]);
    },
  });
  return (
    <GuideActionButton handleClick={toggleBookmark}>
      {isGuideBookmarked ? (
        <BsBookmarkStarFill
          className={isPending && "animate-bookmark"}
          color="blue"
          size={22}
        />
      ) : (
        <BsBookmarkStar className={isPending && "animate-bookmark"} size={22} />
      )}
      <span className="hidden sm:inline">Bookmark</span>
    </GuideActionButton>
  );
}

export default BookmarkButton;
