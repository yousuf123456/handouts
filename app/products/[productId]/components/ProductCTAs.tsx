"use client";
import { Button } from "@/app/components/Button";
import { CombinationsType } from "@/app/types";
import axios from "axios";
import React, { useState } from "react";
import { ActionsConfirmation } from "./ActionsConfirmation";
import { useAppDispatch } from "@/app/store/store";
import {
  addCartItem,
  incrementCartItemsCount,
} from "@/app/store/features/cartSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { TooltipWrapper } from "@/app/components/TooltipWrapper";
import { addFavouriteItem } from "@/app/store/features/favouritesSlice";

interface ProductCTAsProps {
  selectedCombination: CombinationsType | undefined;
  quantity: number;
  productId: string | undefined;
  stock: number | undefined;
}

export const ProductCTAs: React.FC<ProductCTAsProps> = ({
  stock,
  selectedCombination,
  quantity,
  productId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  const [buttonLabel, setButtonLabel] = useState("");
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("");

  const dispatch = useAppDispatch();
  const session = useSession();
  const router = useRouter();

  const onFavouritesAdd = () => {
    setIsLoading(true);
    setButtonLabel("");
    setOpen(true);

    axios
      .post("../../api/addToFavourites", {
        productId: productId,
      })
      .then((res) => {
        setIsError(false);
        setLabel("Product added to your favourites");
        setButtonLabel("Open Favourites");
        setHref("/favourites");

        if (res.data !== true) {
          dispatch(addFavouriteItem(res.data));
        }
      })
      .catch((e) => {
        setIsError(true);
        setLabel("Something went wrong!");
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  const onAddToCart = () => {
    if (session.status === "loading") return;

    if (session.status === "unauthenticated") {
      return router.push(`/user/sign?callbackUrl=/products/${productId}`);
    }

    setIsLoading(true);
    setButtonLabel("");
    setOpen(true);
    axios
      .post("../../../api/addToCart", {
        selectedCombination,
        quantity,
        productId,
      })
      .then((res) => {
        setIsError(false);
        setLabel("Product added to your cart");
        setButtonLabel("Open Cart");
        setHref("/cart");
        dispatch(addCartItem(res.data));
        dispatch(incrementCartItemsCount(quantity));
      })
      .catch((e) => {
        setIsError(true);
        setLabel("Something went wrong!");
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  const onClick = () => {
    router.push(
      `/shipping?fromCart=false&productId=${productId}&quantity=${quantity.toString()}&combination=${JSON.stringify(
        selectedCombination,
      )}`,
    );
  };

  return (
    <div>
      {stock ? (
        <div className="flex h-full w-full items-end gap-3 max-sm:flex-col max-sm:px-3 sm:gap-4">
          <Button
            variant={"outline"}
            onClick={onAddToCart}
            className="
              flex 
              h-9 
              w-full 
              items-center justify-center 
              rounded-md 
              border-rose-500
              text-sm
              font-semibold 
              text-rose-500 
              hover:bg-rose-500 
              max-sm:order-2
              max-sm:rounded-3xl"
          >
            Add to Cart
          </Button>

          <Button
            variant={"default"}
            onClick={onClick}
            className="
              h-9 
              w-full
              rounded-md
              bg-rose-500
              text-sm
              font-medium
              tracking-wider
              text-white
              hover:bg-rose-600
              max-sm:rounded-3xl"
          >
            Buy Now
          </Button>

          <div className="hidden xl:block">
            <TooltipWrapper content="Add to Favourites">
              <Heart
                onClick={onFavouritesAdd}
                className="h-9 w-9 cursor-pointer text-themeSecondary"
              />
            </TooltipWrapper>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <p className="font-text text-xl font-semibold tracking-wider text-red-500">
            Out of Stock!
          </p>
          <Button
            variant={"default"}
            onClick={onFavouritesAdd}
            className="
            flex
            h-10
            w-48 
            items-center 
            justify-center 
            bg-rose-500 
            text-sm
            font-semibold 
            hover:bg-rose-600"
          >
            Add To Favourites
          </Button>
        </div>
      )}

      <ActionsConfirmation
        open={open}
        setOpen={setOpen}
        isLoading={isLoading}
        label={label}
        buttonLabel={buttonLabel}
        href={href}
        isError={isError}
      />
    </div>
  );
};
