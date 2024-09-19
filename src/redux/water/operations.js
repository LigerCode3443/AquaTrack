import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { setAuthHeader, trackerApi } from "../../config/trackerApi";

setAuthHeader(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWFiMWI5NDIwOGZiYmU5OTk0MzdmYiIsImlhdCI6MTcyNjY1Njk4MywiZXhwIjoxNzI3MjYxNzgzfQ.ndoySftcVTGeHkx0BGtJd12ug05HGaUawL3OIjmHivo"
);

export const getRecordsThunk = createAsyncThunk(
  "getRecords",
  async ({ year, month, day }, thunkApi) => {
    try {
      const data = await trackerApi.get("/water/", {
        params: {
          year,
          month,
          day: day !== undefined ? day : undefined,
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

      return data.data[0];
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
        getRecordsThunk({ year: props.getFullYear(), month: props.getMonth() })
      );

      return data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateWaterThunk = createAsyncThunk(
  "updateWater",
  async ({ id, data: { userWaterGoal, date, quantity } }, thunkApi) => {
    try {
      const data = await trackerApi.put(`/water/${id}`, {
        userWaterGoal,
        date,
        quantity,
      });

      const props = new Date(date);
      thunkApi.dispatch(
        getRecordsThunk({ year: props.getFullYear(), month: props.getMonth() })
      );

      return data;
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

      return data;
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

      return data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);
