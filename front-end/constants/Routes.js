//API ROUTES
const SERVER_URI = "http://localhost:7000/api";

export const API_ROUTES = {
  LOGIN: `${SERVER_URI}/auth/login`,
  SIGNUP: `${SERVER_URI}/auth/signup`,
  VERIFY_TOKEN: `${SERVER_URI}/auth/verify-token`,
  GET_USER_DETAILS: `${SERVER_URI}/auth/user-details`,
  GET_TOP_USERS: `${SERVER_URI}/auth/get-top-users`,
  UPDATE_USER_DETAILS: `${SERVER_URI}/auth/update-user-details`,
  GUIDES: `${SERVER_URI}/guides`,
  USER_GUIDES: `${SERVER_URI}/guides/user`,
  ALL_GUIDES: (page, perPage) =>
    `${SERVER_URI}/guides/popular?page=${page}&perPage=${perPage}`,
  GUIDES_BY_QUERY: ({ query, page, perPage }) =>
    `${SERVER_URI}/guides/search/?query=${query}&page=${page}&perPage=${perPage}`,
  NEARBY_GUIDES: ({ lat, lng, page, perPage }) =>
    `${SERVER_URI}/guides/nearby?lat=${lat}&lng=${lng}&page=${page}&perPage=${perPage}`,
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
  GEOLOCATION: `${SERVER_URI}/geolocation`,
};

//APP ROUTES

export const APP_ROUTES = {
  GUIDES_PAGE: "guides/user/:userId",
  GUIDE_EDIT: "guides/edit/:guideId",
  GUIDE_VIEW: "guides/view",
  SIGN_UP: "signup",
  LOGIN: "login",
  USER_SETTINGS: "profile/:userId",
  EXPLORE: "explore",
};
