import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "../../helpers/deleteCoookies";

const initialState = {
  email: "",
  username: "",
  avatar: "",
  id: "",
  bookmarks: [],
  createdAt: "",
  toggledGuideLikes: [],
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
    toggleLocalBookmark: (state, action) => {
      if (state.bookmarks.includes(action.payload)) {
        const indexOfBookmarkToRemove = state.bookmarks.findIndex(
          (bookmark) => bookmark === action.payload,
        );
        state.bookmarks.splice(indexOfBookmarkToRemove, 1);
      } else state.bookmarks.push(action.payload);
    },
    // initializeLikes: (state, action) => {
    //   action.payload.forEach((guide) => {
    //     if (state.localLikes.hasOwnProperty(guide._id)) return;
    //     if (guide.likes.includes(state.id)) state.localLikes[guide._id] = true;
    //     else state.localLikes[guide._id] = false;
    //   });
    // },
    toggleGuideLikes: (state, action) => {
      const existingGuideLikeIndex = state.toggledGuideLikes.findIndex(
        (id) => action.payload === id,
      );

      if (existingGuideLikeIndex === -1)
        state.toggledGuideLikes.push(action.payload);
      else state.toggledGuideLikes.splice(existingGuideLikeIndex, 1);
    },
    logoutUser: () => {
      deleteCookie("authToken");
      return initialState;
    },
  },
});

export const getUserId = (store) => store.user.id;

export const {
  initializeUser,
  updateAvatar,
  toggleLocalBookmark,
  toggleGuideLikes,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
