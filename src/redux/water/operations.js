import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { trackerApi } from "../../config/trackerApi";

export const getRecordsThunk = createAsyncThunk(
  "getRecords",
  async ({ year, month }, thunkApi) => {
    try {
      const data = await trackerApi.get("/water/", {
        params: {
          year,
          month,
        },
      });

      return data.data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getByOneDayRecordsThunk = createAsyncThunk(
  "getByOneDayRecords",
  async ({ year, month, day }, thunkApi) => {
    try {
      const data = await trackerApi.get("/water/", {
        params: {
          year,
          month: month + 1,
          day,
        },
      });

      return {
        records: data.data,
        date: new Date(year, month, day).toLocaleDateString(),
      };
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getLast7DaysThunk = createAsyncThunk(
  "getOneDayRecords",
  async (_, thunkApi) => {
    try {
      const data = await trackerApi.get("/water/", {
        params: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
        },
      });

      return data.data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getOneRecordThunk = createAsyncThunk(
  "getOneRecord",
  async (id, thunkApi) => {
    try {
      const data = await trackerApi.get(`/water/${id}`);

      return data.data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createWaterThunk = createAsyncThunk(
  "createWater",
  async ({ userWaterGoal, date, quantity }, thunkApi) => {
    try {
      const data = await trackerApi.post("/water/", {
        waterRecords: [{ userWaterGoal, date, quantity }],
      });

      const props = new Date(date);
      thunkApi.dispatch(
        getRecordsThunk({
          year: props.getFullYear(),
          month: props.getMonth() + 1,
        })
      );
      const state = thunkApi.getState();
      thunkApi.dispatch(
        getByOneDayRecordsThunk({
          year: new Date(state.water.oneDayRecords.date).getFullYear(),
          month: new Date(state.water.oneDayRecords.date).getMonth(),
          day: new Date(state.water.oneDayRecords.date).getDate(),
        })
      );
      thunkApi.dispatch(getLast7DaysThunk());

      return data.data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateWaterThunk = createAsyncThunk(
  "updateWater",
  async ({ id, data: { date, quantity } }, thunkApi) => {
    try {
      const data = await trackerApi.put(`/water/${id}`, {
        date,
        quantity,
      });

      const props = new Date(date);
      thunkApi.dispatch(
        getRecordsThunk({ year: props.getFullYear(), month: props.getMonth() })
      );
      const state = thunkApi.getState();
      thunkApi.dispatch(
        getByOneDayRecordsThunk({
          year: new Date(state.water.oneDayRecords.date).getFullYear(),
          month: new Date(state.water.oneDayRecords.date).getMonth(),
          day: new Date(state.water.oneDayRecords.date).getDate(),
        })
      );
      thunkApi.dispatch(getLast7DaysThunk());

      return data.data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateDayNormThunk = createAsyncThunk(
  "updateDayNorm",
  async ({ date: { year, month, day }, userWaterGoal }, thunkApi) => {
    try {
      const data = await trackerApi.patch(
        `/water?year=${year}&month=${month}&day=${day}`,
        {
          userWaterGoal,
        }
      );

      thunkApi.dispatch(getRecordsThunk({ year, month }));
      const state = thunkApi.getState();
      thunkApi.dispatch(
        getByOneDayRecordsThunk({
          year: new Date(state.water.oneDayRecords.date).getFullYear(),
          month: new Date(state.water.oneDayRecords.date).getMonth(),
          day: new Date(state.water.oneDayRecords.date).getDate(),
        })
      );
      thunkApi.dispatch(getLast7DaysThunk());

      return data.data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteWaterThunk = createAsyncThunk(
  "deleteWater",
  async (id, thunkApi) => {
    try {
      const data = await trackerApi.delete(`/water/${id}`);

      const props = new Date(data.date);
      thunkApi.dispatch(
        getRecordsThunk({ year: props.getFullYear(), month: props.getMonth() })
      );
      const state = thunkApi.getState();
      thunkApi.dispatch(
        getByOneDayRecordsThunk({
          year: new Date(state.water.oneDayRecords.date).getFullYear(),
          month: new Date(state.water.oneDayRecords.date).getMonth(),
          day: new Date(state.water.oneDayRecords.date).getDate(),
        })
      );
      thunkApi.dispatch(getLast7DaysThunk());

      return data.data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);
