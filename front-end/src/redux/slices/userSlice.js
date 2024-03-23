import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  avatar: "",
  id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action) => {
      const { username, email, avatar, id } = action.payload;
      state.name = username;
      state.email = email;
      state.avatar = avatar;
      state.id = id;
    },
    logoutUser: (state, action) => {
      return initialState;
    },
  },
});

export const getUserId = (store) => store.user.id;

export const { initializeUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
