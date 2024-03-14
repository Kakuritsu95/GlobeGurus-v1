import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import loadingReducer from "../ui/loadindSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    status: loadingReducer,
  },
});

export default store;
