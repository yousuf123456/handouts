import { FormImageType } from "@/app/user/myReviews/write-review/components/WriteReviewForm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderRequestsState {
  selectedOrderedProducts: {
    packageId: string;
    orderedProductId: string;
    reason: string;
  }[];
  feedback: string;
  isAgreedToPolicies: boolean;
  proofImages: FormImageType[];
}

const initialState: OrderRequestsState = {
  selectedOrderedProducts: [],
  isAgreedToPolicies: false,
  proofImages: [],
  feedback: "",
};

type SelectPayloadType = {
  orderedProductId: string;
  packageId: string;
  reason: string;
};

type UnselectPayloadType = {
  packageId: string;
  orderedProductId: string;
};

const OrderRequestsSlice = createSlice({
  name: "cancellationRequest",
  initialState,
  reducers: {
    selectOrderedProduct: (state, action: PayloadAction<SelectPayloadType>) => {
      state.selectedOrderedProducts.push(action.payload);
    },

    unselectOrderedProduct: (
      state,
      action: PayloadAction<UnselectPayloadType>,
    ) => {
      state.selectedOrderedProducts = state.selectedOrderedProducts.filter(
        (orderedProduct) =>
          orderedProduct.orderedProductId !== action.payload.orderedProductId,
      );
    },

    setRequestReason: (state, action: PayloadAction<SelectPayloadType>) => {
      state.selectedOrderedProducts = state.selectedOrderedProducts.map(
        (orderedProduct) => {
          if (
            orderedProduct.packageId === action.payload.packageId &&
            orderedProduct.orderedProductId === action.payload.orderedProductId
          ) {
            return {
              ...orderedProduct,
              reason: action.payload.reason,
            };
          }
          return orderedProduct;
        },
      );
    },

    setRequestReasonForAll: (state, action: PayloadAction<string>) => {
      state.selectedOrderedProducts = state.selectedOrderedProducts.map(
        (orderedProduct) => {
          return {
            ...orderedProduct,
            reason: action.payload,
          };
        },
      );
    },

    setFeedback: (state, action: PayloadAction<string>) => {
      state.feedback = action.payload;
    },

    setIsAgreedToPolicies: (state, action: PayloadAction<boolean>) => {
      state.isAgreedToPolicies = action.payload;
    },

    addProofImage: (state, action: PayloadAction<File>) => {
      const file = action.payload;
      const imageUrl = URL.createObjectURL(file);

      state.proofImages.push({ url: imageUrl, file });
    },

    removeProofImage: (state, action: PayloadAction<string>) => {
      const imageUrl = action.payload;
      state.proofImages = state.proofImages.filter(
        (img) => img.url !== imageUrl,
      );
    },
  },
});

export default OrderRequestsSlice.reducer;
export const {
  setFeedback,
  addProofImage,
  removeProofImage,
  setRequestReason,
  selectOrderedProduct,
  setIsAgreedToPolicies,
  setRequestReasonForAll,
  unselectOrderedProduct,
} = OrderRequestsSlice.actions;
