
import { AddressType } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ShippingState {
    selectedShippingAddress : AddressType | undefined;
    selectedBillingAddress : AddressType | undefined;
    email : string | null | undefined;
};

const initialState : ShippingState = {
    selectedBillingAddress : undefined,
    selectedShippingAddress : undefined,
    email : undefined
};

const ShippingSlice = createSlice({
    name : "shipping",
    initialState,
    reducers : {
        setSelectedBillingAddress : (state, action: PayloadAction<AddressType | undefined>) => {
            state.selectedBillingAddress = action.payload
        },

        setSelectedShippingAddress : (state, action: PayloadAction<AddressType | undefined>) => {
            state.selectedShippingAddress = action.payload
        },

        setEmail : (state, action: PayloadAction<string | null | undefined>) => {
            state.email = action.payload
        },
    }
});

export default ShippingSlice.reducer
export const {
    setSelectedBillingAddress,
    setSelectedShippingAddress,
    setEmail
} = ShippingSlice.actions