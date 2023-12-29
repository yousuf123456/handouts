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
      <div onClick={onClick} className="relative h-20 w-20 bg-slate-100">
        <Image
          width={"0"}
          height={"0"}
          src={image}
          alt="Image"
          sizes="100vw"
          className="h-auto w-full cursor-pointer"
        />
      </div>
    </div>
  );
};
