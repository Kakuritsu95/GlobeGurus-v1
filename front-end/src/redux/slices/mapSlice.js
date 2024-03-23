import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapCenter: [41.13488, 24.888],
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapCenter: (state, action) => {
      state.mapCenter = action.payload;
    },
  },
});

export const getMapCenter = (store) => store.map.mapCenter;
export const { setMapCenter } = mapSlice.actions;
export default mapSlice.reducer;
