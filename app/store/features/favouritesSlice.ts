
import { Cart_FavouriteItemProductType, CartItemType } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FavouritesState {
    favouritesItems : Cart_FavouriteItemProductType[],
    hasBeenFetched : boolean
};

const initialState : FavouritesState = {
    favouritesItems : [],
    hasBeenFetched : false
};


const FavouritesSlice = createSlice({
    name : "favourites",
    initialState,
    reducers : {
        setFavouriteItems : (state, action : PayloadAction<Cart_FavouriteItemProductType[]>) => {
            state.favouritesItems = action.payload
        },

        addFavouriteItem : (state, action : PayloadAction<Cart_FavouriteItemProductType>) => {
            state.favouritesItems.push(action.payload)
        },

        deleteFavouriteItem : (state, action : PayloadAction<string>) => {
            state.favouritesItems = state.favouritesItems.filter((favouriteItem) => favouriteItem.id !== action.payload);
        },

        setHasBeenFetched : (state, action : PayloadAction<boolean>) => {
            state.hasBeenFetched = action.payload
        }
    }
});

export default FavouritesSlice.reducer

export const { 
    setFavouriteItems,
    addFavouriteItem,
    deleteFavouriteItem,
    setHasBeenFetched

} = FavouritesSlice.actions 