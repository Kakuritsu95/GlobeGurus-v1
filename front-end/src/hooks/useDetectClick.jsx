import { useEffect, useRef } from "react";

function useDetectClick(handleClick) {
  const ref = useRef();
  useEffect(() => {
    function detectClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handleClick();
    }
    document.addEventListener("click", detectClick, true);
    return () => {
      document.removeEventListener("click", detectClick, true);
    };
  }, [handleClick]);
  return ref;
}

export default useDetectClick;
