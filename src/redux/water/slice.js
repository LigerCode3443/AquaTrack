import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  createWaterThunk,
  deleteWaterThunk,
  getRecordsThunk,
  updateDayNormThunk,
  updateWaterThunk,
} from "./operations.js";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    records: [],
    isLoading: false,
    isError: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getRecordsThunk.fulfilled, (state, action) => {
        state.records = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getRecordsThunk.fulfilled,
          createWaterThunk.fulfilled,
          updateWaterThunk.fulfilled,
          updateDayNormThunk.fulfilled,
          deleteWaterThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getRecordsThunk.pending,
          createWaterThunk.pending,
          updateWaterThunk.pending,
          updateDayNormThunk.pending,
          deleteWaterThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getRecordsThunk.rejected,
          createWaterThunk.rejected,
          updateWaterThunk.rejected,
          updateDayNormThunk.rejected,
          deleteWaterThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      ),
});

export const waterReducer = waterSlice.reducer;
