"use client";
import React, { useState } from "react";

import Image from "next/image";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import { FaCamera, FaTimes } from "react-icons/fa";
import AlertDialogModel from "@/app/components/AlertDialog";

interface ReviewImagesProps {
  images: string[];
  addImage: (img: string) => void;
  removeImage: (img: string) => void;
}

export const ReviewImages: React.FC<ReviewImagesProps> = ({
  images,
  addImage,
  removeImage,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onUpload = (e: any) => {
    setIsLoading(true);

    let body = new FormData();
    body.set("key", "dfce0e9f3d172e7100f25d5ba46f21a0");
    body.append("image", e.target.files[0]);

    axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    })
      .then((res) => {
        addImage(res.data.data.url);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const onClick = () => {
    const uploadInput = document.getElementById("upload");
    if (uploadInput && !isLoading) uploadInput.click();
  };

  const onRemovePic = (img: string) => {
    removeImage(img);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <input type="file" onChange={onUpload} id="upload" hidden />
        {images.map((img) => (
          <div key={img} className="relative h-[72px] w-[72px] md:h-20 md:w-20">
            <Image
              src={img}
              alt="Image"
              className="rounded-[2px] object-cover"
              fill
            />

            <AlertDialogModel
              title="Remove Picture ?"
              desc="Do you really want to remove this picture ?"
              action={() => onRemovePic(img)}
            >
              <FaTimes className="absolute -right-1 -top-1 h-4 w-4 cursor-pointer rounded-full bg-red-400 text-white" />
            </AlertDialogModel>
          </div>
        ))}
        <div
          className="flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-sm border-2 border-dashed border-themeBlue md:h-20 md:w-20"
          onClick={onClick}
        >
          {isLoading ? (
            <CircularProgress size="1rem" className="text-themeBlue" />
          ) : (
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <FaCamera className="h-6 w-6 text-themeBlue md:h-7 md:w-7" />
              <p className="break-words font-text text-[10px] text-themeBlue max-md:w-[64px] max-md:text-center">
                Upload Photo
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
