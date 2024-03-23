import axios from "axios";
import store from "../redux/store/store";
import { setLoading, setIdle } from "../redux/slices/loadingSlice";
import { API_ROUTES } from "../../constants/Routes";

axios.interceptors.request.use(
  function (config) {
    store.dispatch(setLoading());
    config.withCredentials = true;
    return config;
  },
  function (error) {
    store.dispatch(setIdle());
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    store.dispatch(setIdle());
    response.config.withCredentials = true;
    return response;
  },
  function (error) {
    store.dispatch(setIdle());
    return Promise.reject(error);
  },
);

export const apiCalls = {
  getRequest: async (url) => await axios.get(url).then((res) => res.data),
  postRequest: async (url, body) =>
    await axios.post(url, body).then((res) => res.data),
  putRequest: async (url, body) =>
    await axios.put(url, body).then((res) => res.data),
  patchRequest: async (url, body) => await axios.patch(url, body),
  deleteRequest: async (url, body) =>
    await axios.delete(url, body).then((res) => res.data),
};

export const guideService = {
  get: async (guideId) =>
    apiCalls.getRequest(`${API_ROUTES.GUIDES}/${guideId}`),
  create: async ({ formData }) =>
    await apiCalls.postRequest(API_ROUTES.GUIDES, formData),
  patch: async ({ formData, guideId }) =>
    await apiCalls.patchRequest(`${API_ROUTES.GUIDES}/${guideId}`, formData),
  delete: async (guideId) => await apiCalls.deleteRequest(guideId),
};

export const placeService = {
  create: async ({ guideId, formData }) =>
    apiCalls.putRequest(API_ROUTES.ADD_PLACE(guideId), formData),
  patch: async ({ guideId, placeId, formData }) =>
    apiCalls.patchRequest(API_ROUTES.UPDATE_PLACE(guideId, placeId), formData),
  delete: async ({ guideId, placeId }) =>
    apiCalls.deleteRequest(API_ROUTES.DELETE_PLACE(guideId, placeId)),
};
