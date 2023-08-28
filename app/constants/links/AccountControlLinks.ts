import { getRoutes } from "@/app/utils/getRoutes";
import { Book, Cross, Phone } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import { HiDocument, HiQuestionMarkCircle, HiStar } from "react-icons/hi";
import {
  RiArrowGoBackLine,
  RiHeartLine,
  RiMapLine,
  RiProfileLine,
  RiStarLine,
  RiTruckLine,
  RiUserLocationLine,
} from "react-icons/ri";

const {
  toBeReviewdReviews,
  cancellations,
  addressDiary,
  favourites,
  profile,
  returns,
  orders,
} = getRoutes();

export const getAccountControlLinks = () => [
  {
    label: "Profile",
    href: profile,
    icon: RiProfileLine,
  },
  {
    label: "My Orders",
    href: orders,
    icon: RiTruckLine,
  },
  {
    label: "My Returns",
    href: returns,
    icon: RiArrowGoBackLine,
  },
  {
    label: "My Cancellations",
    href: cancellations,
    icon: FaTimes,
  },
  {
    label: "My Reviews",
    href: toBeReviewdReviews,
    icon: RiStarLine,
  },
  {
    label: "My Favourites",
    href: favourites,
    icon: RiHeartLine,
  },
  {
    label: "Address Diary",
    href: addressDiary,
    icon: RiMapLine,
  },
  {
    label: "Policies",
    href: "",
    icon: Book,
  },
  {
    label: "Help Center",
    href: "",
    icon: HiQuestionMarkCircle,
  },
  {
    label: "Chat with us",
    href: "",
    icon: Phone,
  },
];
