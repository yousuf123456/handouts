import React from "react";
import { FlashSaleBanner } from "./components/FlashSaleBanner";
import { FlashProductsList } from "./components/FlashProductsList";

export const FlashSaleProductsList = () => {
  const hardCodedProducts = [
    {
      name: "High Quality Imported Cloths",
      price: "1200",
      ammountOff: "400",
      image: "/images/featured/decor_items.jpg",
      productOnSale: false,
    },
    {
      name: "High Quality Imported Cloths",
      price: "1200",
      ammountOff: "400",
      image: "/images/featured/decor_items.jpg",
      productOnSale: false,
    },
    {
      name: "High Quality Imported Cloths",
      price: "1200",
      ammountOff: "400",
      image: "/images/featured/decor_items.jpg",
      productOnSale: false,
    },
    {
      name: "High Quality Imported Cloths",
      price: "1200",
      ammountOff: "400",
      image: "/images/featured/decor_items.jpg",
      productOnSale: false,
    },
    {
      name: "High Quality Imported Cloths",
      price: "1200",
      ammountOff: "400",
      image: "/images/featured/decor_items.jpg",
      productOnSale: false,
    },
    {
      name: "High Quality Imported Cloths",
      price: "1200",
      ammountOff: "400",
      image: "/images/featured/decor_items.jpg",
      productOnSale: false,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <FlashSaleBanner />
      <FlashProductsList products={hardCodedProducts} />
    </div>
  );
};
