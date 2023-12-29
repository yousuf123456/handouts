import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const PlacholderImage = ({
  className,
  ContainerCs,
  placeholderImage,
}: {
  className: string;
  ContainerCs?: string;
  placeholderImage?: string;
}) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-sm bg-blue-100",
        ContainerCs,
      )}
    >
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className={className}
        alt="Placeholder Image"
        src={placeholderImage || "/images/placeholders/imagePlaceholder.jpg"}
      />
    </div>
  );
};
