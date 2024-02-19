function AddPlaceForm() {
  return (
    <form className="rounded bg-zinc-100 px-9 py-9 shadow-md">
      <h3 className=" border-b pb-4 text-lg font-semibold text-zinc-900 dark:text-white">
        Create New Guide
      </h3>
      <div className="my-5">
        <label
          htmlFor="guideTeritory"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base dark:text-white"
        >
          Choose your guide's territory
        </label>
        <input
          type="text"
          id="guideTeritory"
          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="E.g Paris"
          required
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
          id="password"
          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Guide's title..."
          required
        />
      </div>
      <div className="my-7">
        <label
          htmlFor="guideDescription"
          className="mb-2 block text-sm font-medium text-gray-900 md:text-base dark:text-white"
        >
          Short description
        </label>
        <textarea
          id="guideDescription"
          rows="3"
          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Guide summary..."
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full rounded bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto md:text-base dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default AddPlaceForm;
