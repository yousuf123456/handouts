import prisma from "../../libs/prismadb";

import { NextResponse } from "next/server";
import { getFilterObjects } from "@/app/filter/getFilterObjects";
import { IParams } from "@/app/types";

export async function POST(req: Request) {
  try {
    const { params, category }: { params: IParams; category: string } =
      await req.json();

    const filterArray = [];
    const {
      categoryObject,
      colorsObject,
      sizesObject,
      brandObject,
      priceObject,
      ratingObject,
    } = getFilterObjects(params, category);

    if (category !== "search") filterArray.push(categoryObject);
    if (params.brand) filterArray.push(brandObject);
    if (params.sizes) filterArray.push(sizesObject);
    if (params.colors) filterArray.push(colorsObject);
    if (params.price) filterArray.push(priceObject);
    if (params.rating) filterArray.push(ratingObject);

    const sortByField =
      params.sortBy === "price-up" || params.sortBy === "price-down"
        ? "price"
        : params.sortBy;
    const sortObject = sortByField
      ? {
          [sortByField]:
            params.sortBy === "price-up"
              ? 1
              : params.sortBy === "price-down"
              ? -1
              : -1,
        }
      : {};

    const pipeline: any = [
      {
        $search: {
          index: "productsSearch",
          compound: {
            must: [
              {
                text: {
                  query: params.q || category,
                  path: params.q ? "keywords" : "categoryTreeData.name",
                  fuzzy: {
                    maxEdits: 1,
                  },
                  score: {
                    function: {
                      multiply: [
                        {
                          path: {
                            value: "avgRating",
                            undefined: 2,
                          },
                        },
                        {
                          score: "relevance",
                        },
                      ],
                    },
                  },
                },
              },
            ],

            should: [
              {
                text: {
                  query: params.q || category,
                  path: "name",
                  score: {
                    boost: {
                      value: 2.5,
                    },
                  },
                },
              },
              {
                text: {
                  query: params.q || category,
                  path: "description",
                  score: {
                    boost: {
                      value: 1.5,
                    },
                  },
                },
              },
            ],
          },
        },
      },

      { $limit: 15 },

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
          ratings: 1,
          storeId: 1,
          ratingsCount: 1,
          avgRating: 1,
          discount: 1,
          superTokensUserId: 1,
        },
      },
    ];

    if (pipeline[0].$search?.compound)
      //@ts-ignore
      pipeline[0].$search.compound.filter = filterArray;
    console.log();
    if (params.sortBy && sortObject) pipeline[0].$search.sort = sortObject;

    const searchProducts = (await prisma.product.aggregateRaw({
      //@ts-ignore
      pipeline: pipeline,
    })) as any;

    return NextResponse.json(searchProducts);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
