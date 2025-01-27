import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useParams, useSearchParams } from "react-router-dom";

import { guideService } from "../services/services";
function useGuides(setMaxPages) {
  const { service, userId } = useParams();
  const [queryParams] = useSearchParams();

  const { data: { guides, numberOfPages } = {}, isError } = useQuery({
    queryKey: ["guides", service, userId, queryParams.toString()],

    queryFn: () => {
      if (service === "popular") {
        return guideService.getPopularGuides({ page: queryParams.get("page") });
      }

      if (service === "search")
        return guideService.getGuidesByQuery({
          query: queryParams.get("keyword"),
          page: queryParams.get("page"),
        });
      if (service === "nearby")
        return guideService.getNearbyGuides({
          lat: queryParams.get("lat"),
          lng: queryParams.get("lng"),
          page: queryParams.get("page"),
        });
      else return guideService.getUserGuides(userId);
    },
  });
  useEffect(() => {
    setMaxPages && setMaxPages(numberOfPages);
  }, [setMaxPages, numberOfPages]);

  return { guides, isError, numberOfPages };
}

export default useGuides;
