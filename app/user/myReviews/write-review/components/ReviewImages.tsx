"use client";
import React, { useState } from "react";

import Image from "next/image";

import { FaCamera, FaTimes } from "react-icons/fa";
import AlertDialogModel from "@/app/components/AlertDialog";
import { FormImageType } from "./WriteReviewForm";
import { Loader2 } from "lucide-react";

interface ReviewImagesProps {
  images: FormImageType[];
  addImage: (file: File) => void;
  removeImage: (img: string) => void;
}

export const ReviewImages: React.FC<ReviewImagesProps> = ({
  images,
  addImage,
  removeImage,
}) => {
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    addImage(file);
  };

  const onClick = () => {
    const uploadInput = document.getElementById("upload");
    if (uploadInput) uploadInput.click();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <input type="file" onChange={onUpload} id="upload" hidden />
        {images.map((img, i) => (
          <div
            key={i}
            className="relative flex h-[72px] w-[72px] items-center rounded-sm bg-slate-200 md:h-20 md:w-20"
          >
            {img.isDeleting && (
              <div className="absolute inset-0 z-[99] flex flex-col items-center justify-center gap-1 bg-black bg-opacity-60">
                <p className="font-roboto text-sm text-white">Deleting</p>

                <Loader2 className="h-5 w-5 animate-spin text-white" />
              </div>
            )}

            <Image
              width={0}
              height={0}
              alt="Image"
              sizes="100vw"
              src={img.url}
              className="h-auto w-full"
            />

            {!img.isDeleting && (
              <AlertDialogModel
                title="Remove Picture ?"
                desc="Do you really want to remove this picture ?"
                action={() => removeImage(img.url)}
              >
                <FaTimes className="absolute -right-1 -top-1 h-4 w-4 cursor-pointer rounded-full bg-red-500 text-white" />
              </AlertDialogModel>
            )}
          </div>
        ))}
        <div
          className="flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-sm border-2 border-dashed border-themeBlue md:h-20 md:w-20"
          onClick={onClick}
        >
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <FaCamera className="h-6 w-6 text-themeBlue md:h-7 md:w-7" />
            <p className="break-words font-text text-[10px] text-themeBlue max-md:w-[64px] max-md:text-center">
              Upload Photo
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
