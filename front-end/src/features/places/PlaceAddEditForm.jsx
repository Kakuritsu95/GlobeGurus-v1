import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { placeService } from "../../services/services";
import { useNearbyPlaces } from "./NearbyPlacesProvider";
import { appendFormData } from "../../helpers/appendFormData";
import { useModalContext } from "../../ui/Modal";
import Button from "../../ui/Button";
import FormInputField from "../../ui/FormInputField";
import DisplayAddPlaceType from "./DisplayAddPlaceType";

function PlaceAddEditForm({ placeToEdit }) {
  const { selectedPlace, clickedCoords } = useNearbyPlaces();
  const { guideId } = useParams();
  const queryClient = useQueryClient();
  const { closeModal } = useModalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: placeToEdit || selectedPlace,
  });

  const { mutate: addEditPlace, isPending: isLoading } = useMutation({
    mutationFn: placeToEdit ? placeService.patch : placeService.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guide"] });
      closeModal();
    },
  });
  function onSubmit(data) {
    data.coords =
      data?.coords || selectedPlace?.coords || clickedCoords.current.coords;
    data.placeImage = data.placeImage[0];

    const formData = appendFormData(data);
    addEditPlace({ guideId, placeId: data._id, formData });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-h-[700px] space-y-5 overflow-y-scroll rounded bg-zinc-100 p-5 text-start  shadow-md md:p-12 xl:w-[700px]"
    >
      <h3 className="border-b pb-4 text-lg font-semibold text-zinc-900">
        {`Add ${selectedPlace?.name ? selectedPlace.name : "place"}`}
      </h3>
      <DisplayAddPlaceType register={register} />
      <FormInputField
        labelName="name"
        labelColor="text-zinc-800"
        register={register}
        validationRules={{
          required: { value: true, message: "place name is required" },
        }}
        errorMessage={errors?.name?.message}
      />
      <FormInputField
        labelName="address"
        labelColor="text-zinc-800"
        register={register}
        validationRules={{
          required: { value: true, message: "place address is required" },
        }}
        errorMessage={errors?.address?.message}
      />

      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-900 sm:text-base "
          htmlFor="placeImage"
        >
          Image file
        </label>
        {errors?.imageFile && (
          <span className="mb-2 block text-sm font-thin text-red-500">
            {errors?.imageFile.message}
          </span>
        )}
        <input
          className="w-full cursor-pointer rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
          id="placeImage"
          type="file"
          {...register("placeImage", {
            required: {
              value: placeToEdit ? false : true,
              message: "please upload a place image",
            },
          })}
        />
        <div className="mt-1 text-sm text-gray-500">
          {`Upload a picture of ${selectedPlace?.name ? selectedPlace.name : "the place"} for your guide, to help other users`}
        </div>
      </div>
      <div className=" space-y-2">
        <label
          htmlFor="imageUrl"
          className="mb-2 text-sm font-medium text-gray-900 md:text-base"
        >
          Short description
        </label>
        <textarea
          id="description"
          rows="3"
          className="w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base"
          {...register("description")}
        />
      </div>

      <Button disabled={isLoading}>Submit</Button>
    </form>
  );
}

export default PlaceAddEditForm;
