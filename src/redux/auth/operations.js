import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearAuthHeader,
  setAuthHeader,
  trackerApi,
} from "../../config/trackerApi";

export const registerThunk = createAsyncThunk(
  "register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await trackerApi.post("/users/signup", credentials);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await trackerApi.post("/users/signin", credentials);
      setAuthHeader(data.userToken);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk("refresh", async (_, thunkApi) => {
  const { auth } = thunkApi.getState();

  if (!auth.token) {
    return thunkApi.rejectWithValue("Not found token");
  }
  try {
    setAuthHeader(auth.token);
    const { data } = await trackerApi.get("/users/current");
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const updateUserThunk = createAsyncThunk(
  "update",
  async (credentials, thunkApi) => {
    try {
      const { data } = await trackerApi.patch("/users", credentials);

      await thunkApi.dispatch(refreshThunk());

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk("logout", async (_, thunkApi) => {
  const { auth } = thunkApi.getState();
  if (!auth.token) {
    return thunkApi.rejectWithValue("Not found token");
  }
  try {
    setAuthHeader(auth.token);
    await trackerApi.post("/users/signout");
    clearAuthHeader();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
