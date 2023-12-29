import React from "react";
import { SectionHeading } from "./SectionHeading";
import { ReviewImages } from "../ReviewImages";
import { FormImageType } from "../WriteReviewForm";
import axios from "axios";

interface AddImagesProps {
  images: FormImageType[];
  isEditingReview: boolean;
  reviewId: string | undefined;
  bucketId: string | undefined;
  reviewImagesData: { id: string; url: string }[] | undefined;
  setImages?: React.Dispatch<React.SetStateAction<FormImageType[]>>;
}

export const AddImages: React.FC<AddImagesProps> = ({
  images,
  reviewId,
  bucketId,
  setImages,
  isEditingReview,
  reviewImagesData,
}) => {
  const addImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);

    setImages && setImages((prev) => [...prev, { url: imageUrl, file }]);
  };

  const removeImage = (imageUrl: string) => {
    const imageToRemove = images.filter((img) => img.url === imageUrl)[0];

    if (!isEditingReview || imageToRemove.file) {
      return (
        setImages &&
        setImages((prev) => prev.filter((img) => img.url !== imageUrl))
      );
    }

    const imageData = reviewImagesData?.filter(
      (imgData) => imgData.url === imageUrl,
    )[0];

    setImages &&
      setImages((prev) =>
        prev.map((img) => {
          if (img.url === imageUrl) {
            return {
              ...img,
              isDeleting: true,
            };
          }
          return img;
        }),
      );

    const newReviewImages = images
      .filter((img) => img.url !== imageUrl)
      .map((imgData) => imgData.url);

    const newReviewImagesData = reviewImagesData?.filter(
      (imgData) => imgData.url !== imageUrl,
    );

    axios
      .post("../../../../../api/deleteReviewImage", {
        reviewImagesData: newReviewImagesData,
        reviewImages: newReviewImages,
        imageUrl: imageData?.url,
        imageId: imageData?.id,
        bucketId,
        reviewId,
      })
      .then(() => {
        setImages &&
          setImages((prev) => prev.filter((img) => img.url !== imageUrl));
      });
  };

  return (
    <div className="flex items-start gap-3 rounded-md border-[1px] border-slate-300 p-3 max-sm:flex-col sm:gap-8 md:gap-16">
      <SectionHeading>Add Order Pictures / Images</SectionHeading>

      <ReviewImages
        images={images}
        addImage={addImage}
        removeImage={removeImage}
      />
    </div>
  );
};
