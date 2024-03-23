import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../ui/Modal";
import { guideService } from "../../services/services";
import { appendFormData } from "../../helpers/appendFormData";
import { APP_ROUTES } from "../../../constants/ROUTES";
import Button from "../../ui/Button";
function GuideAddEditForm({ guideToEdit }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { closeModal } = useModalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: guideToEdit });
  const { mutate: createEditGuide, isPending: isLoading } = useMutation({
    mutationFn: guideToEdit ? guideService.patch : guideService.create,
    onSuccess: guideToEdit
      ? () => {
          queryClient.invalidateQueries({ queryKey: ["guide"] });
          closeModal();
        }
      : (guideId) => {
          navigate(`/${APP_ROUTES.GUIDE_EDIT}/${guideId}`);
          closeModal();
        },
  });

  function onSubmit(data) {
    data.guideImage = data.guideImage[0];
    const formData = appendFormData(data);
    const guideId = guideToEdit?.guideId;

    createEditGuide({ formData, guideId });
  }

  return (
    <form
      className="rounded bg-zinc-100 px-9 py-9 text-start shadow-md xl:w-[700px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className=" border-b pb-4 text-lg font-semibold text-zinc-900">
        {guideToEdit
          ? `Edit Guide: ${guideToEdit.territory} `
          : "Create New Guide"}
      </h3>
      <div className="my-5">
        <label
          htmlFor="territory"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base"
        >
          Choose your guide's territory
        </label>
        <input
          type="text"
          id="territory"
          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base"
          placeholder="E.g Paris"
          {...register("territory")}
        />
      </div>
      <div className="my-7">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base"
        >
          Choose your guide's Title
        </label>
        <input
          type="text"
          id="title"
          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base "
          placeholder="Guide's title..."
          {...register("title")}
        />
      </div>
      <div>
        <label
          htmlFor="guideImage"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base"
        >
          Add an image for your guide
        </label>
        <input
          type="file"
          id="guideImage"
          className="inline w-full"
          {...register("guideImage")}
        />
      </div>
      <div className="my-7">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base"
        >
          Short description
        </label>
        <textarea
          id="description"
          rows="3"
          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base "
          placeholder="Guide summary..."
          {...register("description")}
        />
      </div>
      <Button disabled={isLoading}>Submit</Button>
    </form>
  );
}

export default GuideAddEditForm;
