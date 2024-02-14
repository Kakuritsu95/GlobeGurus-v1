import { useState } from "react";

function AccordionText({ children, wordsQuantity = 10 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const contractedText =
    children.split(" ").slice(0, wordsQuantity).join(" ") + "...";
  return (
    <div className="max-w-64">
      {
        <p className="mr-2 inline text-sm md:text-base ">
          {isExpanded ? children : contractedText}
        </p>
      }
      <span
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        className="font-semibold text-blue-500 underline"
      >
        {isExpanded ? "show less" : "Read more"}
      </span>
    </div>
  );
}

export default AccordionText;
