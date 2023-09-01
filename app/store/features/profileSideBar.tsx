import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileSidebarState {
  open: boolean;
}

const initialState: ProfileSidebarState = {
  open: false,
};

type PayloadType = boolean;

const ProfileSidebarSlice = createSlice({
  name: "profileSidebar",
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<PayloadType>) => {
      state.open = action.payload;
    },
  },
});

export default ProfileSidebarSlice.reducer;
export const { setSidebarOpen } = ProfileSidebarSlice.actions;
