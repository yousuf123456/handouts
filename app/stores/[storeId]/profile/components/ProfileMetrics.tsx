import React from "react";
import prisma from "@/app/libs/prismadb";
import { cancellationSteps, returnSteps } from "@/app/types";
import { Store } from "@prisma/client";
import { Statistics } from "./Statistics";
import { StoreProducts_SellerReviews } from "./StoreProducts_SellerReviews";

const getStoreProfileMetrics = async (
  storeId: string,
): Promise<{
  createdAt: Date;
  returnPer: number;
  totalSales: number;
  successPer: number;
  cancellationPer: number;
  sellerReviewsData: any;
  productReviewsData: any;
} | null> => {
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  if (!store) return null;

  const currentDate = new Date();
  const refreshedAt = new Date(store.profileMetricsInfo?.refreshedAt || "");

  const timeDifference =
    currentDate.getTime() - (refreshedAt.getTime() || new Date().getTime());

  const hoursDifference = timeDifference / (1000 * 60 * 60);

  const sellerReviewsData = {
    posRatings: store.posRatings,
    neuRatings: store.neuRatings,
    negRatings: store.negRatings,
    ratingsCount: store.ratingsCount,
  };

  if (store.profileMetricsInfo && hoursDifference < 6) {
    return {
      sellerReviewsData,
      createdAt: store.createdAt,
      returnPer: store.profileMetricsInfo.returnPer,
      totalSales: store.profileMetricsInfo.totalSales,
      successPer: store.profileMetricsInfo.successPer,
      cancellationPer: store.profileMetricsInfo.cancellationPer,
      productReviewsData: store.profileMetricsInfo.productReviewsData,
    };
  }

  const totalSales_ReviewsData = (await prisma.product.aggregateRaw({
    pipeline: [
      {
        $match: {
          storeId: { $oid: storeId },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$numOfSales" },
          totalRatingsSum: { $sum: "$ratingsSum" },
          totalRatingsCount: { $sum: "$ratingsCount" },
          "1": { $sum: "$detailedRatingsCount.1" },
          "2": { $sum: "$detailedRatingsCount.2" },
          "3": { $sum: "$detailedRatingsCount.3" },
          "4": { $sum: "$detailedRatingsCount.4" },
          "5": { $sum: "$detailedRatingsCount.5" },
        },
      },
    ],
  })) as any;

  const totalSales = totalSales_ReviewsData[0].totalSales;

  const salesRatiosData = (await prisma.orderedProduct.aggregateRaw({
    pipeline: [
      {
        $match: {
          storeId: { $oid: storeId },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ],
  })) as unknown as { _id: string; count: number }[];

  const salesRatiosCountData = {
    delievered: 0,
    cancelled: 0,
    returned: 0,
  };

  salesRatiosData.map((data) => {
    if (cancellationSteps.includes(data._id))
      return (salesRatiosCountData.cancelled += data.count);

    if (returnSteps.includes(data._id) && !(data._id === "Rejected"))
      return (salesRatiosCountData.returned += data.count);

    salesRatiosCountData.delievered += data.count;
  });

  const profileMetricsInfo = {
    totalSales,
    refreshedAt: new Date(),
    returnPer: (salesRatiosCountData.returned / totalSales) * 100,
    successPer: (salesRatiosCountData.delievered / totalSales) * 100,
    cancellationPer: (salesRatiosCountData.cancelled / totalSales) * 100,
    productReviewsData: {
      ratingsCount: totalSales_ReviewsData[0].totalRatingsCount,
      avgRating:
        totalSales_ReviewsData[0].totalRatingsSum /
        totalSales_ReviewsData[0].totalRatingsCount,
      detailedRatingsCount: {
        "1": totalSales_ReviewsData[0]["1"],
        "2": totalSales_ReviewsData[0]["2"],
        "3": totalSales_ReviewsData[0]["3"],
        "4": totalSales_ReviewsData[0]["4"],
        "5": totalSales_ReviewsData[0]["5"],
      },
    },
  } as any;

  await prisma.store.update({
    where: {
      id: storeId,
    },
    data: {
      profileMetricsInfo,
    },
  });

  profileMetricsInfo.sellerReviewsData = sellerReviewsData;
  profileMetricsInfo.createdAt = store.createdAt;

  return profileMetricsInfo;
};

interface ProfileMetricsProps {
  storeId: string;
  searchParams: any;
}

export const ProfileMetrics: React.FC<ProfileMetricsProps> = async ({
  storeId,
  searchParams,
}) => {
  const metricsInfo = await getStoreProfileMetrics(storeId);

  if (!metricsInfo) return "Something went wrong";

  const {
    createdAt,
    successPer,
    cancellationPer,
    returnPer,
    totalSales,
    sellerReviewsData,
    productReviewsData,
  } = metricsInfo;

  return (
    <div className="flex gap-16 max-xl:flex-col">
      <Statistics
        createdAt={createdAt}
        returnPer={returnPer}
        successPer={successPer}
        totalSales={totalSales}
        cancellationPer={cancellationPer}
      />

      <StoreProducts_SellerReviews
        storeId={storeId}
        searchParams={searchParams}
        sellerReviewsData={sellerReviewsData}
        productReviewsData={productReviewsData}
      />
    </div>
  );
};
