import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function GuidePagination({ numberOfPages, siblingsCount = 2 }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page");
  const lastPage = numberOfPages;
  const firstPage = 1;
  const hasRightDots = lastPage - currentPage - 1 > siblingsCount;
  const hasLeftDots = currentPage > siblingsCount * 2;

  function setPage(page) {
    setSearchParams({ ...Object.fromEntries(searchParams), page });
  }

  function generateRange(start) {
    const length =
      siblingsCount * 2 >= lastPage ? numberOfPages : siblingsCount * 2 + 1;
    return Array.from({ length }, (_, i) => start + i);
  }

  function generatePages() {
    if (hasRightDots && !hasLeftDots) {
      return [firstPage, ...generateRange(2), "...", lastPage];
    }
    if (hasLeftDots && !hasRightDots) {
      return [firstPage, "...", ...generateRange(lastPage - siblingsCount * 2)];
    }
    if (hasLeftDots && hasRightDots) {
      return [
        firstPage,
        "...",
        ...generateRange(currentPage - siblingsCount),
        "...",
        lastPage,
      ];
    }
    return generateRange(1);
  }
  const pages = useMemo(generatePages, [
    hasLeftDots,
    hasRightDots,
    currentPage,
    numberOfPages,
    generatePages,
  ]);

  if (numberOfPages)
    return (
      <div className="flex justify-center gap-5 pb-5 ">
        {pages.map((pageNum) => (
          <button
            onClick={() => typeof pageNum == "number" && setPage(pageNum)}
            className={`rounded ${pageNum === +currentPage ? "bg-gray-300" : "bg-blue-300"} px-2 py-0.5`}
            key={pageNum}
          >
            {pageNum}
          </button>
        ))}
      </div>
    );
}

export default GuidePagination;
