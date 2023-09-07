import React from "react";
import Image from "next/image";

interface ReviewImageCardProps {
  image: string;
  onClick: () => void;
}

export const ReviewImageCard: React.FC<ReviewImageCardProps> = ({
  image,
  onClick,
}) => {
  return (
    <div className="h-20 w-20 bg-slate-50">
      <div
        onClick={onClick}
        className="aspect-auto relative h-full w-full bg-slate-200"
      >
        <Image
          src={image}
          alt="Image"
          className="cursor-pointer object-cover"
          fill
        />
      </div>
    </div>
  );
};
