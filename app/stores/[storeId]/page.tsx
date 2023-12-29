import React from "react";
import { HomePage } from "./components/HomePage";
import { NavigationPanel } from "@/app/components/NavigationPanel";
import { StoreBanner } from "./components/StoreLayoutComponents/banners/StoreBanner";
import { Store } from "./components/Store";

interface SearchParams {
  section?: "homepage" | "products" | "profile";
}

interface IParams {
  storeId: string;
}

export default function StorePage({
  params,
  searchParams,
}: {
  params: IParams;
  searchParams: SearchParams;
}) {
  const { section } = searchParams;

  return (
    <div className="max-sm:py-3">
      <NavigationPanel heading="Seller Store" />

      <Store storeId={params.storeId} searchParams={searchParams} />
    </div>
  );
}
