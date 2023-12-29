import React from "react";
import Model from "@mui/material/Modal";

import Image from "next/image";

interface ImageModelProps {
  open: boolean;
  image: string;
  handleClose: any;
}

export const ImageModel: React.FC<ImageModelProps> = ({
  open,
  image,
  handleClose,
}) => {
  return (
    <Model open={open}>
      <div
        onClick={handleClose}
        className="flex h-full w-full items-center justify-center"
      >
        <div className="relative h-full w-[85%] sm:w-[75%]">
          <Image
            fill
            width={0}
            height={0}
            alt="Image"
            src={image}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </Model>
  );
};
