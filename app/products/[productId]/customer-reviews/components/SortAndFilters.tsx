"use client";
import React, { useState } from "react";

import { SelectOptions } from "@/app/components/SelectOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FaArrowUp, FaFlask } from "react-icons/fa";
import { getSearchParamsArray } from "../utils/getSearchParamsArray";
import { filterOptions, sortOptions } from "@/app/constants/selectOptions";

export const SortAndFilters = ({}) => {
  const [sortByState, setSortByState] = useState<string | undefined>();
  const [filterState, setFilterState] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filter = searchParams.get("filter");
  const sortBy = searchParams.get("sortBy");
  const sortByDirection = searchParams.get("direction");

  const onSort = (value: any) => {
    setFilterState(undefined);
    setSortByState(value);

    const paramsToRemove = [
      "page",
      "sortBy",
      "filter",
      "cursor",
      "prevPage",
      "direction",
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
    setSortByState(undefined);
    setFilterState(value);

    router.push(`${pathname}?filter=${value[0]}`);
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
          <p className="text-xs text-slate-500 sm:text-sm">Sort</p>
        </div>

        <div className="flex-shrink-0">
          <SelectOptions
            label="Sort"
            onChange={onSort}
            value={sortByState}
            linkOptions={sortOptions}
            defaultValue={sortDefaultValue}
          />
        </div>
      </div>

      <div className={filterSortContainerCs}>
        <div className="flex items-center gap-1">
          <FaFlask className="h-3 w-3 text-slate-400" />
          <p className="text-xs text-slate-500 sm:text-sm">Filter</p>
        </div>
        <div className="flex-shrink-0">
          <SelectOptions
            label="Filter"
            onChange={onFilter}
            value={filterState}
            linkOptions={filterOptions}
            defaultValue={filterDefaultValue}
          />
        </div>
      </div>
    </div>
  );
};
