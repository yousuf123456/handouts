import { Avatar } from "@/app/components/Avatar";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { HiChevronRight } from "react-icons/hi";

interface StoreInfoCTAProps {
  ratingsCount: number;
  posRatings: number;
  logo: string | null;
  storeName: string;
}

export const StoreInfoCTA: React.FC<StoreInfoCTAProps> = ({
  logo,
  storeName,
  posRatings,
  ratingsCount,
}) => {
  const onClick = () => {
    const storeInfoElement = document.getElementById("storeInfo");
    const top = storeInfoElement?.getBoundingClientRect().top! + window.scrollY;

    window.scrollTo({
      top: top! - 50,
      behavior: "smooth",
    });
  };

  const avgPosRating = Math.round(posRatings / ratingsCount) * 100 || 0;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer border-t-[1px] py-3 sm:hidden"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            <Avatar image={logo} />
          </div>

          <p className="line-clamp-1 font-text text-sm font-semibold text-black">
            {storeName}
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          <Badge variant="outline">{avgPosRating + "% Pos Reviews"}</Badge>

          <HiChevronRight className="h-4 w-4 text-black" />
        </div>
      </div>
    </div>
  );
};
