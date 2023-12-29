import { getServerSession } from "next-auth";
import prisma from "../libs/prismadb";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getFreeShippingFilter } from "./getProductDetailsById/getProductInfoById";
import { FreeShippingType } from "../types";

export const getProductBeingShipped = async (
  fromCart: boolean,
  productId?: string,
) => {
  if (fromCart) {
    return null;
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const pendingShippedProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },

    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      storeId: true,
      category: true,
      storeName: true,
      promoPrice: true,
      combinations: true,
      superTokensUserId: true,
      promoPriceEndingDate: true,
      promoPriceStartingDate: true,
    },
  });

  if (!pendingShippedProduct) return null;

  const pipeline = [
    {
      $match: {
        _id: { $oid: session.user.id },
      },
    },
    {
      $project: {
        collectedVouchers: {
          $filter: {
            input: "$collectedVouchers",
            as: "collectedVoucher",
            cond: {
              $and: [
                {
                  $eq: [
                    "$$collectedVoucher.storeId",
                    pendingShippedProduct.storeId,
                  ],
                },
                {
                  $or: [
                    {
                      $eq: ["$$collectedVoucher.applicableOn", "Entire Store"],
                    },
                    {
                      $in: [productId, "$$collectedVoucher.productIds"],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
  ];

  const collectedVouchers = (await prisma.user.aggregateRaw({
    pipeline: pipeline as any,
  })) as any;

  const freeShippingPipeline = [
    {
      $match: {
        storeId: { $oid: pendingShippedProduct.storeId },
      },
    },
    {
      $project: {
        storeId: 1,
        freeShipping: getFreeShippingFilter(pendingShippedProduct.storeId),
      },
    },
  ];

  const freeShippings = (await prisma.promoToolsBucket.aggregateRaw({
    pipeline: freeShippingPipeline,
  })) as unknown as {
    storeId: { $oid: string };
    freeShipping: FreeShippingType[];
  }[];

  return {
    collectedVouchers: collectedVouchers[0].collectedVouchers || [],
    productBeingShipped: [pendingShippedProduct],
    freeShippings,
  };
};
