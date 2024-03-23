import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import loadingReducer from "../slices/loadingSlice";
import mapReducer from "../slices/mapSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    status: loadingReducer,
    map: mapReducer,
  },
});

export default store;
