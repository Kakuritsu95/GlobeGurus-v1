import axios from "axios";
import store from "../store/store";
import { setLoading, setIdle } from "../ui/loadindSlice";
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
  create: async (formData) =>
    await apiCalls.postRequest(API_ROUTES.GUIDES, formData),
  patch: async (guideId) => await apiCalls.patchRequest(guideId),
  delete: async (guideId) => await apiCalls.deleteRequest(guideId),
};

export const placeService = {
  create: async ({ guideId, formData }) =>
    apiCalls.putRequest(API_ROUTES.ADD_PLACE(guideId), formData),
};
