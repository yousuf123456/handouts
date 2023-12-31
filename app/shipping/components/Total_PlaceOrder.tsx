"use client";
import React, { useState } from "react";

import { Button } from "@/app/components/Button";
import TotalTable from "@/app/components/TotalTable";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { CartItemProductType, PackageType, VoucherType } from "@/app/types";
import { getTotal } from "@/app/utils/getTotal";
import { formatCartItems } from "@/app/utils/formatCartItems";
import { getProductPrice } from "@/app/utils/getProductPrice";
import axios from "axios";
import BackdropLoader from "@/app/components/BackdropLoader";
import { flushCart } from "@/app/store/features/cartSlice";
import { getFormatedCartItemTotal } from "@/app/utils/getFormatedCartItemTotal";
import { MobileTotal } from "@/app/components/MobileTotal";

interface Total_PlaceOrderProps {
  appliedVouchers: { [key: string]: VoucherType };
  product: CartItemProductType[] | null;
  collectedVouchers: VoucherType[];
}

export const Total_PlaceOrder: React.FC<Total_PlaceOrderProps> = ({
  product,
  collectedVouchers,
  appliedVouchers,
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const fromCart = searchParams.get("fromCart") === "true";
  const quantity = searchParams.get("quantity");
  const combination = searchParams.get("combination");

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const selectedShippingAddress = useAppSelector(
    (state) => state.shipping.selectedShippingAddress,
  );
  const selectedBillingAddress = useAppSelector(
    (state) => state.shipping.selectedBillingAddress,
  );
  const selectedEmailTo = useAppSelector((state) => state.shipping.email);

  const productToBeFormatted = [
    {
      quantity: parseInt(quantity!),
      selectedCombination:
        combination !== "undefined" && combination !== null
          ? JSON.parse(combination)
          : null,
      id: "any",
      userId: "any",
      productId: "any",
      product: product ? product[0] : null,
    },
  ];

  //@ts-ignore
  const formatedProducts = !fromCart
    ? //@ts-ignore
      formatCartItems(productToBeFormatted)
    : formatCartItems(cartItems);

  const { subTotal, productsAmmount } = getTotal({
    items: !fromCart ? formatedProducts[0].cartItems : cartItems,

    appliedVouchers: appliedVouchers,
  });

  // const products = !fromCart ? formatedProducts[0].cartItems : cartItems;

  const router = useRouter();

  const getUserDistrict = async () => {
    let district: string = "";

    if (window.navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const addressComponents = response.data.address;
          district =
            addressComponents.district ||
            addressComponents.county ||
            "Could not get the district";
        } catch (error) {
          district = "Could not get the district";
        }
      });
    }

    return district;
  };

  const onPlaceOrder = () => {
    setIsLoading(true);

    getUserDistrict().then((res) => {
      let productIds: string[] = [];
      const packagesData = formatedProducts.map((formatedProduct: any) => {
        const orderedProducts = formatedProduct.cartItems.map(
          (cartItem: any) => {
            productIds.push(cartItem.product.id);
            const orderedProduct = {
              status: "Payment Pending",
              quantity: cartItem.quantity,
              selectedCombination: cartItem.selectedCombination,
              priceAtOrderTime: Math.round(getProductPrice(cartItem)),
              superTokensUserId: cartItem.product.superTokensUserId,
              product: {
                id: cartItem.product.id,
                name: cartItem.product.name,
                image: cartItem.product.image,
                storeId: cartItem.product.storeId,
                category: cartItem.product.category,
                storeName: cartItem.product.storeName,
              },

              store: {
                connect: {
                  id: cartItem.product.storeId,
                },
              },
            };

            return orderedProduct;
          },
        );

        const Package = {
          superTokensUserId: orderedProducts[0].superTokensUserId,
          ammount: getFormatedCartItemTotal(formatedProduct),
          storeId: formatedProduct.storeId,
          status: "Payment Pending",
          orderedProducts: {
            create: orderedProducts,
          },
        };

        return Package;
      });

      const storesAssociatedToOrder = formatedProducts.map(
        (formatedProduct) => ({
          id: formatedProduct.storeId,
        }),
      );

      const orderData = {
        totalAmmount: Math.round(subTotal),
        totalQuantity: productsAmmount,
        shippingAddress: selectedShippingAddress,
        billingAddress: selectedBillingAddress,
        emailTo: selectedEmailTo,
        boughtFromLocation: res,
      };

      console.log(packagesData);
      axios
        .post("../../api/placeOrder", {
          fromCart,
          orderData,
          productIds,
          packagesData,

          storesAssociatedToOrder,
        })
        .then((res) => {
          if (fromCart) dispatch(flushCart());
          router.push(`/payment?checkoutOrderId=${res.data.id}`);
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    });
  };

  return (
    <>
      <div className="hidden w-full flex-col items-end justify-start gap-3 md:flex lg:items-start">
        <TotalTable
          subTotal={subTotal}
          productsAmmount={productsAmmount}
          labels={["Sub Total", "Shipping Total", "Total"]}
        />

        <Button
          className="bg-green-500 hover:bg-green-600"
          Disabled={!selectedBillingAddress || !selectedShippingAddress}
          onClick={onPlaceOrder}
        >
          Place Order
        </Button>
      </div>

      <MobileTotal
        theme="green"
        buttonLabel="Place Order"
        productsAmmount={productsAmmount}
        subTotal={subTotal}
        onClick={onPlaceOrder}
      />
      <BackdropLoader open={isLoading} />
    </>
  );
};
