import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  createWaterThunk,
  deleteWaterThunk,
  getOneRecordThunk,
  getRecordsThunk,
  updateDayNormThunk,
  updateWaterThunk,
} from "./operations.js";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    records: [],
    selectedRecord: null,
    isLoading: false,
    isError: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getRecordsThunk.fulfilled, (state, action) => {
        state.records = action.payload;
      })
      .addCase(getOneRecordThunk.fulfilled, (state, action) => {
        state.selectedRecord = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getRecordsThunk.fulfilled,
          getOneRecordThunk.fulfilled,
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
          getOneRecordThunk.pending,
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
          getOneRecordThunk.rejected,
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
