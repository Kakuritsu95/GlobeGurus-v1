import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "../../helpers/deleteCoookies";

const initialState = {
  email: "",
  username: "",
  avatar: "",
  id: "",
  bookmarks: [],
  createdAt: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action) => {
      const { username, email, avatarUrl, id, bookmarks, createdAt } =
        action.payload;
      state.username = username;
      state.email = email;
      state.avatar = avatarUrl;
      state.id = id;
      state.bookmarks = bookmarks;
      state.createdAt = createdAt;
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    logoutUser: () => {
      deleteCookie("authToken");
      return initialState;
    },
  },
});

export const getUserId = (store) => store.user.id;

export const { initializeUser, updateAvatar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
