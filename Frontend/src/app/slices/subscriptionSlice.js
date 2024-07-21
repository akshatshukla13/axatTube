import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const subscriptionSlice = createSlice({
  name: "tweet",
  initialState,
  extraReducers: (builder) => {},
  reducers: {},
});

export default subscriptionSlice.reducer;
