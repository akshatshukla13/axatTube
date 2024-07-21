import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  extraReducers: (builder) => {},
  reducers: {},
});

export default likeSlice.reducer;