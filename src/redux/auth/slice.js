import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  recoveryPasswordThunk,
  refreshThunk,
  registerThunk,
} from "./operations.js";

const initialState = {
  user: null,
  token: "",
  refreshToken: "",
  isLoggedIn: false,
  isLoading: false,
  isRefresh: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isRefresh = false;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isRefresh = true;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isRefresh = false;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(recoveryPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const authReducer = slice.reducer;
