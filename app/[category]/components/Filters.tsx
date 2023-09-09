import clsx from "clsx";
import React, { useState } from "react";

import { HiChevronDown } from "react-icons/hi";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/app/utils/cn";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { getSearchParamsArray } from "@/app/products/[productId]/customer-reviews/utils/getSearchParamsArray";
import { useAppDispatch } from "@/app/store/store";
import { Bucket } from "./Bucket";
import { Facet } from "./Facet";
import { getCategoryNames } from "@/app/utils/getCategoryNames";
import { removeselectedFacet } from "@/app/store/features/selectedFacetsSlice";
import dynamic from "next/dynamic";

const Drawer = dynamic(() => import("@/app/components/Drawer"));

interface FiltersProps {
  topFacets: any;
  fullCategoryTreeData?: any;
}

export const Filters: React.FC<FiltersProps> = ({
  topFacets,
  fullCategoryTreeData,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedFacet, setSelectedFacet] = useState<any>({});

  const onFilterClick = (key: string) => {
    setSelectedFacet({ [key]: topFacets[key] });
    setOpen((prev) => !prev);
  };

  const dispatch = useAppDispatch();

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const resetFilter = () => {
    const filterName = Object.keys(selectedFacet)[0];
    if (filterName === "category")
      return router.push(`/search?${searchParams}`);

    const searchParamsArray = getSearchParamsArray(searchParams, [filterName]);
    const updatedSearchParams = searchParamsArray.join("&");

    router.push(`/${params.category || "search"}?${updatedSearchParams}`);
    dispatch(removeselectedFacet({ [filterName]: "", removeAll: "true" }));
  };

  const category = useParams().category;

  const isCategory = category !== "search";
  const categoryNames = fullCategoryTreeData
    ? getCategoryNames(fullCategoryTreeData[0])
    : [];

  const categoryFacetBuckets = categoryNames.map((category) => {
    return {
      _id: category.name,
    };
  });

  return (
    <>
      <div className="flex w-full justify-between gap-3 overflow-auto scrollbar-none min-[420px]:justify-evenly lg:hidden">
        {Object.keys(topFacets).map((key) => (
          <div
            key={key}
            onClick={() => onFilterClick(key)}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-100 px-3 py-1"
          >
            <p className="font-sans text-xs capitalize text-slate-800 sm-[420px]:text-sm">
              {key}
            </p>

            <HiChevronDown
              className={clsx(
                "h-4 w-4 text-slate-700 transition-all",
                open && Object.keys(selectedFacet)[0] === key && "rotate-180",
              )}
            />
          </div>
        ))}
      </div>

      <Drawer open={open} side="bottom" setOpen={setOpen}>
        <SheetHeader>
          <SheetTitle className="capitalize">
            {selectedFacet ? Object.keys(selectedFacet)[0] : "Select"}
          </SheetTitle>
        </SheetHeader>

        <div className="my-6 flex flex-col items-start gap-6">
          <div className="flex flex-wrap justify-start gap-3">
            {selectedFacet &&
              Object.keys(selectedFacet).map((key, i) =>
                isCategory && key === "category" ? (
                  <Facet
                    key={i}
                    hideHeader={true}
                    facetName={key}
                    facetBuckets={categoryFacetBuckets}
                  />
                ) : (
                  selectedFacet[key].buckets.map((bucket: { _id: string }) => (
                    <Bucket key={bucket._id} bucket={bucket} queryName={key} />
                  ))
                ),
              )}
          </div>

          <Button
            onClick={resetFilter}
            variant={"outline"}
            className="h-9 w-full rounded-3xl"
          >
            Reset
          </Button>
        </div>
      </Drawer>
    </>
  );
};
