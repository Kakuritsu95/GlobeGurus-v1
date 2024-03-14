import AccordionText from "../../ui/AccordionText";
import { RxDotsVertical } from "react-icons/rx";
import useGuide from "../../hooks/useGuide";
import { Link } from "react-router-dom";
function GuideOverview() {
  const { data } = useGuide();
  const guide = data || {};
  const { title, description, territory, imageUrl } = guide;

  if (guide.title)
    return (
      <div className="col-span-2 overflow-auto sm:col-span-3 sm:overflow-hidden xl:col-span-1 xl:row-span-full xl:row-start-1">
        <div className="relative flex flex-col px-5 py-1 text-sm shadow sm:mt-3 sm:h-full sm:space-y-5 sm:py-5 md:px-5 md:text-base lg:px-7 xl:py-1">
          <div className="gap-5 sm:flex sm:items-center xl:flex-col xl:items-start">
            <div className="sm:order-2 sm:w-1/2 xl:w-full">
              <h4 className="text-lg font-bold sm:text-lg md:text-xl 2xl:text-2xl">
                {title}
              </h4>

              <Link className="underline">{`by ${guide.owner.username}`}</Link>
              <button>
                <RxDotsVertical className="absolute right-1 top-3 text-lg md:right-3 md:top-1 md:text-2xl" />
              </button>
              <div>
                <span className="font-thin">{`Locations: ${data.places.length}`}</span>
              </div>
            </div>
            <div className="max-w-76 relative sm:w-1/2  xl:order-2 xl:w-full">
              <img src={imageUrl} className="rounded-l" />
              <h4 className="sm:text absolute left-3 top-1 text-sm font-semibold text-white sm:text-lg">
                {territory}
              </h4>
            </div>
          </div>
          <div className="">
            <div className="font-semibold sm:text-base">About </div>
            <AccordionText>{description}</AccordionText>
          </div>
        </div>
      </div>
    );
}

export default GuideOverview;
