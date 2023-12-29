import prisma from "../../libs/prismadb";

export const getSimilarProducts = async (
  productData: any,
  productId: string,
) => {
  const pipeline: any = [
    {
      $search: {
        index: "productsSearch",
        compound: {
          must: [
            {
              moreLikeThis: {
                like: [productData],
              },
            },
          ],

          mustNot: [
            {
              in: {
                path: "_id",
                value: { $oid: productId },
              },
            },
          ],
        },
      },
    },

    {
      $limit: 8,
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
        discount: 1,
        avgRating: 1,
        promoPrice: 1,
        attributes: 1,
        description: 1,
        ratingsCount: 1,
        categoryTreeData: 1,
        superTokensUserId: 1,
        promoPriceEndingDate: 1,
        promoPriceStartingdate: 1,
      },
    },
  ];

  const similarProducts = await prisma.product.aggregateRaw({
    pipeline: pipeline,
  });

  return similarProducts;
};
