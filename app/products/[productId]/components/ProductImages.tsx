import React, { useEffect, useState } from "react";

import Image from "next/image";
import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

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
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPicture, setSelectedPicture] = useState("");

  const moveToTheNextImage = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedIndex((prev) => prev + 1);
      if (api) api.scrollNext();
    }
  };

  const moveToThePreviousImage = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
      if (api) api.scrollPrev();
    }
  };

  useEffect(() => {
    // Make it real
    if (selectedIndex === -1) return;

    setSelectedPicture(images[selectedIndex]);
    setSelectedVariantPicture([]);
  }, [selectedIndex]);

  const isVeryLargeDevices = useMediaQuery("(min-width:1024px)");
  const isMediumDevices = useMediaQuery("(max-width:768px)");

  const imagesToMapOver = selectedVariantPicture.length
    ? selectedVariantPicture
    : images;

  useEffect(() => {
    //So It triggers a rerender no matter what index of item is clicked same or not
    if (selectedVariantPicture.length) setSelectedIndex(-1);
  }, [selectedVariantPicture]);

  useEffect(() => {
    console.log(isMediumDevices);
    if (!api || !isMediumDevices) return;

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative flex  gap-2 max-lg:justify-start lg:flex-col">
      <div className="relative hidden aspect-[16/9] h-auto w-full overflow-hidden rounded-sm max-lg:order-2 md:block lg:h-72 lg:w-72 xl:h-80 xl:w-80">
        <Image
          src={selectedVariantPicture[0] || selectedPicture || mainImage || ""}
          alt="Product Picture"
          className="object-cover"
          fill
        />
      </div>

      <div className="relative w-full md:hidden">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {imagesToMapOver.map((img, i) => (
              <CarouselItem key={i}>
                <div
                  key={img}
                  className="relative aspect-1 h-auto w-full sm:aspect-[16/9]"
                >
                  <Image
                    src={img || ""}
                    alt="Product Picture"
                    loading={"eager"}
                    className=" object-cover"
                    fill
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3">
          {Array.from({ length: images.length || 0 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 w-2 rounded-full bg-black opacity-30",
                i === selectedIndex && "opacity-90",
              )}
            />
          ))}
        </div>
      </div>

      {!isMediumDevices && images?.length !== 0 && (
        <div className="hidden justify-center max-lg:flex-col md:flex lg:ml-3 lg:w-full">
          <Carousel
            orientation={isVeryLargeDevices ? "horizontal" : "vertical"}
            className="max-lg:h-[192px] lg:w-[80%]"
            setApi={setApi}
          >
            <CarouselContent className="max-lg:-mt-0 max-lg:h-[192px]">
              {images.map((image, i) => (
                <CarouselItem
                  key={i}
                  className="basis-1/3 p-1 max-lg:items-center lg:flex lg:justify-end"
                >
                  <div
                    onClick={() => {
                      if (selectedIndex !== i) {
                        setSelectedIndex(i);
                        if (api) api.scrollTo(i);
                      } else {
                        setSelectedPicture(image);
                        setSelectedVariantPicture([]);
                      }
                    }}
                    key={i}
                    className={clsx(
                      "relative h-14 w-14 flex-shrink-0 cursor-pointer xl:h-16 xl:w-16",
                      i === selectedIndex &&
                        "rounded-sm ring-[1px] ring-blue-500 ring-offset-2",
                    )}
                  >
                    <Image
                      fill
                      src={image}
                      alt="Image"
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              disabled={selectedIndex === 0}
              onClick={moveToThePreviousImage}
            />

            <CarouselNext
              className="z-[9999]"
              disabled={selectedIndex === images.length - 1}
              onClick={moveToTheNextImage}
            />
          </Carousel>
        </div>
      )}
    </div>
  );
};
