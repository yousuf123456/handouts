import React from "react";
import prisma from "@/app/libs/prismadb";

import { HomePage } from "./HomePage";
import { StoreBanner } from "./StoreLayoutComponents/banners/StoreBanner";
import { StorePageType } from "@/app/types";
import { SearchedTermResults } from "@/app/[category]/components/SearchedTermResults";
import { cn } from "@/lib/utils";

export const getStoreInfo = async (storeId: string) => {
  if (!storeId) return null;

  const store = (await prisma.store.findUnique({
    where: {
      id: storeId,
    },

    select: {
      id: true,
      storePages: true,
    },
  })) as null | { storePages: StorePageType[] };

  return store;
};

interface StoreProps {
  storeId: string;
  searchParams: any;
}

export const Store: React.FC<StoreProps> = async ({
  storeId,
  searchParams,
}) => {
  const storeInfo = await getStoreInfo(storeId);

  if (!storeInfo) return "Something went wrong!";

  const publishedPage = storeInfo.storePages.filter(
    (storePage) => storePage.isPublished,
  )[0];

  if (!publishedPage) return "Something went wrong!";

  return (
    <div
      className={cn(
        "flex flex-col gap-16 px-0 pb-12 sm:px-6 md:px-8 lg:px-12 xl:px-16",
      )}
    >
      <StoreBanner
        storeId={storeId}
        section={searchParams.section}
        data={publishedPage.layout[0].data}
      />

      <HomePage storeId={storeId} layout={publishedPage.layout} />
    </div>
  );
};
