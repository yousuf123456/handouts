import React from "react";
import { Reviews } from "./components/Reviews";
import { NavigationPanel } from "@/app/components/NavigationPanel";
import { RatingAndReviewBucketCount } from "@/app/constants/consts";

interface IParams {
  productId: string;
}

interface SearchParams {
  page: string | undefined;
  filter: string | undefined;
  sortBy: "rating" | undefined;
  direction: "desc" | "asc" | undefined;
}

export default async function CustomerReviewsPage({
  params,
  searchParams,
}: {
  params: IParams;
  searchParams: SearchParams;
}) {
  return (
    <div className="bg-white px-6 py-6 md:px-8 lg:px-12 xl:px-16">
      <NavigationPanel heading="Product Reviews" />

      <Reviews
        productId={params.productId}
        sortBy={searchParams.sortBy}
        filter={searchParams.filter}
        direction={searchParams.direction}
        pageNumber={parseInt(searchParams.page || "0")}
      />
    </div>
  );
}
