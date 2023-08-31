import React from "react";
import { SectionHeading } from "./SectionHeading";
import { ReviewImages } from "../ReviewImages";

interface AddImagesProps {
  images: string[];
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AddImages: React.FC<AddImagesProps> = ({ images, setImages }) => {
  const addImage = (img: string) => {
    setImages && setImages((prev) => [...prev, img]);
  };

  const removeImage = (img: string) => {
    const updatedImages = images?.filter((image) => image !== img);

    setImages && setImages(updatedImages || []);
  };

  return (
    <div className="flex items-start gap-16 rounded-md border-[1px] border-slate-300 p-3">
      <SectionHeading>Add Order Pictures / Images</SectionHeading>

      <ReviewImages
        images={images}
        addImage={addImage}
        removeImage={removeImage}
      />
    </div>
  );
};
