import { useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { guideService } from "../services/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import Avatar from "../features/users/Avatar";
function CommentForm({
  guideId,
  defaultCommentValue,
  commentId,
  onSetCommentId,
}) {
  const { name, avatar: avatarUrl, id } = useSelector((store) => store.user);
  const ref = useRef();
  const queryClient = useQueryClient();
  const isEdit = defaultCommentValue;
  const { mutate: addEditComment, isPending: isCommenting } = useMutation({
    mutationFn: ({ guideId, commentData, commentId }) =>
      defaultCommentValue
        ? guideService.editComment({ guideId, commentData, commentId })
        : guideService.addComment({ guideId, commentData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      ref.current.value = "";
      onSetCommentId();
    },
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const comment = ref.current;
    if (comment.value.length === 0) return;
    if (comment.value === defaultCommentValue) return;

    addEditComment({
      guideId,
      commentId,
      commentData: isEdit
        ? { comment: comment.value }
        : { comment: comment.value, commenter: id },
    });
  }
  return (
    <form
      className={`${!id && "hidden"} sticky bottom-0 flex space-x-2 bg-gray-100 ${!isEdit && "p-2"}  rounded`}
      onSubmit={handleSubmit}
    >
      {!isEdit && (
        <label htmlFor="comment">
          <Avatar avatarUrl={avatarUrl} />
        </label>
      )}
      <textarea
        name="comment"
        ref={ref}
        className="w-full resize-none rounded border border-gray-300 pl-3 pt-1.5 outline-none  focus:border-gray-400"
        placeholder={isEdit ? "" : `Leave a comment as ${name}`}
        defaultValue={isEdit ? defaultCommentValue : ""}
        rows={isEdit ? 3 : 4}
        autoFocus={true}
      />
      <button
        disabled={isCommenting}
        type="submit"
        className="absolute bottom-5 right-5"
      >
        <IoMdSend
          size={isEdit ? 16 : 20}
          color={isCommenting ? "gray" : "blue"}
        />
      </button>
    </form>
  );
}

export default CommentForm;
