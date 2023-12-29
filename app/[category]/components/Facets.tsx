"use client";
import React from "react";
import { Facet } from "./Facet";
import { PriceFacet } from "./PriceFacet";
import { RatingFacet } from "./RatingFacet";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { useParams } from "next/navigation";
import { getCategoryNames } from "@/app/utils/getCategoryNames";

interface FacetsProps {
  facets: any;
  categoryTreeData?: any;
}

export const Facets: React.FC<FacetsProps> = ({ facets, categoryTreeData }) => {
  const category = useParams().category;

  if (!facets) return;

  const isCategory = category !== "search";

  const categoryNames = categoryTreeData
    ? getCategoryNames(categoryTreeData[0])
    : [];
  const categoryFacetBuckets = categoryNames.map((category) => {
    return {
      _id: category.name,
    };
  });

  return (
    <div className="flex-shrink-0 bg-white lg:w-56 xl:w-64">
      <div className="px-0 py-4 lg:px-4 lg:py-8">
        <div className="flex flex-col gap-3 xl:gap-6">
          <ReduxProvider>
            {isCategory && categoryTreeData && (
              <Facet facetName="category" facetBuckets={categoryFacetBuckets} />
            )}

            <PriceFacet />

            <RatingFacet />

            {Object.keys(facets).map((facetKey) => {
              if (facetKey === "category" && isCategory) return;

              return (
                <Facet
                  key={facetKey}
                  facetName={facetKey}
                  facetBuckets={facets[facetKey].buckets}
                />
              );
            })}
          </ReduxProvider>
        </div>
      </div>
    </div>
  );
};
