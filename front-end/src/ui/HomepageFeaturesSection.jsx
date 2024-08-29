import LazyImage from "./LazyImage";
import FeaturesDescription from "./FeaturesDescription";
import { HOME_PAGE_FEATURES } from "../../constants/homePageText";

function HomepageFeaturesSection({ observedSectionIndex, featuresSectionRef }) {
  return (
    <section ref={featuresSectionRef} className="observable pt-28">
      <div
        className={`mx-auto w-11/12 space-y-5 text-center xl:w-5/12 xl:text-start ${observedSectionIndex > 1 && "animate-fadeIn"}`}
      >
        <h4 className="font-semibold text-blue-500">FEATURES</h4>
        <p className="text-3xl font-semibold text-gray-600">
          Designed to enhance every aspect of your journey.
        </p>
      </div>
      <div className="mt-44 space-y-32">
        {HOME_PAGE_FEATURES.map((feature, i) => (
          <div
            key={i}
            className={`mx-auto flex w-11/12 flex-col justify-center space-y-10 md:w-9/12 xl:w-full xl:flex-row xl:gap-24 2xl:gap-32 ${i % 2 !== 0 && "xl:flex-row-reverse"}`}
          >
            <LazyImage imageName={feature.imageName} />
            <FeaturesDescription
              IconComponent={feature.icon}
              header={feature.header}
            >
              {feature.paragraph}
            </FeaturesDescription>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomepageFeaturesSection;
