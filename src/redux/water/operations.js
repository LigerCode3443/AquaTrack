import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { trackerApi } from "../../config/trackerApi";

const updateData = (thunkApi) => {
  const state = thunkApi.getState();

  thunkApi.dispatch(
    getRecordsThunk({
      year: new Date(state.water.records.date).getFullYear(),
      month: new Date(state.water.records.date).getMonth(),
    })
  );
  thunkApi.dispatch(
    getByOneDayRecordsThunk({
      year: new Date(state.water.oneDayRecords.date).getFullYear(),
      month: new Date(state.water.oneDayRecords.date).getMonth(),
      day: new Date(state.water.oneDayRecords.date).getDate(),
    })
  );
  thunkApi.dispatch(getLast7DaysThunk());
};

const getTimeZoneOffset = () => {
  const date = new Date();
  return -date.getTimezoneOffset() / 60;
};

export const getRecordsThunk = createAsyncThunk(
  "getRecords",
  async ({ year, month }, thunkApi) => {
    try {
      const data = await trackerApi.get("/water/", {
        params: {
          timezoneOffset: getTimeZoneOffset(),
          year,
          month,
        },
      });

      return {
        records: data.data,
        date: new Date(year, month, 1).toString(),
      };
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
          timezoneOffset: getTimeZoneOffset(),
          year,
          month: month + 1,
          day,
        },
      });

      return {
        records: data.data,
        date: new Date(year, month, day).toString(),
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
          timezoneOffset: getTimeZoneOffset(),
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

      updateData(thunkApi);

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

      updateData(thunkApi);

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
      console.log({ date: { year, month, day }, userWaterGoal });
      const data = await trackerApi.patch(
        `/water?year=${year}&month=${month}&day=${day}`,
        {
          userWaterGoal,
        }
      );

      updateData(thunkApi);

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

      updateData(thunkApi);

      return data.data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);
