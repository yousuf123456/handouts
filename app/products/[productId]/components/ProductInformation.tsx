"use client";
import React, { useEffect, useState } from "react";

import { AverageStats } from "./AverageStats";
import {
  CombinationsType,
  FreeShippingType,
  ProductInfo,
  VariantsType,
  VoucherType,
} from "@/app/types";

import { ProductVariants } from "./ProductVariants";
import { ProductCTAs } from "./ProductCTAs";
import { useAppDispatch } from "@/app/store/store";

import {
  setAvgRating,
  setDetailedRatingsCount,
  setQuestionsCount,
  setRatingsCount,
} from "@/app/store/features/productMinorInfoSlice";

// import find from "lodash/find";

import { ProductPrice } from "@/app/components/ProductPrice";
import { getPriceInfo } from "@/app/utils/getPriceInfo";
import { ProductSideInfo } from "./productSideInfo/ProductSideInfo";
import { ProductImages } from "./ProductImages";
import { ProductRating } from "./ProductRating";
import { HiChevronRight } from "react-icons/hi";
import { StoreInfoCTA } from "./StoreInfoCTA";
import { ProductQuantity } from "./ProductQuantity";
import { Section } from "./containers/Section";
import { ProductSpecifications } from "./ProductSpecifications";
import { StoreInfo } from "./productSideInfo/StoreInfo";
import { Services } from "./productSideInfo/Services";
import { Promotions } from "./Promotions";
import { FreeShipping } from "./FreeShipping";

interface ProductInformationProps {
  product: ProductInfo;
  vouchers: VoucherType[];
  freeShipping: FreeShippingType | undefined;
}

export const ProductInformation: React.FC<ProductInformationProps> = ({
  product,
  vouchers,
  freeShipping,
}) => {
  const [quantity, setQuantity] = useState(1);

  const [selectedVariantPicture, setSelectedVariantPicture] = useState<
    string[]
  >([]);

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

  // Make it real
  const fakeDetailedImages = [
    "/images/exclusiveSection/frames.jpg",
    "/images/exclusiveSection/cosmicPlayland.jpg",
    "/images/exclusiveSection/handmade.jpg",
    "/images/exclusiveSection/luxury_decor.jpg",
  ];

  const variants = product?.variants as VariantsType | undefined;

  const productCombinations = product?.combinations as unknown as
    | CombinationsType[]
    | undefined;

  const defaultProductCombination = productCombinations?.filter(
    (combination) => combination.default,
  )[0];

  const [selectedCombination, setSelectedCombination] = useState(
    defaultProductCombination,
  );

  const { productOnSale, discountOff, discountOffLabel, currentPrice } =
    getPriceInfo((selectedCombination as any) || product!);

  const changeCombination = async (
    variant: string,
    value: string,
    images: string[],
  ) => {
    if (!selectedCombination && !defaultProductCombination) return;

    const find = (await import("lodash/find")).default;

    if (find(selectedCombination, { [variant]: value })) {
      setSelectedVariantPicture([]);
      setSelectedCombination(undefined);
      return;
    }

    setSelectedCombination(() => {
      const prev = selectedCombination || defaultProductCombination;
      const combination = { ...prev!.combination, [variant]: value };
      const Combination = find(productCombinations, { combination });
      setSelectedVariantPicture(images || []);
      return Combination;
    });
  };

  const scrollToQuestions = () => {
    const questionsElement = document.getElementById("questions");
    const topScrollPos =
      questionsElement?.getBoundingClientRect().top! + window.scrollY;
    window.scrollTo({
      behavior: "smooth",
      top: topScrollPos - 50,
    });
  };

  return (
    <>
      <div className="flex max-lg:flex-col max-lg:gap-8 max-sm:bg-neutral-50">
        <ProductImages
          setSelectedVariantPicture={setSelectedVariantPicture}
          selectedVariantPicture={selectedVariantPicture}
          mainImage={product?.image}
          images={fakeDetailedImages}
        />

        <div className="relative flex w-full flex-col gap-4 px-0 sm:gap-6 sm:px-3 md:gap-8 md:px-6 lg:ml-2 xl:ml-6">
          <Section mode="padding">
            <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-8">
              <div className="flex flex-col gap-3 sm:gap-2">
                <h1 className="font-heading text-base font-extrabold text-themeSecondary min-[560px]:text-lg md:text-xl">
                  {product?.name}
                </h1>

                <div className="sm:hidden">
                  <ProductPrice
                    discountOff={discountOff}
                    currentprice={currentPrice!}
                    productOnSale={productOnSale}
                    discountOffLabel={discountOffLabel}
                    price={
                      variants && selectedCombination
                        ? selectedCombination?.price
                        : product?.price
                    }
                  />
                </div>

                <div className="flex flex-col gap-0">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <ProductRating
                        ratingsCount={product?.ratingsCount}
                        avgRating={product?.avgRating}
                      />

                      <div
                        onClick={scrollToQuestions}
                        className="flex cursor-pointer items-center gap-1 sm:hidden"
                      >
                        <p className="font-roboto text-xs font-medium text-black">
                          {product?.questionsCount + " questions "}
                        </p>

                        <HiChevronRight className="h-4 w-4 text-black" />
                      </div>
                    </div>

                    <StoreInfoCTA
                      logo={product.store.logo}
                      storeName={product.storeName}
                      posRatings={product.store.posRatings}
                      ratingsCount={product.store.ratingsCount}
                    />
                  </div>

                  <div className="mt-1 hidden lg:block">
                    <AverageStats
                      label="Ratings"
                      averageStats={product?.ratingsCount}
                      href="user"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden sm:block">
                <ProductPrice
                  discountOff={discountOff}
                  currentprice={currentPrice!}
                  productOnSale={productOnSale}
                  discountOffLabel={discountOffLabel}
                  price={
                    variants && selectedCombination
                      ? selectedCombination?.price
                      : product?.price
                  }
                />
              </div>
            </div>
          </Section>

          <ProductVariants
            quantity={quantity}
            variants={variants}
            setQuantity={setQuantity}
            discountOff={discountOff}
            currentPrice={currentPrice!}
            productOnSale={productOnSale}
            productPicture={product.image}
            discountOffLabel={discountOffLabel}
            changeCombination={changeCombination}
            selectedCombination={selectedCombination}
            setSelectedVariantPicture={setSelectedVariantPicture}
            selectedVariantPicture={selectedVariantPicture[0] || undefined}
            price={
              variants && selectedCombination
                ? selectedCombination?.price
                : product?.price
            }
          />

          <div className="w-full md:hidden">
            <ProductSpecifications
              productAttributes={product?.attributes as any}
            />
          </div>

          <FreeShipping freeShipping={freeShipping} />

          <Promotions initialVouchers={vouchers} productId={product.id} />

          <div className="hidden md:block">
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
          </div>

          <ProductCTAs
            selectedCombination={selectedCombination}
            quantity={quantity}
            productId={product?.id}
            stock={
              variants && selectedCombination
                ? selectedCombination?.stock
                : product?.quantity
            }
          />

          <div className="w-full lg:hidden">
            <Services />
          </div>

          <div className="w-full lg:hidden">
            <StoreInfo store={product.store} />
          </div>
        </div>

        <div className="hidden flex-shrink-0 lg:block">
          <ProductSideInfo product={product} />
        </div>
      </div>
    </>
  );
};
