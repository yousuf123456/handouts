import React from "react";
import { getStoreInfo } from "../../components/Store";
import { StoreBanner } from "../../components/StoreLayoutComponents/banners/StoreBanner";
import { ProfileMetrics } from "./ProfileMetrics";

interface StoreProfileProps {
  storeId: string;
  searchParams: any;
}

export const StoreProfile: React.FC<StoreProfileProps> = async ({
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
    <div className="flex flex-col gap-16 pb-12">
      <div className="px-0 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <StoreBanner
          storeId={storeId}
          section="profile"
          data={publishedPage.layout[0].data}
        />
      </div>

      <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <ProfileMetrics searchParams={searchParams} storeId={storeId} />
      </div>
    </div>
  );
};
