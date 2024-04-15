import { useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { guideService } from "../services/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
function CommentForm({ guideId }) {
  const { name, avatar, id } = useSelector((store) => store.user);
  const ref = useRef();
  const queryClient = useQueryClient();
  async function handleSubmit(e) {
    e.preventDefault();
    const comment = ref.current;
    if (comment.value.length === 0) return;
    addComment({
      guideId,
      commentData: { comment: comment.value, commenter: id },
    });
  }
  const { mutate: addComment, isPending: isCommenting } = useMutation({
    mutationFn: ({ guideId, commentData }) =>
      guideService.addComment({ guideId, commentData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      ref.current.value = "";
    },
  });
  return (
    <form
      className="sticky bottom-0 flex space-x-2 bg-gray-100 p-2"
      onSubmit={handleSubmit}
    >
      <label htmlFor="comment">
        <img src={avatar} alt="avatar" className="w-9 rounded-full" />
      </label>
      <textarea
        name="comment"
        ref={ref}
        className="w-full resize-none rounded border border-gray-300 pl-3 pt-1.5 outline-none  focus:border-gray-400"
        placeholder={`Leave a comment as ${name}`}
        rows={4}
        autoFocus={true}
      />
      <button
        disabled={isCommenting}
        type="submit"
        className="absolute bottom-5 right-5"
      >
        <IoMdSend size="20" color={isCommenting ? "gray" : "blue"} />
      </button>
    </form>
  );
}

export default CommentForm;
