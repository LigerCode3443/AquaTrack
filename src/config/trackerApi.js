import axios from "axios";

import { refreshAccessToken } from "../redux/auth/operations";
// import { store } from "../redux/store";

export const trackerApi = axios.create({
  baseURL: "https://water-tracker-be-production.up.railway.app/api",
});

export const setAuthHeader = (token) => {
  trackerApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  trackerApi.defaults.headers.common.Authorization = ``;
};

trackerApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 404 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      console.log(accessToken);

      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

      return trackerApi(originalRequest);
    }
    return Promise.reject(error);
  }
);
