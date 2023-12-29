import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { find } from "lodash";

interface selectedFacetsState {
  facets: {
    [key: string]: string[];
  };
}

const initialState: selectedFacetsState = {
  facets: {},
};

interface PayloadType {
  [key: string]: string;
}

const SelectedFacetsSlice = createSlice({
  name: "selectedFacets",
  initialState,
  reducers: {
    addSelectedFacet: (state, action: PayloadAction<PayloadType>) => {
      const key = Object.keys(action.payload)[0];
      const value = action.payload[key];

      if (state.facets.hasOwnProperty(key)) {
        state.facets[key].push(value);
      } else {
        state.facets[key] = [value];
      }
    },

    removeselectedFacet: (state, action: PayloadAction<PayloadType>) => {
      const key = Object.keys(action.payload)[0];
      if (action.payload["removeAll"] === "true") delete state.facets[key];

      if (state.facets[key]?.length > 1) {
        state.facets[key] = state.facets[key].filter(
          (value) => value !== action.payload[key],
        );
      } else delete state.facets[key];
    },

    setSelectedFacets: (state, action: PayloadAction<PayloadType>) => {
      Object.keys(action.payload).map((key) => {
        if (key === "from") return;
        const values = action.payload[key].split(",");

        if (key !== "q" && key !== "section") {
          state.facets[key] = values;
        }
      });
    },
  },
});

export default SelectedFacetsSlice.reducer;
export const { addSelectedFacet, removeselectedFacet, setSelectedFacets } =
  SelectedFacetsSlice.actions;
