import { useMutation } from "@tanstack/react-query";
import { guideService } from "../../services/services";
import GuideActionButton from "./GuideActionButton";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";

function LikeButton({ guideId, localLikes, setLocalLikes }) {
  const userId = useSelector((store) => store.user.id);
  const {
    mutate: toggleLike,
    isPending: isSubmitting,
    isSuccess,
  } = useMutation({
    mutationFn: () => {
      guideService.toggleLike(guideId);
      setLocalLikes((localLikes) => {
        if (isGuideLiked) {
          return localLikes.filter((like) => like.id === userId);
        } else return [...localLikes, userId];
      });
    },
  });

  const isGuideLiked = localLikes.includes(userId);

  return (
    <GuideActionButton handleClick={toggleLike} isSubmitting={isSubmitting}>
      {isGuideLiked ? (
        <AiFillLike
          className={isSuccess && "animate-like"}
          color="blue"
          size={25}
        />
      ) : (
        <AiOutlineLike className={isSuccess && "animate-like"} size={25} />
      )}
      <span className="hidden sm:inline">Like</span>
    </GuideActionButton>
  );
}

export default LikeButton;
