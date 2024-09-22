import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { convertData } from "../../components/Calendar/helper.js";
import {
  createWaterThunk,
  deleteWaterThunk,
  getOneRecordThunk,
  getByOneDayRecordsThunk,
  getRecordsThunk,
  getLast7DaysThunk,
  updateDayNormThunk,
  updateWaterThunk,
} from "./operations.js";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    records: [],
    oneDayRecords: [],
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
      .addCase(getByOneDayRecordsThunk.fulfilled, (state, action) => {
        state.oneDayRecords = action.payload;
      })
      .addCase(getLast7DaysThunk.fulfilled, (state, action) => {
        const records = convertData(action.payload, {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
        });
        const today = new Date();

        const index = records.findIndex(
          (elem) => new Date(elem.date).toDateString() === today.toDateString()
        );

        state.last7Days = records.slice(index - 6, index + 1);
      })
      .addMatcher(
        isAnyOf(
          getRecordsThunk.fulfilled,
          getByOneDayRecordsThunk.fulfilled,
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
          getByOneDayRecordsThunk.pending,
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
          getByOneDayRecordsThunk.rejected,
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
