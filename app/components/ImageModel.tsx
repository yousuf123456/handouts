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
        <div className="relative max-sm:aspect-1 max-sm:h-auto max-sm:w-[85%] sm:h-96 sm:w-96">
          <Image src={image} alt="Image" className="object-cover" fill />
        </div>
      </div>
    </Model>
  );
};
