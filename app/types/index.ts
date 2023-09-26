import {
  CancellationRequest,
  Discount,
  Order,
  OrderedProduct,
  Package,
  Prisma,
  Product,
  RatingAndReview,
  ReturnRequest,
} from "@prisma/client";

export type fullCategoryDiscountedProductType = Product & {
  discount: Discount | null;
};

export type ProductCardType = {
  discount: Discount | null;
  superTokensUserId: string;
  ratingsCount: number;
  avgRating: number;
  image: string;
  price: number;
  name: string;
  id: string;
};

type MGdiscount = {
  _id: { $oid: string };
  name: string;
  isPercentOff: boolean;
  percentOff: number;
  ammountOff: number;
  priceThreshold: number;
  startingDate: { $date: string };
  endingDate: { $date: string };
  createdAt: { $date: string };
  isApplicableForStore: boolean;
  storeId: { $oid: string };
};

export type searchedProduct = {
  _id: { $oid: string };
  name: string;
  image: string;
  price: number;
  discount: MGdiscount;
  store: {
    _id: { $oid: string };
    name: string;
    logo: string;
    createdAt: { $date: string };
    updatedAt: { $date: string };
    vendorId: { $oid: string };
  };
  ratingAndReviews: RatingAndReview[];
};

export type FullProductType = Product & {
  discount: Discount | null;
};

export type ProductInfo = Product & {
  discount: Discount | null;
  store: {
    ratingsCount: number;
    logo: string | null;
    name: string | null;
    posRatings: number;
    neuRatings: number;
    negRatings: number;
    createdAt: Date;
  };
};

export type CardProductType = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  discount: Discount | null;
  avgRating: number;
  ratingsCount: number;
};

export interface VariantsType {
  [key: string]: {
    title: string;
    [key: string]:
      | {
          title: string;
          images: string[];
        }
      | any;
  };
}

export type CombinationsType = {
  id: string;
  combination: {
    [key: string]: string;
  };
  price: number;
  stock: number;
  default?: boolean;
};

export type CartItemProductType = {
  id: string;
  name: string;
  price: number;
  storeId: string;
  storeName: string;
  image: string | null;
  category: string | null;
  discount: Discount | null;
  superTokensUserId: string;
};

export type CartItemType = {
  id?: string;
  quantity: number;
  selectedCombination: Prisma.JsonValue;
  userId?: string;
  productId?: string;
  product: CartItemProductType;
};

export type Cart_FavouriteItemProductType = {
  id: string;
  name: string;
  image: string | null;
  price: number;
  discount: Discount | null;
};

export type CategoriesType = {
  id: string;
  name: string;
  parentId?: string | null;
}[];

export interface IParams {
  q: string | undefined;
  from: string | undefined;
  sizes: string | undefined;
  brand: string | undefined;
  price: string | undefined;
  sortBy: string | undefined;
  rating: string | undefined;
  colors: string | undefined;
  category: string | undefined;
}

export interface FormatedCartItemType {
  storeId: string;
  storeName: string;
  cartItems: {
    quantity: number;
    selectedCombination: CombinationsType;
    product: CartItemProductType;
  }[];
}

export type AddressType = {
  _id: string;
  fullName: string;
  phone: string;
  address: string;
  landmark: string | null;
  province: string;
  city: string;
  area: string;
  type: "Home" | "Office";
  isDefaultShippingAddress: boolean;
  isDefaultBillingAddress: boolean;
};

export type OrderedProductType = {
  id: string;
  status: string;
  createdAt: Date;
  quantity: number;
  packageId: string;
  product: {
    id: string;
    name: string;
    storeId: string;
    category: string;
    storeName: string;
    image: string | null;
  };
  superTokensUserId: string;
  priceAtOrderTime: number;
  hasBeenReviewed: boolean;
  cancellationRequestId: string;
  returnRequestId: string;
  selectedCombination: Prisma.JsonValue;
  returnReason: string | null | undefined;
  cancellationReason: string | null | undefined;
};

export type HistoryReviewType = RatingAndReview & {
  product: {
    purchasedAt: Date;
    image: string | null;
    id: string;
    name: string;
    storeName: string;
  };
};

export type PackageType = Package & {
  orderedProducts: OrderedProduct[];
};

export type OrderType = Order & {
  packages: PackageType[];
};

export type CancellationRequestType = CancellationRequest & {
  orderedProducts: OrderedProductType[];
};

export type ReturnRequestType = ReturnRequest & {
  orderedProducts: OrderedProductType[];
};

export type StatusType =
  | "Payment Pending"
  | "Processing"
  | "Shipped"
  | "Delievered"
  | "Cancelled"
  | "Cancellation in Process";

export type ReturnStatusType =
  | "Return in Process"
  | "Approved"
  | "Rejected"
  | "Refund Pending"
  | "Refunded";

export type SellerAccountVerificationStepsType =
  | "Add Profile"
  | "Add Address"
  | "Verify Id & Bank";

export const cancellationSteps = ["Cancellation in Process", "Cancelled"];

export const returnSteps = [
  "Return in Process",
  "Approved",
  "Rejected",
  "Refund Pending",
  "Refunded",
];

export type PaymentMethods =
  | "EasyPaisa"
  | "Jazzcash"
  | "Credit/Debit Card"
  | "Cash on Delievery";
