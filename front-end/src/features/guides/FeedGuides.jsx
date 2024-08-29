import { useState } from "react";

import GuideList from "./GuideList";
import GuidePagination from "./GuidePagination";
function FeedGuides() {
  const [maxPages, setMaxPages] = useState(0);

  return (
    <div className="space-y-5 overflow-y-scroll rounded-lg">
      <GuideList setMaxPages={setMaxPages} />
      <GuidePagination maxPages={maxPages} />
    </div>
  );
}

export default FeedGuides;
