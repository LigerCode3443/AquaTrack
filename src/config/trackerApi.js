import axios from "axios";

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

    const { store } = await import("../redux/store");
    const { refreshAccessToken } = await import("../redux/auth/operations");

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const data = await store.dispatch(refreshAccessToken());

      setAuthHeader(data.payload.accessToken);

      return trackerApi(originalRequest);
    }
    return Promise.reject(error);
  }
);
