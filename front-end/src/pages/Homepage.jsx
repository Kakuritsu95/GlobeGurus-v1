import { useRef, useState } from "react";
import { useEffect } from "react";

import HomepageSectionIntro from "../ui/HomepageSectionIntro";

import HomepageFeaturesSection from "../ui/HomepageFeaturesSection";
import HomepageFeaturesDetails from "../ui/HomepageFeaturesDetails";

function Homepage() {
  const featuresSectionRef = useRef(null);

  function scrollToNextSection() {
    featuresSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    function callback(entries, observer) {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        if (entry.target.classList.contains("animate-fadeIn")) return;
        entry.target.classList.add("animate-fadeIn");
      });
    }
    const observer = new IntersectionObserver(callback, observerOptions);

    document
      .querySelectorAll(".observable")
      .forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className="h-dvh overflow-y-scroll">
      <div className="flex w-full flex-col space-y-32 divide-y divide-gray-300 ">
        <HomepageSectionIntro onScrollToNextSection={scrollToNextSection} />
        <HomepageFeaturesSection featuresSectionRef={featuresSectionRef} />
        <HomepageFeaturesDetails />
      </div>
    </div>
  );
}

export default Homepage;
