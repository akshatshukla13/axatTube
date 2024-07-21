import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  extraReducers: (builder) => {},
  reducers: {},
});

export default tweetSlice.reducer;
