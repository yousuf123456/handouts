import prisma from "../../libs/prismadb";
import { getCurrentUser } from "../getCurrentUser";

type UserWithBehaviourDoc = {
  id: string;
  behaviour: {
    id: string;
    count: number;
    userId: string;
    browsingHistory: {
      categoryTreeData: {}[];
      description: string;
      keywords: string[];
      attributes: any;
      name: string;
    }[];
    browsingHistoryProductIds: string[];
  };
};

export const getRecomendedProducts = async (params?: {
  fromSpecificStore?: boolean;
  storeId?: string;
}) => {
  const currentUser = (await getCurrentUser({
    getBehaviourDoc: true,
  })) as UserWithBehaviourDoc;

  if (!currentUser || !currentUser.behaviour) {
    const recomendedProducts = await prisma.product.findMany({
      take: 20,
      select: {
        promoPriceStartingDate: true,
        promoPriceEndingDate: true,
        ratingsCount: true,
        promoPrice: true,
        avgRating: true,
        storeId: true,
        image: true,
        price: true,
        name: true,
        id: true,
      },
      ...(params?.fromSpecificStore && {
        where: {
          storeId: params?.storeId,
        },
      }),
    });

    return recomendedProducts;
  }

  const productObjectIds = currentUser.behaviour.browsingHistoryProductIds.map(
    (id) => {
      return { $oid: id };
    },
  );

  const pipeline: any = [
    {
      $search: {
        index: "productsSearch",
        compound: {
          must: [
            {
              moreLikeThis: {
                like: currentUser.behaviour.browsingHistory,
              },
            },
          ],

          mustNot: [
            {
              in: {
                path: "_id",
                //@ts-ignore
                value: productObjectIds,
              },
            },
          ],
        },
      },
    },

    {
      $limit: 20,
    },

    {
      $lookup: {
        from: "Discount",
        localField: "discountId",
        foreignField: "_id",
        as: "discount",
      },
    },

    {
      $addFields: {
        discount: { $arrayElemAt: ["$discount", 0] },
      },
    },

    {
      $project: {
        id: 1,
        name: 1,
        image: 1,
        price: 1,
        storeId: 1,

        keywords: 1,
        avgRating: 1,
        attributes: 1,

        ratingsCount: 1,
        categoryTreeData: 1,
        superTokensUserId: 1,
      },
    },
  ];

  if (params?.fromSpecificStore) {
    pipeline[0].$search.compound.must.push({
      equals: {
        value: { $oid: params.storeId },
        path: "storeId",
      },
    });
  }

  const recomendedProducts = await prisma.product.aggregateRaw({
    pipeline: pipeline,
  });

  return recomendedProducts;
};
