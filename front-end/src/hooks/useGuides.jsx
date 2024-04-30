import { useQuery } from "@tanstack/react-query";

import { useParams, useSearchParams } from "react-router-dom";

import { guideService } from "../services/services";
function useGuides() {
  const { service, userId } = useParams();
  const [queryParams] = useSearchParams();

  const { data: guides } = useQuery({
    queryKey: ["guides", service, userId, queryParams.toString()],

    queryFn: () => {
      if (service === "popular") return guideService.getPopularGuides(1);
      if (service === "search")
        return guideService.getGuidesByQuery(queryParams.get("keyword"));
      if (service === "nearby")
        return guideService.getNearbyGuides({
          lat: queryParams.get("lat"),
          lng: queryParams.get("lng"),
          page: queryParams.get("page"),
        });
      else return guideService.getUserGuides(userId);
    },
  });

  return { guides };
}

export default useGuides;
