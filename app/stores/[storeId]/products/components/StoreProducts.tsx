import { SearchedTermResults } from "@/app/[category]/components/SearchedTermResults";
import React from "react";
import { StoreBanner } from "../../components/StoreLayoutComponents/banners/StoreBanner";
import { getStoreInfo } from "../../components/Store";

interface StoreProductsProps {
  searchParams: any;
  storeId: string;
}

export const StoreProducts: React.FC<StoreProductsProps> = async ({
  searchParams,
  storeId,
}) => {
  const storeInfo = await getStoreInfo(storeId);

  if (!storeInfo) return "Something went wrong!";

  const publishedPage = storeInfo.storePages.filter(
    (storePage) => storePage.isPublished,
  )[0];

  return (
    <div
      className={
        "flex flex-col gap-0 px-0 pb-12 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      }
    >
      <StoreBanner
        storeId={storeId}
        section="products"
        data={publishedPage.layout[0].data}
      />

      <SearchedTermResults
        searchParams={searchParams as any}
        storeId={storeId}
        category="search"
        fromSpecificStore
      />
    </div>
  );
};
