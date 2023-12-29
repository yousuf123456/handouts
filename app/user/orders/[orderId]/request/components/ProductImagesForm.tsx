"use client";

import React from "react";
import { Heading } from "./Heading";
import { ReviewImages } from "@/app/user/myReviews/write-review/components/ReviewImages";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import {
  addProofImage,
  removeProofImage,
} from "@/app/store/features/orderRequestsSlice";
import axios from "axios";

interface ProductImagesFormProps {}

export const ProductImagesForm: React.FC<ProductImagesFormProps> = ({}) => {
  const images = useAppSelector((state) => state.orderRequests.proofImages);
  const dispatch = useAppDispatch();

  const addImage = (file: File) => {
    dispatch(addProofImage(file));
  };

  const removeImage = (imageUrl: string) => {
    const imageToRemove = images.filter((img) => img.url === imageUrl)[0];

    if (imageToRemove.file) {
      return dispatch(removeProofImage(imageUrl));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Heading>Upload Order Pictures</Heading>

        <p className="font-text text-sm text-black">
          Upload some products images as a proof to return the ordered product
        </p>
      </div>

      <ReviewImages
        images={images}
        addImage={addImage}
        removeImage={removeImage}
      />
    </div>
  );
};
