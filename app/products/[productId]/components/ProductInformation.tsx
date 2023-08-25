"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { AverageStats } from "./AverageStats";
import { RatingStars } from "@/app/components/RatingStars";
import { Carousel } from "react-responsive-carousel";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { CombinationsType, ProductInfo, VariantsType } from "@/app/types";
import { ProductVariants } from "./ProductVariants";
import { ProductCTAs } from "./ProductCTAs";
import { useAppDispatch } from "@/app/store/store";
import {
  setAvgRating,
  setDetailedRatingsCount,
  setQuestionsCount,
  setRatingsCount,
} from "@/app/store/features/productMinorInfoSlice";

import { ProductPrice } from "@/app/components/ProductPrice";
import { Quantity } from "@/app/components/Quantity";
import { getPriceInfo } from "@/app/utils/getPriceInfo";
import { ProductSideInfo } from "./productSideInfo/ProductSideInfo";
import find from "lodash/find";
import clsx from "clsx";
import axios from "axios";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/app/constants/breakPoints";

interface ProductInformationProps {
  product: ProductInfo;
}

export const ProductInformation: React.FC<ProductInformationProps> = ({
  product,
}) => {
  useEffect(() => {
    const productData = {
      categoryTreeData: product.categoryTreeData,
      description: product.description,
      attributes: product.attributes,
      keywords: product.keywords,
      name: product.name,
    };

    axios.post("../../../api/browsingHistoryAdd", {
      productData: productData,
      productId: product.id,
    });
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPicture, setSelectedPicture] = useState("");
  const [selectedVariantPicture, setSelectedVariantPicture] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      product?.avgRating !== undefined &&
      product?.ratingsCount !== undefined &&
      product?.questionsCount !== undefined
    ) {
      dispatch(setAvgRating(product.avgRating));
      dispatch(setRatingsCount(product.ratingsCount));
      dispatch(setQuestionsCount(product.questionsCount));
      //@ts-ignore
      dispatch(setDetailedRatingsCount(product.detailedRatingsCount));
    }
  }, [product?.ratingsCount, product?.questionsCount, dispatch]);

  const { productOnSale, discountOff, isPercentOff, discountOffLabel } =
    getPriceInfo(product!);

  // Make it real
  const fakeDetailedImages = [
    "/images/exclusiveSection/frames.jpg",
    "/images/exclusiveSection/cosmicPlayland.jpg",
    "/images/exclusiveSection/handmade.jpg",
    "/images/exclusiveSection/luxury_decor.jpg",
  ];

  const displayCount = 3;
  const chevronsClassName = "w-8 h-8 text-slate-600 cursor-pointer";

  const moveToTheNextImage = () => {
    if (selectedIndex < fakeDetailedImages.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  const moveToThePreviousImage = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    // Make it real
    setSelectedPicture(fakeDetailedImages[selectedIndex]);
    setSelectedVariantPicture("");
  }, [selectedIndex]);

  const variants = product?.variants as VariantsType | undefined;
  const productCombinations = product?.combinations as
    | CombinationsType[]
    | undefined;
  const defaultProductCombination = productCombinations?.filter(
    (combination) => combination.default,
  )[0];
  const [selectedCombination, setSelectedCombination] = useState(
    defaultProductCombination,
  );

  const changeCombination = (variant: string, value: string) => {
    setSelectedCombination((prev) => {
      const combination = { ...prev!.combination, [variant]: value };
      const Combination = find(productCombinations, { combination });
      return Combination;
    });
  };

  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  useEffect(() => {
    console.log(breakpoint);
  }, [breakpoint]);

  return (
    <div className="flex gap-0 max-lg:flex-col">
      <div className="flex items-start gap-0 max-lg:justify-around lg:flex-col lg:gap-2">
        <div className="relative h-80 w-80 overflow-hidden rounded-sm max-lg:order-2">
          <Image
            src={
              (variants && selectedVariantPicture) ||
              selectedPicture ||
              product?.image ||
              ""
            }
            alt="Product Picture"
            className="object-cover"
            fill
          />
        </div>

        {/* Have to make it real */}
        {fakeDetailedImages?.length !== 0 && (
          <div className="hidden h-80 items-center justify-center gap-0 max-lg:flex-col lg:flex lg:h-auto lg:w-80 lg:items-center">
            <HiChevronLeft
              onClick={moveToThePreviousImage}
              className={chevronsClassName}
            />
            <Carousel
              centerMode
              className="flex flex-col gap-3"
              axis="vertical"
              centerSlidePercentage={100 / displayCount}
              selectedItem={selectedIndex}
              showIndicators={false}
              showStatus={false}
              showThumbs={false}
              showArrows={false}
            >
              {fakeDetailedImages.map((image: string, i) => (
                <div
                  onClick={() => {
                    if (selectedIndex !== i) {
                      setSelectedIndex(i);
                    } else {
                      setSelectedPicture(image);
                      setSelectedVariantPicture("");
                    }
                  }}
                  key={i}
                  className={clsx(
                    "relative h-16 w-16 flex-shrink-0 cursor-pointer",
                    i === selectedIndex && "border-2 border-slate-500",
                  )}
                >
                  <Image
                    src={image}
                    alt="Image"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </Carousel>
            <HiChevronRight
              onClick={moveToTheNextImage}
              className={clsx(chevronsClassName, "lg:relative lg:-left-5")}
            />
          </div>
        )}
      </div>

      <div className="ml-6 flex w-full flex-col gap-8 px-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-xl font-extrabold text-themeSecondary">
            {product?.name}
          </h1>
          <div className="flex flex-col gap-0">
            <div className="flex items-center gap-2">
              <RatingStars defaultValue={product?.avgRating!} />
              <p className="font-text text-sm"> {product?.avgRating! + "/5"}</p>
            </div>

            <div className="mt-1">
              <AverageStats
                label="Ratings"
                averageStats={product?.ratingsCount}
                href="user"
              />
            </div>
          </div>
        </div>

        <ProductPrice
          discountOff={discountOff}
          productOnSale={productOnSale}
          isPercentOff={isPercentOff}
          discountOffLabel={discountOffLabel}
          price={variants ? selectedCombination?.price : product?.price}
        />

        <ProductVariants
          variants={variants}
          selectedCombination={selectedCombination}
          changeCombination={changeCombination}
          setSelectedVariantPicture={setSelectedVariantPicture}
        />

        <div className="mt-0 flex gap-2">
          <h3 className="min-w-[80px] font-text text-sm">Quantity :</h3>
          <Quantity quantity={quantity} setQuantity={setQuantity} />
        </div>

        <div className="flex h-full items-end gap-4">
          <ProductCTAs
            selectedCombination={selectedCombination}
            quantity={quantity}
            productId={product?.id}
            stock={variants ? selectedCombination?.stock : product?.quantity}
          />
        </div>
      </div>

      <div className="hidden flex-shrink-0 lg:block">
        <ProductSideInfo product={product} />
      </div>
    </div>
  );
};
