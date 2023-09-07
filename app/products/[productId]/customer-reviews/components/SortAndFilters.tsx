"use client";
import React from "react";

import { SelectOptions } from "@/app/components/SelectOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { RatingAndReview } from "@prisma/client";
import { FaArrowUp, FaFlask } from "react-icons/fa";
import { getSearchParamsArray } from "../utils/getSearchParamsArray";
import { filterOptions, sortOptions } from "@/app/constants/selectOptions";

interface SortAndFiltersProps {
  lastReview: RatingAndReview;
  firstReview: RatingAndReview;
  goingBack: boolean;
}

export const SortAndFilters: React.FC<SortAndFiltersProps> = ({
  lastReview,
  firstReview,
  goingBack,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filter = searchParams.get("filter");
  const sortBy = searchParams.get("sortBy");
  const sortByDirection = searchParams.get("direction");

  const onSort = (value: any) => {
    const paramsToRemove = [
      "sortBy",
      "direction",
      "cursor",
      "page",
      "prevPage",
      "tieBreaker",
    ];
    let paramsArray = getSearchParamsArray(searchParams, paramsToRemove);

    const linkOption = sortOptions.filter(
      (option) => option.label === value,
    )[0] as any;

    if (linkOption.remove) {
      return router.push(pathname);
    }

    paramsArray.push(
      `sortBy=rating&direction=${
        value === "Rating: High To Low" ? "desc" : "asc"
      }`,
    );

    const paramsString = paramsArray.join("&");
    router.push(`${pathname}?${paramsString}`);
  };

  const onFilter = (value: any) => {
    const linkOption = filterOptions.filter(
      (option) => option.label === value,
    )[0];
    const paramsToRemove = ["filter"];

    const paramsArray = getSearchParamsArray(searchParams, paramsToRemove);

    if (!linkOption.remove) paramsArray.push(`filter=${value[0]}`);
    const paramsString = paramsArray.join("&");

    router.push(`${pathname}?${paramsString}`);
  };

  const sortDefaultValue =
    sortBy && sortByDirection
      ? sortByDirection === "desc"
        ? "Rating: High To Low"
        : "Rating: Low To High"
      : sortOptions[0].label;

  const filterDefaultValue = filter ? filter + " Star" : "All Stars";

  const filterSortContainerCs =
    "flex max-sm:flex-col sm:items-center gap-1 sm:gap-2";

  return (
    <div className="flex w-full items-center max-sm:justify-around sm:w-fit sm:gap-12">
      <div className={filterSortContainerCs}>
        <div className="flex items-center gap-1">
          <FaArrowUp className="h-3 w-3 text-slate-400" />
          <p className="text-xs font-semibold text-slate-500 sm:text-sm">
            Sort
          </p>
        </div>

        <div className="flex-shrink-0">
          <SelectOptions
            label="Sort"
            onChange={onSort}
            linkOptions={sortOptions}
            defaultValue={sortDefaultValue}
          />
        </div>
      </div>

      <div className={filterSortContainerCs}>
        <div className="flex items-center gap-1">
          <FaFlask className="h-3 w-3 text-slate-400" />
          <p className="text-xs font-semibold text-slate-500 sm:text-sm">
            Filter
          </p>
        </div>
        <div className="flex-shrink-0">
          <SelectOptions
            label="Filter"
            onChange={onFilter}
            linkOptions={filterOptions}
            defaultValue={filterDefaultValue}
          />
        </div>
      </div>
    </div>
  );
};
