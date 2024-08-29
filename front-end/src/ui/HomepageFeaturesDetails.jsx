import { useState } from "react";
import { HOME_PAGE_FEATURES_PRESENTATION } from "../../constants/homePageText";
import Button from "./Button";
function HomepageFeaturesDetails({ observedSectionIndex }) {
  const [tabIndex, setTabIndex] = useState(0);

  function changeTabIndex(index) {
    setTabIndex(index);
  }
  return (
    <section
      className={`observable h-[91vh] pt-28 ${observedSectionIndex > 2 && "animate-fadeIn"}`}
    >
      <div className="mx-auto w-11/12 space-y-5 text-center sm:w-8/12 xl:w-5/12 xl:text-start">
        <h4 className="font-semibold text-blue-500">FUNCTIONALITIES</h4>
        <p className="text-3xl font-semibold text-gray-600">
          Explore our key features.
        </p>
      </div>
      <div className=" relative mx-auto mt-20 w-11/12 bg-white py-5 md:w-9/12 xl:w-1/2">
        <div className="flex -translate-y-11 justify-around gap-5">
          {HOME_PAGE_FEATURES_PRESENTATION.map((section, i) => (
            <div
              className={
                tabIndex === i ? "-translate-y-2 duration-300" : " duration-300"
              }
              key={i}
            >
              <Button
                handleClick={() => changeTabIndex(i)}
                type="landingButton"
                bgColor={section.btnColor}
              >
                <span className="font-bold">0{i + 1} </span>
                {section.btnText}
              </Button>
            </div>
          ))}
        </div>
        <div className="h-64  md:h-52 xl:h-44">
          <div className="mx-auto flex w-10/12">
            <div>
              <h3 className="text-xl font-semibold">
                {HOME_PAGE_FEATURES_PRESENTATION[tabIndex].header}
              </h3>
              <p className="mt-5">
                {HOME_PAGE_FEATURES_PRESENTATION[tabIndex].paragraph}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepageFeaturesDetails;
