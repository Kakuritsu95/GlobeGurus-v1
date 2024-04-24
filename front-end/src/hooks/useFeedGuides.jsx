import { useQuery } from "@tanstack/react-query";
import { guideService } from "../services/services";
function useUserGuides() {
  const { data: feedGuides } = useQuery({
    queryKey: ["guidess"],
    queryFn: () => guideService.getPopularGuides(1),
  });

  return { feedGuides };
}

export default useUserGuides;
