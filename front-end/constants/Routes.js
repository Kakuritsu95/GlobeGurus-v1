//API ROUTES
// export const SERVER_URI = "http://localhost:7000/api"; //dev
export const SERVER_URI = "/api"; //prod

export const API_ROUTES = {
  LOGIN: `/auth/login`,
  SIGNUP: `/auth/signup`,
  VERIFY_TOKEN: `/auth/verify-token`,
  GET_USER_DETAILS: `/auth/user-details`,
  GET_TOP_USERS: `/auth/get-top-users`,
  UPDATE_USER_DETAILS: `/auth/update-user-details`,
  GUIDES: `/guides`,
  USER_GUIDES: `/guides/user`,
  ALL_GUIDES: (page, perPage) =>
    `/guides/popular?page=${page}&perPage=${perPage}`,
  GUIDES_BY_QUERY: ({ query, page, perPage }) =>
    `/guides/search/?query=${query}&page=${page}&perPage=${perPage}`,
  NEARBY_GUIDES: ({ lat, lng, page, perPage }) =>
    `/guides/nearby?lat=${lat}&lng=${lng}&page=${page}&perPage=${perPage}`,
  USER_BOOKMARKS: `/auth/bookmarks`,
  NEARBY_PLACES: `/nearby-places`,
  ADD_PLACE: (guideId) => `/guides/${guideId}/place`,
  UPDATE_PLACE: (guideId, placeId) => `/guides/${guideId}/place/${placeId}`,
  DELETE_PLACE: (guideId, placeId) => `/guides/${guideId}/place/${placeId}`,
  TOGGLE_LIKE: (guideId) => `/guides/${guideId}/like`,
  TOGGLE_BOOKMARK: (guideId) => `/guides/${guideId}/bookmark`,
  COMMENT: (guideId) => `/guides/${guideId}/comment`,
  GEOLOCATION: `/geolocation`,
};

//APP ROUTES

export const APP_ROUTES = {
  GUIDES_PAGE: "guides/user",
  BOOKMARKED_PAGE: "guides/bookmarked",
  GUIDE_EDIT: "guides/edit",
  GUIDE_VIEW: "guides/view",
  SIGN_UP: "signup",
  LOGIN: "login",
  USER_SETTINGS: "profile",
  EXPLORE: "explore",
};
