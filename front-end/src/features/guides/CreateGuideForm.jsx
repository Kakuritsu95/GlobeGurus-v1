import { useForm } from "react-hook-form";
import createGuide from "../../services/createGuide";
import Button from "../../ui/Button";
function CreateGuideForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit(data) {
    createGuide(data);
  }
  return (
    <form
      className="rounded bg-zinc-100 px-9 py-9 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className=" border-b pb-4 text-lg font-semibold text-zinc-900 dark:text-white">
        Create New Guide
      </h3>
      <div className="my-5">
        <label
          htmlFor="territory"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base dark:text-white"
        >
          Choose your guide's territory
        </label>
        <input
          type="text"
          id="territory"
          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="E.g Paris"
          {...register("territory")}
        />
      </div>
      <div className="my-7">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base dark:text-white"
        >
          Choose your guide's Title
        </label>
        <input
          type="text"
          id="title"
          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Guide's title..."
          {...register("title")}
        />
      </div>
      <div>
        <label
          htmlFor="guideImage"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base dark:text-white"
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
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base dark:text-white"
        >
          Short description
        </label>
        <textarea
          id="description"
          rows="3"
          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Guide summary..."
          {...register("description")}
        />
      </div>
      <Button>Submit</Button>
    </form>
  );
}

export default CreateGuideForm;
