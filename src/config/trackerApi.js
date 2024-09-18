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
