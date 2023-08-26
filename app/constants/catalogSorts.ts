import { FaFire } from "react-icons/fa";
import { RiPriceTag3Line, RiFireLine } from "react-icons/ri";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { BsClock } from "react-icons/bs";

export const catalogSorts = [
  {
    name: "Top Sales",
    value: "order",
    icon: [RiFireLine],
  },

  {
    name: "Price",
    value: "price-up",
    icon: [HiChevronUp, HiChevronDown],
  },

  {
    name: "Top Ranked",
    value: "avgRating",
    icon: [RiPriceTag3Line],
  },

  {
    name: "New",
    value: "createdAt",
    icon: [BsClock],
    size: "w-[14px] h-[14px]",
  },
];
