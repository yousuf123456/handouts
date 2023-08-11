import { AddressType } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { stat } from "fs";

interface AddressDiaryState {
    addressDiary : AddressType[];
    hasBeenFetched : boolean;
};

const initialState : AddressDiaryState = {
    addressDiary : [],
    hasBeenFetched : false
};

const AddressDiarySlice = createSlice({
    name : "addressDiary",
    initialState,
    reducers : {
        setAddressDiary : (state, action: PayloadAction<AddressType[]>) => {
            state.addressDiary = action.payload
        },

        setHasBeenFetched : (state, action: PayloadAction<boolean>) => {
            state.hasBeenFetched = action.payload
        },

        addAddress : (state, action: PayloadAction<AddressType>) => {
            const newAddress = action.payload;

            const oldAddressDiary = state.addressDiary;

            const updatedAddressDiary = oldAddressDiary.map((address)=> {
                const newIsDefaultBillingAddress = newAddress.isDefaultBillingAddress ? false : address.isDefaultBillingAddress
                const newIsDefaultShippingAddress = newAddress.isDefaultShippingAddress ? false : address.isDefaultShippingAddress
                return {
                    ...address, 
                    isDefaultBillingAddress : newIsDefaultBillingAddress, 
                    isDefaultShippingAddress : newIsDefaultShippingAddress
                }
            });
            updatedAddressDiary.push(newAddress)

            state.addressDiary = updatedAddressDiary
        },

        removeAddress : (state, action: PayloadAction<AddressType>) => {
            state.addressDiary = state.addressDiary.filter((address)=> address.address !== action.payload.address);
        },

        replaceWithNewAddress : (state, action: PayloadAction<AddressType>) => {
            const newAddress = action.payload;

            const oldAddressDiary = state.addressDiary;

            const updatedAddressDiary = oldAddressDiary.map((address)=> {
                if(address.address === newAddress.address) return newAddress

                const newIsDefaultBillingAddress = newAddress.isDefaultBillingAddress ? false : address.isDefaultBillingAddress
                const newIsDefaultShippingAddress = newAddress.isDefaultShippingAddress ? false : address.isDefaultShippingAddress
                return {
                    ...address, 
                    isDefaultBillingAddress : newIsDefaultBillingAddress, 
                    isDefaultShippingAddress : newIsDefaultShippingAddress
                }
            });

            state.addressDiary = updatedAddressDiary;
        }
    }
});

export default AddressDiarySlice.reducer
export const {
    replaceWithNewAddress,
    setHasBeenFetched,
    setAddressDiary,
    removeAddress,
    addAddress
} = AddressDiarySlice.actions