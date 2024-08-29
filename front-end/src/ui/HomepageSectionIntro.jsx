function HomepageSectionIntro({ onScrollToNextSection }) {
  return (
    <section className="my-20 flex h-[91vh] w-full flex-col items-center gap-10 text-gray-700 xl:mx-auto xl:my-0 xl:w-2/3 xl:flex-row xl:justify-between xl:gap-0">
      <div className="w-full space-y-10 text-center xl:w-1/2 xl:text-start">
        <h2 className="text-4xl font-bold">
          Travel
          <div className="relative ml-3 inline-block">
            <div className="absolute -left-1.5 top-0 h-20 w-52 -skew-x-12  bg-gradient-to-br from-cyan-300 to-blue-500" />
            <span className="relative ">smarter</span>
          </div>
          <span className="ml-4">with </span>
          <div className="relative inline-block">
            <div className="absolute -left-2 top-0 h-20 w-52 -skew-x-12  bg-gradient-to-br from-blue-500 to-cyan-500" />
            <span className="relative">Custom</span>
          </div>
          <span className="ml-5">Guides</span>
        </h2>
        <h3 className="inline-block text-xl font-semibold">
          Create and discover unique travel adventures, effortlessly.
        </h3>
        <button
          onClick={onScrollToNextSection}
          className="mx-auto block border-b border-green-500 pb-0.5 font-semibold text-green-500 hover:text-green-600 xl:mx-0"
        >
          Learn more ↓
        </button>
      </div>

      <div className="relative w-full md:w-10/12 xl:w-1/2">
        <div
          className="mx-auto h-[500px] w-11/12 bg-cover bg-center bg-no-repeat xl:w-full"
          style={{ backgroundImage: `url("public/images/LPImageIntro.jpg")` }}
        />
      </div>
    </section>
  );
}

export default HomepageSectionIntro;
