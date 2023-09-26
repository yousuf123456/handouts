"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React from "react";
import { Carousel } from "react-responsive-carousel";

export const CreateStoreSteps = () => {
  return (
    <div className="w-full">
      <Carousel axis="horizontal" showStatus={false}>
        {Array.from({ length: 5 }, (_, index) => (
          <div className="flex h-80 w-full items-center justify-center bg-themeBlue bg-opacity-50">
            <h1 className="font-text text-lg font-semibold text-white">
              Slides Here
            </h1>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
