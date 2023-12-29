import {
  CancellationRequest,
  Order,
  OrderedProduct,
  Package,
  Prisma,
  Product,
  ReturnRequest,
  ratingAndReview,
  question,
} from "@prisma/client";

export type fullCategoryDiscountedProductType = Product & {};

export type ProductCardType = {
  superTokensUserId: string;
  ratingsCount: number;
  avgRating: number;
  image: string;
  price: number;
  name: string;
  id: string;
  description: string;
  attributes: any;
  keywords: string[];
  categoryTreeData: any;
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
  ratingAndReviews: HistoryReviewType[];
};

export type FullProductType = Product & {};

export type ProductInfo = Product & {
  store: {
    ratingsCount: number;
    logo: string | null;
    name: string | null;
    posRatings: number;
    neuRatings: number;
    negRatings: number;
    createdAt: Date;
    id: string;
  };
};

export type CardProductType = {
  id: string;
  name: string;
  price: number;
  image: string | null;
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
  promoPrice?: number;
  promoPriceEndingDate?: Date;
  promoPriceStartingDate?: Date;
};

export type CartItemProductType = {
  id: string;
  name: string;
  price: number;
  storeId: string;
  storeName: string;
  image: string | null;
  category: string | null;
  superTokensUserId: string;
  promoPrice: number | null;
  promoPriceEndingDate: Date | null;
  promoPriceStartingDate: Date | null;
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
  price: number;
  image: string | null;
  promoPrice: number | null;
  promoPriceEndingDate: Date | null;
  promoPriceStartingDate: Date | null;
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
  storeId: string;
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

export type HistoryReviewType = ratingAndReview & {
  _id: ObjectId;
  bucketId: string;
  userId: ObjectId;
  storeId: ObjectId;
  productId: ObjectId;
  createdAt: MongoDate;
  answeredAt: MongoDate;
  orderedProductId: ObjectId;
  userInformation: {
    name: string;
    image: string;
  };
};

export type QuestionType = question & {
  _id: ObjectId;
  userId: ObjectId;
  createdAt: MongoDate;
  answeredAt?: MongoDate;
};

export type ObjectId = { $oid: string };

export type MongoDate = { $date: string };

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

export type VoucherType = {
  _id: { $oid: string };
  createdAt: Date;
  usedBy: string[];
  storeId: string;
  voucherName: string;
  voucherCode?: string;
  productIds: string[];
  vouchersUsed: number;
  minOrderValue: number;
  totalVouchers: number;
  discountOffValue: number;
  endingDate: { $date: Date };
  startingDate: { $date: Date };
  usageLimitPerCustomer: number;
  maxDiscountValue: number | null;
  collectStartDate: { $date: Date };
  voucherType: "Collectible Voucher" | "Voucher Code";
  discountType: "Money Value" | "Percentage Value";
  applicableOn: "Entire Store" | "Specific Products";
};

export type BundleType = {
  _id: { $oid: string };
  endingDate: Date;
  createdAt: Date;
  promoName: string;
  startingDate: Date;
  productIds: string[];
  giftProductIds: string[];
  comboProductIds: string[];
  discountType: "Percentage Value" | "Money Value";
  promoType: "Quantity" | "Buy 1 Get 1 Free" | "Free Gift" | "Combo";
  quantityBundleConditions: { quantity: number; discountOffValue: number }[];
};

export type FreeShippingType = {
  _id: { $oid: string };
  budget: number;
  productIds: string[];
  createdAt: MongoDate;
  promotionName: string;
  minOrderValue: number;
  endingDate: MongoDate;
  startingDate: MongoDate;
  condition: "No Condition" | "Min Order Value";
  applicableOn: "Entire Store" | "Specific Products";
};

export type LayoutComponentType = {
  data: any;
  name: string;
  pcOnly: boolean;
  movable: boolean;
  mobileOnly: boolean;
  componentName: string;
  dataFormComponentName: string;
  withoutModuleHeading?: boolean;
};

export type StorePageType = {
  id: string;
  name: string;
  createdAt: Date;
  publishedAt: Date;
  isPublished: Boolean;
  layout: LayoutComponentType[];
};
