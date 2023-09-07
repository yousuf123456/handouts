import React from "react";
import clsx from "clsx";

import { SelectOptions } from "@/app/components/SelectOptions";
import { catalogSortOptions } from "@/app/constants/selectOptions";
import { RiFilter2Line } from "react-icons/ri";
import { catalogSorts } from "@/app/constants/catalogSorts";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getSearchParamsArray } from "@/app/products/[productId]/customer-reviews/utils/getSearchParamsArray";
import { cn } from "@/app/utils/cn";

interface SortsProps {
  filterModelOpen?: boolean;
  setFilterModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sorts: React.FC<SortsProps> = ({
  filterModelOpen,
  setFilterModelOpen,
}) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const onSort = (value: string) => {
    const prevSortBy = searchParams.get("sortBy");
    let searchParamsArray = getSearchParamsArray(searchParams, ["sortBy"]);
    const searchParamsString = searchParamsArray.join("&");

    if (
      (value === "price-up" && prevSortBy === "price-down") ||
      (prevSortBy === value && value !== "price-up")
    ) {
      return router.push(
        `/${params.category || "search"}?${searchParamsString}`,
      );
    }

    let newSortBy: string = "";
    if (prevSortBy === "price-up") newSortBy = "price-down";
    else newSortBy = value;

    searchParamsArray.push(`sortBy=${newSortBy}`);
    const updatedSearchParamsString = searchParamsArray.join("&");

    router.push(`/${params.category || "search"}?${updatedSearchParamsString}`);
  };

  const sortOptionsColor = "text-gray-500";
  const sortIconsSize = "w-[14px] h-[14px] min-[420px]:w-4 min-[420px]:h-4";
  const sorts = catalogSorts;

  const showClassName = "flex lg:hidden";

  return (
    <div className="flex w-full items-center justify-around lg:justify-end">
      <div className="hidden items-center gap-2 pr-16 lg:flex">
        <p className="flex-shrink-0 text-sm text-slate-600">Sort By</p>
        <SelectOptions
          label="Sort By"
          onChange={onSort}
          defaultValue="Best Match"
          linkOptions={catalogSortOptions}
        />
      </div>

      {sorts.map((sort, i) => (
        <div
          key={i}
          onClick={() => onSort(sort.value)}
          className={clsx(
            "group cursor-pointer items-center gap-1 sm:gap-2",
            showClassName,
          )}
        >
          <p
            className={clsx(
              "font-sans text-[11px] group-hover:text-themeBlue min-[420px]:text-xs sm:text-sm",
              (searchParams.get("sortBy") === sort.value ||
                (searchParams.get("sortBy") === "price-down" &&
                  sort.value === "price-up")) &&
                "text-themeBlue",
              sortOptionsColor,
            )}
          >
            {sort.name}
          </p>
          <div className="flex flex-col items-center gap-0">
            {sort.icon.map((Icon, i) => (
              <Icon
                key={i}
                className={cn(
                  sortIconsSize,
                  sortOptionsColor,
                  sort.size,
                  "group-hover:text-blue-500",
                  ((searchParams.get("sortBy") === sort.value && i === 0) ||
                    (sort.value === "price-up" &&
                      i === 1 &&
                      searchParams.get("sortBy") === "price-down")) &&
                    "text-blue-500",
                  sort.icon.length > 1 &&
                    (i === 0
                      ? "relative -bottom-[3px]"
                      : "relative -top-[3px]"),
                )}
              />
            ))}
          </div>
        </div>
      ))}

      <RiFilter2Line
        onClick={() => setFilterModelOpen((prev) => !prev)}
        className={clsx(
          "h-5 w-5 cursor-pointer text-neutral-500 sm:h-6 sm:w-6",
          showClassName,
        )}
      />
    </div>
  );
};
