//API ROUTES
const SERVER_URI = "http://localhost:7000";

export const API_ROUTES = {
  LOGIN: `${SERVER_URI}/auth/login`,
  SIGNUP: `${SERVER_URI}/auth/signup`,
  VERIFY_TOKEN: `${SERVER_URI}/auth/verify-token`,
  GUIDES: `${SERVER_URI}/guides`,
  USER_GUIDES: `${SERVER_URI}/guides/user`,
  ALL_GUIDES: `${SERVER_URI}/guides/all`,
  USER_BOOKMARKS: `${SERVER_URI}/auth/bookmarks`,
  NEARBY_PLACES: `${SERVER_URI}/nearby-places`,
  ADD_PLACE: (guideId) => `${SERVER_URI}/guides/${guideId}/place`,
  UPDATE_PLACE: (guideId, placeId) =>
    `${SERVER_URI}/guides/${guideId}/place/${placeId}`,
  DELETE_PLACE: (guideId, placeId) =>
    `${SERVER_URI}/guides/${guideId}/place/${placeId}`,
  TOGGLE_LIKE: (guideId) => `${SERVER_URI}/guides/${guideId}/like`,
  TOGGLE_BOOKMARK: (guideId) => `${SERVER_URI}/guides/${guideId}/bookmark`,
  COMMENT: (guideId) => `${SERVER_URI}/guides/${guideId}/comment`,
};

//APP ROUTES

export const APP_ROUTES = {
  GUIDES_PAGE: "guides/:userId",
  GUIDE_EDIT: "guides/edit",
  GUIDE_VIEW: "guides/view",
  SIGN_UP: "signup",
  LOGIN: "login",
};
