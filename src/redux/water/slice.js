import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  createWaterThunk,
  deleteWaterThunk,
  getOneRecordThunk,
  getLast7DaysThunk,
  getRecordsThunk,
  updateDayNormThunk,
  updateWaterThunk,
} from "./operations.js";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    records: [],
    last7Days: [],
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
      .addCase(getLast7DaysThunk.fulfilled, (state, action) => {
        const records = action.payload;
        const today = new Date();

        const index = records.findIndex(
          (elem) => new Date(elem.date).toDateString() === today.toDateString()
        );

        state.last7Days = records.slice(index - 6, index + 1);
      })
      .addMatcher(
        isAnyOf(
          getRecordsThunk.fulfilled,
          getLast7DaysThunk.fulfilled,
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
          getLast7DaysThunk.pending,
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
          getLast7DaysThunk.rejected,
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
