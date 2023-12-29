"use client";

import React from "react";
import TotalTable from "../../components/TotalTable";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/store";
import { getTotal } from "@/app/utils/getTotal";
import clsx from "clsx";
import { MobileTotal } from "@/app/components/MobileTotal";

interface Total_Checkout {}

export const Total_Checkout: React.FC<Total_Checkout> = ({}) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/shipping?fromCart=true", { shallow: true });
  };

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const { subTotal, productsAmmount } = getTotal({ items: cartItems });

  return (
    <>
      <div className="hidden w-full flex-col items-end gap-4 md:flex">
        <TotalTable
          subTotal={subTotal}
          productsAmmount={productsAmmount}
          labels={["Sub Total", "Shipping Fee", "Total"]}
          paddingLeft={4}
        />
        <Button
          onClick={onClick}
          variant={"default"}
          Disabled={!cartItems.length}
          className={clsx(
            "bg-green-500 text-white",
            !cartItems.length ? "hover:bg-green-500" : "hover:bg-green-600",
          )}
        >
          Checkout
        </Button>
      </div>

      <MobileTotal
        theme="green"
        buttonLabel="Checkout"
        onClick={onClick}
        productsAmmount={productsAmmount}
        subTotal={subTotal}
      />
    </>
  );
};
