import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import OrderRequestsReducer from "./features/orderRequestsSlice";
import ProductMinorInfoReducer from "./features/productMinorInfoSlice"
import SelectedFacetsReducer from "./features/selectedFacetsSlice";
import AddressDiaryReducer from "./features/addressDiarySlice";
import FavouritesReducer from "./features/favouritesSlice";
import ShippingReducer from "./features/shippingSlice";
import CartReducer from "./features/cartSlice";


export const store = configureStore({
    reducer : {
        orderRequests : OrderRequestsReducer,
        productMinorInfo : ProductMinorInfoReducer,
        selectedFacets : SelectedFacetsReducer,
        addressDiary : AddressDiaryReducer,
        favourites : FavouritesReducer,
        shipping : ShippingReducer,
        cart : CartReducer,
    },

    devTools : true
})


export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: ()=>typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;


