import { useMutation, useQueryClient } from "@tanstack/react-query";
import { guideService, placeService } from "../services/services";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "./Button";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserId } from "../redux/slices/userSlice";

function ConfirmDelete({ name, placeId, guideId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userId = useSelector(getUserId);
  const { mutate: deleteHandler, isPending: isDeleting } = useMutation({
    mutationFn: placeId ? placeService.delete : guideService.delete,
    onSuccess: placeId
      ? () => queryClient.invalidateQueries({ queryKey: ["guide"] })
      : () => {
          queryClient.invalidateQueries({ queryKey: ["userGuides"] });
          navigate(`/guides/${userId}`);
        },
  });

 
  return (
    <div className="rounded-lg bg-white p-4 text-center align-middle shadow sm:p-12 ">
      <RiDeleteBin6Line size={50} className="mx-auto mb-3.5  text-gray-600" />
      <p className=" font-semibold text-black">{`Are you sure you want to delete ${placeId ? "place" : "guide"}`}</p>
      <p className="mb-4 mt-2 text-lg font-semibold">
        {`${name.toUpperCase()}`} ?
      </p>
      <div className="flex items-center justify-center space-x-4">
        <Modal.Close>
          <div>
            <Button disabled={isDeleting} type="cancel">
              No, cancel
            </Button>
          </div>
        </Modal.Close>
        <Button
          handleClick={() => deleteHandler({ guideId, placeId })}
          disabled={isDeleting}
          type="danger"
        >
          Yes, i'm sure
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
