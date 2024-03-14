import { useState } from "react";

function AccordionText({ children, wordsQuantity = 10 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const contractedText =
    children.split(" ").slice(0, wordsQuantity).join(" ") + "...";
  return (
    <>
      {
        <p className="mr-2 inline text-wrap text-sm sm:text-base">
          {isExpanded ? children : contractedText}
        </p>
      }
      <button
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        className="text-sm font-semibold text-blue-500 underline sm:text-base"
      >
        {isExpanded ? "show less" : "Read more"}
      </button>
    </>
  );
}

export default AccordionText;
