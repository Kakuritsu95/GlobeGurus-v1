import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { guideService } from "../services/services";

function useGuide() {
  const { guideId } = useParams();
  const {
    data: guide,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["guide"],
    queryFn: () => guideService.get(guideId),
  });

  return { guide, error, isFetching };
}

export default useGuide;
