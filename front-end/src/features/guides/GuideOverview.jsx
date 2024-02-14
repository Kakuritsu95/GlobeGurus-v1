import { mockDataGuide } from "../../mockData";
import AccordionText from "../../ui/AccordionText";
import { RxDotsVertical } from "react-icons/rx";
function GuideOverview() {
  const { title, description, teritory, imgUrl } = mockDataGuide;
  return (
    <div className="max-h-70 col-span-3 overflow-auto px-5 pt-6 shadow md:col-span-1  md:row-span-full md:row-start-1 md:px-10 md:pt-10 ">
      <div className="relative flex items-center space-x-4 ">
        <img src={imgUrl} className="h-20 w-20 rounded-full" />
        <div>
          <h4 className="text-base font-normal underline">{teritory}</h4>
          <p className="text-sm font-thin">Locations:17</p>
        </div>
        <RxDotsVertical className="absolute right-0 top-0 text-lg md:text-2xl" />
      </div>
      <div>
        <h3 className="my-4 font-semibold">{title}</h3>
        <AccordionText>{description}</AccordionText>
      </div>
    </div>
  );
}

export default GuideOverview;
