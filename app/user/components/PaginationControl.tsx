"use client";

import { getSearchParamsArray } from "@/app/products/[productId]/customer-reviews/utils/getSearchParamsArray";
import { Button } from "@/components/ui/button";
import Pagination from "@mui/material/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";

interface PaginationControlProps {
  count: number;
  offset?: boolean;
  ITEMS_PER_PAGE: number;
  jumpingDisabled?: boolean;
  firstItemTieBreaker?: string | undefined;
  lastItemTieBreaker?: string | undefined;
  lastCursor?: string | number | undefined;
  firstCursor?: string | number | undefined;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
  count,
  offset,
  lastCursor,
  firstCursor,
  ITEMS_PER_PAGE,
  jumpingDisabled,
  lastItemTieBreaker,
  firstItemTieBreaker,
}) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0");

  const [currentPage, setCurrentPage] = useState(page || 1);

  useEffect(() => {
    setCurrentPage(page || 1);
  }, [page]);

  const router = useRouter();
  const pathname = usePathname();

  const isHistory = searchParams.get("isHistory");
  const toBeReviewed = searchParams.get("toBeReviewed");
  const sortBy = searchParams.get("sortBy");

  const handleChange = (
    e: any,
    page: number,
    prev?: boolean,
    next?: boolean,
  ) => {
    if (currentPage === page) return;

    const paramsToRemove = ["page", "prevPage", "cursor", "tieBreaker"];
    let oldSearchParamsArray = getSearchParamsArray(
      searchParams,
      paramsToRemove,
    );

    const nextPageToGo =
      page !== 0 ? page : next ? currentPage + 1 : currentPage - 1;

    const cursor = nextPageToGo > currentPage ? lastCursor : firstCursor;

    let searchParamsArray = [`page=${nextPageToGo}`];

    if (!offset) searchParamsArray = [...searchParamsArray];

    if (jumpingDisabled) {
      searchParamsArray.push(`prevPage=${currentPage}`);
      searchParamsArray.push(`cursor=${cursor}`);
    }

    if (isHistory && toBeReviewed)
      searchParamsArray = [
        `toBeReviewed=${toBeReviewed}`,
        `isHistory=${isHistory}`,
        ...searchParamsArray,
      ];

    searchParamsArray = [...searchParamsArray, ...oldSearchParamsArray];

    const searchParamsString = searchParamsArray.join("&");

    router.push(`${pathname}?${searchParamsString}`);

    setCurrentPage(nextPageToGo);
  };

  const noOfPages = Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <div className="flex w-full justify-end">
      {jumpingDisabled && (
        <div className="flex gap-4">
          <Button
            disabled={currentPage === 1}
            variant="outline"
            onClick={() => handleChange(0, 0, true, false)}
          >
            <HiChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <Button
            disabled={currentPage === 2}
            variant="outline"
            onClick={() => handleChange(0, 0, false, true)}
          >
            Next <HiChevronLeft className="ml-2 h-4 w-4 rotate-180" />
          </Button>
        </div>
      )}

      {!jumpingDisabled && noOfPages !== 1 && (
        <Pagination
          color="primary"
          shape="rounded"
          count={noOfPages}
          onChange={handleChange}
          page={page || 1}
        />
      )}
    </div>
  );
};
