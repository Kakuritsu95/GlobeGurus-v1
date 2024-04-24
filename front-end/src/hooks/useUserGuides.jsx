import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { guideService } from "../services/services";
function useUserGuides() {
  const { userId } = useParams();

  const { data: userGuides } = useQuery({
    queryKey: ["guides"],
    queryFn: () => guideService.getUserGuides(userId),
  });

  return { userGuides };
}

export default useUserGuides;
