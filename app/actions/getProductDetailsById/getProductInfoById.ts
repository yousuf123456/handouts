import { cache } from "react";
import prisma from "../../libs/prismadb";
import { FreeShippingType, VoucherType } from "@/app/types";

export const getFreeShippingFilter = (productIds: string | string[]) => {
  return {
    $filter: {
      input: "$freeShipping",
      as: "freeShipping",
      cond: {
        $and: [
          {
            $or: [
              {
                $in: [productIds, "$$freeShipping.productIds"],
              },
              {
                $eq: ["$$freeShipping.applicableOn", "Entire Store"],
              },
            ],
          },
          {
            $gt: [
              {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$$freeShipping.endingDate",
                },
              },
              new Date().toISOString(),
            ],
          },
        ],
      },
    },
  };
};

export const getProductInfoById = cache(async (productId: string) => {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user || !session.user.id) return;

  if (
    productId === undefined ||
    productId === "undefined" ||
    productId === null
  ) {
    return null;
  }

  const productInfo = await prisma.product.findUnique({
    where: {
      id: productId,
    },

    include: {
      store: {
        select: {
          id: true,
          logo: true,
          name: true,
          createdAt: true,
          posRatings: true,
          neuRatings: true,
          negRatings: true,
          ratingsCount: true,
        },
      },
    },
  });

  const vouchersFilter = {
    $filter: {
      input: "$vouchers",
      as: "voucher",
      cond: {
        $and: [
          {
            $or: [
              {
                $eq: ["$$voucher.applicableOn", "Entire Store"],
              },
              {
                $in: [productId, "$$voucher.productIds"],
              },
            ],
          },
          {
            $and: [
              {
                $gt: [
                  {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$$voucher.endingDate",
                    },
                  },
                  new Date().toISOString(),
                ],
              },
              {
                $ne: ["$$voucher.totalVouchers", "$$voucher.vouchersUsed"],
              },
            ],
          },
        ],
      },
    },
  };

  const freeShippingFilter = getFreeShippingFilter(productId);

  const pipeline = [
    {
      $match: {
        storeId: { $oid: productInfo?.store.id },
      },
    },

    {
      $project: {
        vouchers: vouchersFilter,
        freeShipping: {
          $slice: [
            {
              $sortArray: {
                input: freeShippingFilter,
                sortBy: { createdAt: -1 },
              },
            },
            0,
            1,
          ],
        },
        onProductFreeShipping: {
          $slice: [
            {
              $filter: {
                input: "$freeShipping",
                as: "freeShipping",
                cond: { $ne: ["$$freeShipping.applicableOn", "Entire Store"] },
              },
            },
            0,
            1,
          ],
        },
      },
    },
  ];

  const promoToolsBuckets = (await prisma.promoToolsBucket.aggregateRaw({
    pipeline: pipeline,
  })) as unknown as {
    vouchers: VoucherType[];
    freeShipping: FreeShippingType[];
    onProductFreeShipping: FreeShippingType[];
    _id: { $oid: string };
  }[];

  const vouchers = promoToolsBuckets
    .flatMap((promoToolsBucket) =>
      promoToolsBucket.vouchers.map((voucher) => ({
        ...voucher,
        bucketId: promoToolsBucket._id.$oid,
      })),
    )
    .flat();

  const freeShipping =
    promoToolsBuckets[0].onProductFreeShipping[0] ||
    promoToolsBuckets[0].freeShipping[0];

  return { data: productInfo, vouchers, freeShipping: freeShipping };
});
