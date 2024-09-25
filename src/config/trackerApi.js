import axios from "axios";

import { refreshAccessToken } from "../redux/auth/operations";

export const trackerApi = axios.create({
  baseURL: "https://water-tracker-be-production.up.railway.app/api",
});

export const setAuthHeader = (token, refreshToken) => {
  trackerApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  trackerApi.defaults.headers.common[
    "X-Refresh-Token"
  ] = `Bearer ${refreshToken}`;
};
export const clearAuthHeader = () => {
  trackerApi.defaults.headers.common.Authorization = ``;
  delete trackerApi.defaults.headers.common["X-Refresh-Token"];
};

trackerApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 400 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;

      return trackerApi(originalRequest);
    }
    return Promise.reject(error);
  }
);
