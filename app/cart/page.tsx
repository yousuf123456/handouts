import React from "react";
import { CartBanner } from "./components/CartBanner";
import { CartItems } from "./components/CartItems";
import { ReduxProvider } from "../context/ReduxProvider";

export default function CartPage() {
  return (
    <div className="flex min-h-[360px] w-full flex-col bg-white pb-12 max-md:pb-16">
      <CartBanner />

      <div className="flex">
        <ReduxProvider>
          <CartItems />
        </ReduxProvider>
      </div>
    </div>
  );
}
