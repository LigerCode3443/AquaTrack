import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const ApiServer = "https://water-tracker-be-production.up.railway.app/api/";

export const getRecordsThunk = createAsyncThunk(
  "getRecords",
  async ({ year, month, day }, thunkApi) => {
    try {
      const data = await axios.get(ApiServer, {
        year,
        month,
        day: day !== undefined ? day : undefined,
      });
      console.log(data);

      return data;
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
      const data = await axios.post(ApiServer, {
        userWaterGoal,
        date,
        quantity,
      });

      const props = new Date(date);
      thunkApi.dispatch(
        getRecordsThunk({ year: props.getFullYear(), month: props.getMonth() })
      );

      console.log(data);

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
      const data = await axios.put(`${ApiServer}${id}`, {
        userWaterGoal,
        date,
        quantity,
      });

      const props = new Date(date);
      thunkApi.dispatch(
        getRecordsThunk({ year: props.getFullYear(), month: props.getMonth() })
      );

      console.log(data);

      return data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateDayNormThunk = createAsyncThunk(
  "updateDayNorm",
  async ({ year, month, day }, thunkApi) => {
    try {
      const data = await axios.put(ApiServer, { year, month, day });

      thunkApi.dispatch(getRecordsThunk({ year, month }));

      console.log(data);

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
      const data = await axios.put(`${ApiServer}${id}`);

      const props = new Date(data.date);
      thunkApi.dispatch(
        getRecordsThunk({ year: props.getFullYear(), month: props.getMonth() })
      );

      console.log(data);

      return data;
    } catch (error) {
      toast.error(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);
