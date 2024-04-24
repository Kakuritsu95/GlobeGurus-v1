import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RxDotsHorizontal } from "react-icons/rx";
import { guideService } from "../services/services";
import CommentForm from "./CommentForm";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
function CommentListItem({ comment, userId, isEdit, onSetCommentId, guideId }) {
  const queryClient = useQueryClient();
  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: ({ guideId, commentId }) =>
      guideService.deleteComment({ guideId, commentId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["guides"] }),
  });
  const userOwnsComment = userId === comment.commenter._id;
  return (
    <li className="flex w-full items-center space-x-2 space-y-5 py-0.5">
      <img className="h-8 w-8" src={comment.commenter.avatarUrl} alt="avatar" />
      <div
        className={`${isEdit && "w-full"} rounded-lg bg-slate-300 p-2 text-start`}
      >
        <h5 className="text-xs font-semibold text-gray-900 hover:cursor-pointer hover:text-blue-800 hover:underline">
          {comment.commenter.username}
        </h5>
        {isEdit ? (
          <CommentForm
            defaultCommentValue={comment.comment}
            commentId={comment._id}
            guideId={guideId}
            onSetCommentId={onSetCommentId}
          />
        ) : (
          <p className="overflow-hidden whitespace-normal break-all">
            {comment.comment}
          </p>
        )}
        {isEdit && (
          <button
            onClick={() => onSetCommentId("")}
            className="pl-1 text-xs font-medium text-blue-700 hover:underline"
          >
            decline
          </button>
        )}
      </div>
      {userOwnsComment && (
        <div className="text-sm ">
          <Dropdown position="relative">
            <Dropdown.Toggle>
              <button className="rounded-full p-1.5 hover:bg-zinc-200">
                <RxDotsHorizontal size={17} />
              </button>
            </Dropdown.Toggle>
            <Dropdown.List position="-left-20 top-8" size="small">
              <DropdownItem
                type="button"
                isPending={isPending}
                handleClick={() =>
                  deleteComment({ guideId, commentId: comment._id })
                }
              >
                Delete
              </DropdownItem>
              <DropdownItem
                type="button"
                handleClick={() => onSetCommentId(comment._id)}
              >
                Edit
              </DropdownItem>
            </Dropdown.List>
          </Dropdown>
        </div>
      )}
    </li>
  );
}

export default CommentListItem;
