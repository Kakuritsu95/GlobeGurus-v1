import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "isLoading",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setIdle: () => initialState,
  },
});

export const { setLoading, setIdle } = loadingSlice.actions;

export default loadingSlice.reducer;
