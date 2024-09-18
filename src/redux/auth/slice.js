import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: "",
  isLoggedIn: false,
  isLoading: false,
  isRefresh: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export const authReducer = slice.reducer;
