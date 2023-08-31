import React from "react";

import Image from "next/image";
import clsx from "clsx";

interface ReturnRequestProofsProps {
  feedback: string | null;
  proofImages: string[];
  size?: string;
}

export const ReturnRequestProofs: React.FC<ReturnRequestProofsProps> = ({
  size,
  feedback,
  proofImages,
}) => {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3
          className={clsx(
            "font-text font-semibold text-black",
            size === "large" ? "text-sm sm:text-base" : " text-xs sm:text-sm",
          )}
        >
          Your Feedback
        </h3>

        <div>
          <p
            className={clsx(
              " text-black",
              size === "large" ? "text-sm sm:text-base" : "text-xs sm:text-sm",
            )}
          >
            {feedback}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {proofImages.map((img) => (
          <div
            key={img}
            className={clsx(
              "relative overflow-hidden rounded-[2px]",
              size === "large"
                ? " h-20 w-20 sm:h-24 sm:w-24"
                : "h-16 w-16 sm:h-20 sm:w-20",
            )}
          >
            <Image src={img || ""} className="object-cover" alt="Image" fill />
          </div>
        ))}
      </div>
    </div>
  );
};
