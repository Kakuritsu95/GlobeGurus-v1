import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  avatar: "",
  id: "",
  bookmarks: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action) => {
      const { username, email, avatarUrl, id } = action.payload;
      state.name = username;
      state.email = email;
      state.avatar = avatarUrl;
      state.id = id;
    },
    logoutUser: () => initialState,
  },
});

export const getUserId = (store) => store.user.id;

export const { initializeUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
