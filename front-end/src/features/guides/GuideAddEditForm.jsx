import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../ui/Modal";
import { geolocationService, guideService } from "../../services/services";
import { appendFormData } from "../../helpers/appendFormData";
import { APP_ROUTES } from "../../../constants/ROUTES";
import Button from "../../ui/Button";
import FormInputField from "../../ui/FormInputField";
import InputErrorMessage from "../../ui/InputErrorMessage";
function GuideAddEditForm({ guideToEdit }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { closeModal } = useModalContext();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ defaultValues: guideToEdit });

  const { mutate: createEditGuide, isPending: isLoading } = useMutation({
    mutationFn: guideToEdit ? guideService.patch : guideService.post,
    onSuccess: guideToEdit
      ? () => {
          queryClient.invalidateQueries({ queryKey: ["guide"] });
          closeModal();
        }
      : (guideId) => {
          queryClient.invalidateQueries({ queryKey: ["guides"] });
          queryClient.invalidateQueries({ queryKey: ["guide"] });
          navigate(`/${APP_ROUTES.GUIDE_EDIT}/${guideId}`);
          closeModal();
        },
  });
  async function onSubmit(data) {
    if (Object.keys(dirtyFields).length == 0) return;
    try {
      const territoryCoords = await geolocationService.getTerritoryCoords(
        data.territory,
      );
      data.territoryCoords = territoryCoords;
      data.guideImage = data.guideImage[0];
      const formData = appendFormData(data);
      const guideId = guideToEdit?.guideId;
      createEditGuide({ formData, guideId });
    } catch (err) {}
  }

  return (
    <form
      className="rounded bg-zinc-100 px-9 py-14 text-start shadow-md xl:w-[700px]"
      onSubmit={handleSubmit(onSubmit)}
      onError={() => {
        alert("Submission has failed.");
      }}
    >
      <h3 className="border-b pb-4 text-lg font-semibold text-zinc-900">
        {guideToEdit
          ? `Edit Guide: ${guideToEdit.territory} `
          : "Create New Guide"}
      </h3>

      <div className="my-5">
        <FormInputField
          labelName="territory"
          register={register}
          labelColor="text-gray-900"
          placeholder="E.g Paris"
          validationRules={{
            required: { value: true, message: "field is required" },
          }}
          errorMessage={errors?.territory?.message}
        />
      </div>
      <div className="my-7">
        <FormInputField
          labelName="title"
          register={register}
          labelColor="text-gray-900"
          placeholder="Guide's title..."
          validationRules={{
            required: { value: true, message: "field is required" },
          }}
          errorMessage={errors?.title?.message}
        />
      </div>
      <div>
        <label
          htmlFor="guideImage"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base"
        >
          Add an image for your guide
        </label>
        <InputErrorMessage>{errors?.guideImage?.message}</InputErrorMessage>
        <input
          type="file"
          id="guideImage"
          className="inline w-full"
          {...register("guideImage", {
            required: guideToEdit
              ? false
              : "Please upload an image for your guide",
          })}
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
