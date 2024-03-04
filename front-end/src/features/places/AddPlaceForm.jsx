import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import DisplayAddPlaceType from "./DisplayAddPlaceType";
import { useNearbyPlaces } from "./NearbyPlacesProvider";
function AddPlaceForm() {
  const { selectedPlace, clickedCoords } = useNearbyPlaces();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: selectedPlace,
  });

  function onSubmit(data) {
    const formData = new FormData();

    for (const prop in data) {
      formData.append(prop, data[prop]);
    }
    fetch("http://localhost:7000/try", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded bg-zinc-100 p-5 shadow-md md:p-9 "
    >
      <h3 className="border-b pb-4 text-lg font-semibold text-zinc-900">
        {`Add ${selectedPlace.name ? selectedPlace.name : "place"}`}
      </h3>
      <DisplayAddPlaceType register={register} />
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base"
        >
          Place name
        </label>
        <span className="font-thin text-red-400">{errors?.name?.message}</span>
        <input
          type="text"
          id="name"
          className="w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base"
          {...register("name", { required: "name is required" })}
        />
      </div>
      <div>
        <label
          htmlFor="address"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base"
        >
          Place address
        </label>
        <span className="font-thin text-red-400">
          {errors?.address?.message}
        </span>
        <input
          type="text"
          id="address"
          className="w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base"
          placeholder="Guide's title..."
          {...register("address", { required: "address is required" })}
        />
      </div>
      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-900 sm:text-base "
          htmlFor="imageFile"
        >
          Image file
        </label>
        <input
          className="w-full cursor-pointer rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
          id="imageFile"
          type="file"
          {...register("imageFile")}
        />
        <div className="mt-1 text-sm text-gray-500">
          {`Upload a picture of ${selectedPlace.length > 0 ? selectedPlace.name : "the place"} for your guide to help other users`}
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
      <Button>Submit</Button>
    </form>
  );
}

export default AddPlaceForm;
