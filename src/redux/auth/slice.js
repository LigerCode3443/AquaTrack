import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
} from "./operations";

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
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload;
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
