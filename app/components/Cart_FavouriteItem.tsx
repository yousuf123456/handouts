"use client";
import { ProductPrice } from "@/app/components/ProductPrice";
import { Quantity } from "@/app/components/Quantity";
import { getPriceInfo } from "@/app/utils/getPriceInfo";
import {
  CartItemType,
  Cart_FavouriteItemProductType,
  CombinationsType,
} from "@/app/types";
import React, { useEffect, useState } from "react";

import { useAppDispatch } from "@/app/store/store";
import {
  deleteCartItem,
  updateCartItem,
  incrementCartItemsCount,
  addCartItem,
} from "@/app/store/features/cartSlice";

import { FaTrash } from "react-icons/fa";

import axios from "axios";
import { TooltipWrapper } from "@/app/components/TooltipWrapper";
import { CtaLink } from "@/app/(site)/components/CtaLink";
import {
  addFavouriteItem,
  deleteFavouriteItem,
} from "@/app/store/features/favouritesSlice";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "react-hot-toast";

import dynamic from "next/dynamic";
import { ProductImage } from "./ProductImage";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../constants/breakPoints";

const DynamicBackdropLoader = dynamic(
  () => import("@/app/components/BackdropLoader"),
);
const AlertDialogModel = dynamic(() => import("@/app/components/AlertDialog"));

interface Cart_FavouriteItemCardProps {
  cartItem?: CartItemType;
  isFavouriteItem?: boolean;
  favouriteItem?: Cart_FavouriteItemProductType;
}

export const Cart_FavouriteItemCard: React.FC<Cart_FavouriteItemCardProps> = ({
  cartItem,
  favouriteItem,
  isFavouriteItem,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { minWidth } = useBreakpoint(BREAKPOINTS);

  useEffect(() => {
    console.log(minWidth);
  }, [minWidth]);

  const dispatch = useAppDispatch();

  const onQuantityChange = (didDecrement: boolean) => {
    const newQuantity = didDecrement
      ? cartItem?.quantity! - 1
      : cartItem?.quantity! + 1;

    setIsLoading(true);
    axios
      .post("../../api/updateCartItem", {
        cartItemId: cartItem?.id,
        quantity: newQuantity,
        didDecrement,
      })
      .then((res) => {
        dispatch(
          updateCartItem({
            cartItemId: res.data.id,
            quantity: res.data.quantity,
          }),
        );
        didDecrement
          ? dispatch(incrementCartItemsCount(-1))
          : dispatch(incrementCartItemsCount(1));
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const onCartItemDelete = () => {
    setIsLoading(true);
    axios
      .post("../../api/deleteCartItem", {
        cartItemId: cartItem?.id,
        quantity: cartItem?.quantity,
      })
      .then((res) => {
        dispatch(deleteCartItem(res.data.id));
        dispatch(incrementCartItemsCount(-cartItem?.quantity!));
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const onFavouriteItemDelete = () => {
    setIsLoading(true);
    axios
      .post("../../api/deleteFavouriteItem", {
        favouriteItemId: favouriteItem?.id,
      })
      .then(() => dispatch(deleteFavouriteItem(favouriteItem?.id!)))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const onFavouritesAdd = () => {
    setIsLoading(true);
    axios
      .post("../../api/addToFavourites", {
        productId: cartItem?.product.id,
      })
      .then((res) => {
        toast.success("Product added to your favourites.");

        //Checking if the item does not already exists in the favourites
        if (res.data !== true) {
          dispatch(addFavouriteItem(cartItem?.product!));
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onAddToCart = () => {
    setIsLoading(true);
    axios
      .post("../../api/addToCart", {
        productId: favouriteItem?.id,
        quantity: 1,
      })
      .then((res) => {
        toast.success("Product added to your cart.");
        dispatch(addCartItem(res.data));
        dispatch(incrementCartItemsCount(1));
      })
      .catch((e) => toast.error("Product already exists in your cart."))
      .finally(() => setIsLoading(false));
  };

  const { productOnSale, discountOff, isPercentOff, discountOffLabel } =
    getPriceInfo(cartItem?.product || favouriteItem);

  const nameClassName =
    "text-sm sm:text-base tracking-tight sm:tracking-normal font-medium text-themeSecondary line-clamp-3";
  const selectedCombination = cartItem?.selectedCombination as CombinationsType;

  return (
    <>
      <div className="w-full flex-shrink-0 border-b-2 border-slate-200 py-3">
        <div className="flex items-center gap-0">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm sm:h-24 sm:w-24 md:h-28 md:w-28">
            <CtaLink href={`/products/${cartItem?.product?.id}`}>
              <ProductImage
                src={cartItem?.product?.image || favouriteItem?.image || ""}
              />
            </CtaLink>
          </div>

          <div className="w-full px-3 py-0">
            <div className="flex w-full justify-between gap-0 sm:gap-12">
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col">
                  <CtaLink
                    href={`/products/${
                      cartItem?.product?.id || favouriteItem?.id
                    }`}
                  >
                    <h2 className={nameClassName}>
                      {cartItem?.product?.name || favouriteItem?.name}
                      {!isFavouriteItem &&
                        selectedCombination &&
                        Object.keys(selectedCombination.combination).map(
                          (combinationName, i) => (
                            <div className="flex gap-2" key={i}>
                              <p className="font-text text-xs text-slate-500">
                                {combinationName + " :"}
                              </p>
                              <p className="font-text text-xs text-black">
                                {
                                  selectedCombination.combination[
                                    combinationName
                                  ]
                                }
                              </p>
                            </div>
                          ),
                        )}
                    </h2>
                  </CtaLink>
                </div>

                <div className="flex w-full justify-between">
                  {/* Shown in small devices */}
                  <div className="block sm:hidden">
                    <ProductPrice
                      discountLabelsClassName="text-xs"
                      discountOff={discountOff}
                      productOnSale={productOnSale}
                      isPercentOff={isPercentOff}
                      discountOffLabel={discountOffLabel}
                      price={
                        favouriteItem?.price ||
                        selectedCombination?.price ||
                        cartItem?.product?.price
                      }
                      className="text-sm font-semibold text-themeSecondary"
                    />
                  </div>

                  <div className="flex flex-col items-end justify-between gap-2">
                    {!isFavouriteItem && (
                      <Quantity
                        quantity={cartItem?.quantity!}
                        isCartItem={true}
                        onIncrease={onQuantityChange}
                        onDecrease={onQuantityChange}
                      />
                    )}

                    {/* Shown in small devices */}
                    <div className="sm:hidden">
                      <AlertDialogModel
                        title={
                          isFavouriteItem
                            ? "Remove from favourites ?"
                            : "Remove from cart ?"
                        }
                        desc={
                          isFavouriteItem
                            ? "The product will be removed from your favourites."
                            : "This product will not be included in your order."
                        }
                        actionClassName="bg-red-500 hover:bg-red-600"
                        actionLabel="Remove"
                        action={() => {
                          isFavouriteItem
                            ? onFavouriteItemDelete()
                            : onCartItemDelete();
                          setOpen(false);
                        }}
                      >
                        <div>
                          <FaTrash
                            onClick={() => setOpen(true)}
                            className="h-3 w-3 text-red-500"
                          />
                        </div>
                      </AlertDialogModel>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-12">
                <div className="hidden flex-shrink-0 flex-col gap-3 sm:flex">
                  <ProductPrice
                    discountOff={discountOff}
                    productOnSale={productOnSale}
                    isPercentOff={isPercentOff}
                    discountOffLabel={discountOffLabel}
                    price={
                      favouriteItem?.price ||
                      selectedCombination?.price ||
                      cartItem?.product?.price
                    }
                    className="mb-1 font-semibold text-themeSecondary sm:text-base lg:text-base"
                    mode="flex-col"
                  />
                </div>

                <div className="mr-2 hidden items-center gap-3 sm:flex">
                  {
                    //Gets hidden in medium devices
                    (minWidth || 0) > 767 && (
                      <AlertDialogModel
                        title={
                          isFavouriteItem
                            ? "Add to Cart ?"
                            : "Add to favourites ?"
                        }
                        desc={`This product will be added to your ${
                          isFavouriteItem ? "cart" : "favourites"
                        }`}
                        action={() => {
                          isFavouriteItem ? onAddToCart() : onFavouritesAdd();
                          setOpen2(false);
                        }}
                      >
                        <div>
                          <TooltipWrapper
                            content={
                              !isFavouriteItem
                                ? "Add to Favourites"
                                : "Add to Cart"
                            }
                          >
                            {!isFavouriteItem ? (
                              <Heart
                                onClick={() => setOpen2(true)}
                                className="h-[22px] w-[22px] cursor-pointer text-themeSecondary"
                              />
                            ) : (
                              <ShoppingCart
                                onClick={() => setOpen2(true)}
                                className="h-[22px] w-[22px] cursor-pointer text-themeSecondary"
                              />
                            )}
                          </TooltipWrapper>
                        </div>
                      </AlertDialogModel>
                    )
                  }

                  {
                    //Gets Hidden in small devices and layout totally shifts
                    (minWidth || 0) > 639 && (
                      <AlertDialogModel
                        title={
                          isFavouriteItem
                            ? "Remove from favourites ?"
                            : "Remove from cart ?"
                        }
                        desc={
                          isFavouriteItem
                            ? "The product will be removed from your favourites."
                            : "This product will not be included in your order."
                        }
                        actionClassName="bg-red-500 hover:bg-red-600"
                        actionLabel="Remove"
                        action={() => {
                          isFavouriteItem
                            ? onFavouriteItemDelete()
                            : onCartItemDelete();
                          setOpen(false);
                        }}
                      >
                        <div>
                          <TooltipWrapper content="delete">
                            <FaTrash
                              onClick={() => setOpen(true)}
                              className="h-4 w-4 cursor-pointer text-red-500"
                            />
                          </TooltipWrapper>
                        </div>
                      </AlertDialogModel>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DynamicBackdropLoader open={isLoading} />
    </>
  );
};
