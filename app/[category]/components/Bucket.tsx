"use client";
import BackdropLoader from "@/app/components/BackdropLoader";
import {
  addSelectedFacet,
  removeselectedFacet,
} from "@/app/store/features/selectedFacetsSlice";
import { useAppSelector } from "@/app/store/store";
import { cn } from "@/app/utils/cn";
import { formatCategoryParam } from "@/app/utils/formatCategoryParam";
import { updateSearchParam } from "@/app/utils/updateSearchParam";
import Checkbox from "@mui/material/Checkbox";
import clsx from "clsx";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

interface BucketProps {
  bucket: { _id: string; count?: number };
  queryName: string;
}

export const Bucket: React.FC<BucketProps> = ({ bucket, queryName }) => {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathName = usePathname() || "/";
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  const currentFacet = useAppSelector(
    (state) => state.selectedFacets.facets[queryName],
  );

  const selectedFacet =
    params.category ===
      formatCategoryParam({ toPut: true, category: bucket._id }) ||
    (currentFacet ? currentFacet?.includes(bucket._id) : false);

  function handleQueryChange(name: string, query: string, event?: any) {
    const Delete = (event && !event.target?.checked) || selectedFacet;

    if (searchParams?.entries()) {
      const updatedSearchParams = updateSearchParam(
        searchParams,
        name,
        query,
        Delete,
      );
      router.push(`${pathName}?${updatedSearchParams.toString()}`, {
        shallow: true,
      });
    }
  }

  function handleCategoryFacetSelect(value: string) {
    const param = value
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("-");
    router.push(`/${param}?${searchParams}`);
  }

  function removeCategoryFilter() {
    router.push(`/search?${searchParams}`);
  }

  const dispatch = useDispatch();

  const selectFacet = (key: string, value: string) =>
    dispatch(addSelectedFacet({ [key]: value }));

  const deselectFacet = (key: string, value: string) =>
    dispatch(removeselectedFacet({ [key]: value }));

  return (
    <>
      <div className="flex items-center gap-0">
        <div className="hidden lg:block">
          <Checkbox
            size="small"
            id={bucket._id}
            inputProps={{ "aria-label": "controlled" }}
            checked={
              selectedFacet ||
              params.category ===
                formatCategoryParam({ toPut: true, category: bucket._id })
            }
            onChange={(e: any) => {
              if (queryName === "category" && !e.target.checked) return;
              setIsLoading(true);
              if (queryName === "category")
                return handleCategoryFacetSelect(bucket._id);
              handleQueryChange(queryName, bucket._id, e);
              e.target.checked
                ? selectFacet(queryName, bucket._id)
                : deselectFacet(queryName, bucket._id);
            }}
          />
        </div>

        <div
          onClick={() => {
            setIsLoading(true);
            if (
              queryName === "category" &&
              params.category ===
                formatCategoryParam({ toPut: true, category: bucket._id })
            )
              return removeCategoryFilter();
            if (queryName === "category")
              return handleCategoryFacetSelect(bucket._id);
            handleQueryChange(queryName, bucket._id);
            selectedFacet
              ? deselectFacet(queryName, bucket._id)
              : selectFacet(queryName, bucket._id);
          }}
          className={cn(
            "border-2 border-transparent max-lg:cursor-pointer max-lg:rounded-lg max-lg:bg-slate-100 max-lg:px-3 max-lg:py-1",
            selectedFacet && " border-themeBlue bg-blue-50",
          )}
        >
          <p
            className={cn(
              "line-clamp-1 font-sans text-sm text-slate-800 lg:text-slate-600",
              selectedFacet && "max-lg:text-themeBlue",
            )}
          >
            {bucket._id}
          </p>
        </div>
      </div>

      <BackdropLoader open={isLoading} />
    </>
  );
};
