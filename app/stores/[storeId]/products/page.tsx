import React from "react";
import { SearchedTermResults } from "@/app/[category]/components/SearchedTermResults";
import { StoreProducts } from "./components/StoreProducts";
import { NavigationPanel } from "@/app/components/NavigationPanel";

interface SearchParams {
  section?: "homepage" | "products" | "profile";
}

interface IParams {
  storeId: string;
}

export default function StoreProductsPage({
  params,
  searchParams,
}: {
  params: IParams;
  searchParams: SearchParams;
}) {
  return (
    <div className="max-sm:py-3">
      <NavigationPanel heading="Store Products" />

      <StoreProducts searchParams={searchParams} storeId={params.storeId} />
    </div>
  );
}
