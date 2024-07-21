import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  extraReducers: (builder) => {},
  reducers: {},
});

export default playlistSlice.reducer;