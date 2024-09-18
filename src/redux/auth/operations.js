import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader, trackerApi } from "../../config/trackerApi";

export const registerThunk = createAsyncThunk(
  "register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await trackerApi.post(credentials);

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
      const { data } = await trackerApi.post(credentials);
      setAuthHeader(data.userToken);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk("refresh", async (_, thunkApi) => {
  const { auth } = thunkApi.getState();
    if (!auth.userToken) {
     re
 }

    try {
        setAuthHeader(auth.userToken)
      const {}
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
