import { useMutation, useQueryClient } from "@tanstack/react-query";
import { guideService } from "../../services/services";
import GuideActionButton from "./GuideActionButton";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleGuideLikes } from "../../redux/slices/userSlice";

function LikeButton({ guideId, isGuideLikedByUser }) {
  const dispatch = useDispatch();

  const {
    mutate: toggleLike,
    isPending: isSubmitting,
    isSuccess,
  } = useMutation({
    mutationFn: () => {
      return guideService.toggleLike(guideId);
    },
    onSuccess: () => dispatch(toggleGuideLikes(guideId)),
  });

  return (
    <GuideActionButton handleClick={toggleLike} isSubmitting={isSubmitting}>
      {isGuideLikedByUser ? (
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
