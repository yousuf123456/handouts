
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProductMinorInfoState {
    avgRating : number | undefined,
    ratingsCount : number | undefined,
    questionsCount : number | undefined,
    detailedRatingsCount : {
        [key : string] : number
    } | undefined
};

const initialState : ProductMinorInfoState = {
    avgRating : undefined,
    ratingsCount : undefined,
    questionsCount : undefined,
    detailedRatingsCount : undefined,
};

type PayloadType1 = number

type PayloadType2 = number

type PayloadType3 = number

type PayloadType4 = {
    [key : string] : number
}

const ProductSlice = createSlice({
    name : "productMinorInfo",
    initialState,
    reducers : {
        setAvgRating : (state, action: PayloadAction<PayloadType1>) => {
            state.avgRating = action.payload
        },

        setRatingsCount : (state, action: PayloadAction<PayloadType2>) => {
            state.ratingsCount = action.payload
        },

        setQuestionsCount : (state, action: PayloadAction<PayloadType3>) => {
            state.questionsCount = action.payload
        },

        setDetailedRatingsCount : (state, action: PayloadAction<PayloadType4>)=>{
            state.detailedRatingsCount = action.payload
        }
    }
});

export default ProductSlice.reducer
export const {
    setAvgRating, 
    setRatingsCount, 
    setQuestionsCount,
    setDetailedRatingsCount

} = ProductSlice.actions

