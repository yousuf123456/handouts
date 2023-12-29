import React from "react";

import prisma from "../libs/prismadb";
import { Checkout } from "./components/Checkout";
import { getProductBeingShipped } from "../actions/getProductBeingShipped";
import { getCurrentUser } from "../actions/getCurrentUser";
import { CartItemType, FreeShippingType } from "../types";
import { getFreeShippingFilter } from "../actions/getProductDetailsById/getProductInfoById";

export type FreeShippingsType = {
  storeId: { $oid: string };
  freeShipping: FreeShippingType[];
}[];

const getCartItemsPromos = async () => {
  const currentUser = await getCurrentUser({ getCart: true });

  if (!currentUser) return null;

  const cartItems = currentUser.cartItems as CartItemType[];

  const productIds = cartItems.map((cartItem) => cartItem.product.id);
  const storeIds = cartItems.map((cartItem) => cartItem.product.storeId);
  const mongoStoreIds = cartItems.map((cartItem) => ({
    $oid: cartItem.product.storeId,
  }));

  const pipeline = [
    {
      $match: {
        _id: { $oid: currentUser.id },
      },
    },
    {
      $project: {
        collectedVouchers: {
          $filter: {
            as: "collectedVoucher",
            input: "$collectedVouchers",
            cond: {
              $and: [
                {
                  $in: ["$$collectedVoucher.storeId", storeIds],
                },
                {
                  $or: [
                    {
                      $eq: ["$$collectedVoucher.applicableOn", "Entire Store"],
                    },
                    {
                      $in: ["$$collectedVoucher.productIds", productIds],
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

  const collectedVouchersData = (
    await prisma.user.aggregateRaw({
      pipeline,
    })
  )[0] as any;

  const freeShippingPipeline = [
    {
      $match: {
        storeIds: {
          $in: [mongoStoreIds, "$storeId"],
        },
      },
    },
    {
      $project: {
        storeId: 1,
        freeShipping: {
          $filter: getFreeShippingFilter(productIds),
        },
      },
    },
  ];

  const freeShippings = (await prisma.promoToolsBucket.aggregateRaw({
    pipeline: freeShippingPipeline,
  })) as unknown as FreeShippingsType;

  return {
    collectedVouchers: collectedVouchersData.collectedVouchers,
    freeShippings,
  };
};

interface IParams {
  fromCart: string | undefined;
  productId: string | undefined;
  quantity: string | undefined;
  combination: string | undefined;
}

export default async function ShippingPage({
  searchParams,
}: {
  searchParams: IParams;
}) {
  const fromCart = searchParams.fromCart === "true";

  const pendingShippedProduct = await getProductBeingShipped(
    fromCart,
    searchParams.productId,
  );

  const cartItemsCollectedPromos = fromCart ? await getCartItemsPromos() : null;

  if (!searchParams.fromCart && pendingShippedProduct === null)
    return "Something went wrong";

  return (
    <Checkout
      fromCart={searchParams.fromCart === "true"}
      freeShippings={
        pendingShippedProduct?.freeShippings ||
        cartItemsCollectedPromos?.freeShippings ||
        []
      }
      vouchers={
        pendingShippedProduct?.collectedVouchers ||
        cartItemsCollectedPromos?.collectedVouchers ||
        []
      }
      product={pendingShippedProduct?.productBeingShipped || null}
      quantity={
        searchParams.quantity ? parseInt(searchParams?.quantity) : undefined
      }
      combination={
        searchParams.combination && searchParams.combination !== "undefined"
          ? searchParams.combination === "null"
            ? null
            : JSON.parse(searchParams.combination)
          : undefined
      }
    />
  );
}
