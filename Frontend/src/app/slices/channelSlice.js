import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  extraReducers: (builder) => {},
  reducers: {},
});

export default channelSlice.reducer;