import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import Image from "next/image";
import clsx from "clsx";
import { Skeleton, useMediaQuery } from "@mui/material";
import { ProductImage } from "@/app/components/ProductImage";

interface ProductImagesProps {
  setSelectedVariantPicture: React.Dispatch<React.SetStateAction<string[]>>;
  selectedVariantPicture: string[];
  mainImage: string | null | undefined;
  images: string[];
}

export const ProductImages: React.FC<ProductImagesProps> = ({
  setSelectedVariantPicture,
  selectedVariantPicture,
  mainImage,
  images,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPicture, setSelectedPicture] = useState("");

  const displayCount = 3;
  const chevronsClassName =
    "w-8 h-8 p-1 flex-shrink-0 rounded-full transition-all hover:bg-slate-100 text-slate-400 cursor-pointer";

  const moveToTheNextImage = () => {
    if (selectedIndex < images.length - 1) {
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
    if (selectedIndex === -1) return;

    setSelectedPicture(images[selectedIndex]);
    setSelectedVariantPicture([]);
  }, [selectedIndex]);

  const isVeryLargeDevices = useMediaQuery("(min-width:1024px)");
  const isLargeDevices = useMediaQuery("(max-width:1024px)");
  const isSmallDevices = useMediaQuery("(max-width:640px)");

  const imagesToMapOver = selectedVariantPicture.length
    ? selectedVariantPicture
    : images;

  useEffect(() => {
    //So It triggers a rerender no matter what index of item is clicked same or not
    if (selectedVariantPicture.length) setSelectedIndex(-1);
  }, [selectedVariantPicture]);

  return (
    <div className="relative flex items-start gap-2 max-lg:justify-start lg:flex-col">
      <div className="relative hidden h-72 w-72 overflow-hidden rounded-sm max-lg:order-2 lg:block xl:h-80 xl:w-80">
        <Image
          src={selectedVariantPicture[0] || selectedPicture || mainImage || ""}
          alt="Product Picture"
          className="object-cover"
          fill
        />
      </div>

      <div className="flex w-full gap-6">
        <div className="hidden h-80 flex-col flex-wrap gap-4 md:flex lg:hidden">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="relative h-16 w-[60px] cursor-pointer overflow-hidden rounded-sm"
            >
              <ProductImage src={img} />
            </div>
          ))}
        </div>

        <div className="h-fit w-full lg:hidden">
          <Carousel
            onChange={(index) => {
              setSelectedIndex(index);
            }}
            preventMovementUntilSwipeScrollTolerance
            swipeScrollTolerance={50}
            selectedItem={selectedVariantPicture.length ? 0 : selectedIndex}
            showArrows={!isSmallDevices}
            showStatus={false}
            swipeable={true}
          >
            {imagesToMapOver.map((img, i) => (
              <div
                key={img}
                className="relative aspect-1 h-auto w-full sm:aspect-[16/9]"
              >
                <Image
                  src={img || ""}
                  alt="Product Picture"
                  loading={i === 0 ? "eager" : "lazy"}
                  className=" object-cover"
                  fill
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {isVeryLargeDevices && images?.length !== 0 && (
        <div className="flex h-auto w-72 items-center justify-center gap-1 lg:items-center xl:w-80">
          <HiChevronLeft
            onClick={moveToThePreviousImage}
            className={chevronsClassName}
          />

          <Carousel
            centerMode
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            showIndicators={false}
            selectedItem={selectedIndex}
            centerSlidePercentage={100 / displayCount}
          >
            {images.map((image: string, i) => (
              <div
                onClick={() => {
                  if (selectedIndex !== i) {
                    setSelectedIndex(i);
                  } else {
                    setSelectedPicture(image);
                    setSelectedVariantPicture([]);
                  }
                }}
                key={i}
                className={clsx(
                  "relative h-14 w-14 flex-shrink-0 cursor-pointer xl:h-16 xl:w-16",
                  i === selectedIndex && "border-2 border-slate-500",
                )}
              >
                <Image src={image} alt="Image" fill className="object-cover" />
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
  );
};
