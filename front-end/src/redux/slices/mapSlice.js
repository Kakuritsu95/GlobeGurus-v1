import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapCenter: [],
  switcher: false,
  showMapOnSmallScreens: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapCenter: (state, action) => {
      state.mapCenter = action.payload;
    },
    triggerMapMove: (state) => {
      state.switcher = !state.switcher;
    },
    toggleShowMap: (state) => {
      state.showMapOnSmallScreens = !state.showMapOnSmallScreens;
    },
  },
});

export const { setMapCenter, triggerMapMove, toggleShowMap } = mapSlice.actions;
export default mapSlice.reducer;
