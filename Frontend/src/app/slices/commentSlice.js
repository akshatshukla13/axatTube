import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {},
  reducers: {},
});

export default commentSlice.reducer;