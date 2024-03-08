//API ROUTES
const SERVER_URI = "http://localhost:7000";

export const API_ROUTES = {
  LOGIN: `${SERVER_URI}/auth/login`,
  SIGNUP: `${SERVER_URI}/auth/signup`,
  VERIFY_TOKEN: `${SERVER_URI}/auth/verify-token`,
  GUIDES: `${SERVER_URI}/guides`,
  ALL_GUIDES: `${SERVER_URI}/guides/all`,
  NEARBY_PLACES: `${SERVER_URI}/nearby-places`,
  ADD_PLACE: (guideId)=> `${SERVER_URI}/${guideId}/place`,
  UPDATE_PLACE: (guideId , placeId)=> `${SERVER_URI}/${guideId}/place${placeId}`,
  DELETE_PLACE:(guideId , placeId)=> `${SERVER_URI}/${guideId}/place${placeId}`,
};

//APP ROUTES

export const APP_ROUTES = {
  GUIDES_PAGE: "guides",
  SIGN_UP: "signup",
  LOGIN: "login",
};
