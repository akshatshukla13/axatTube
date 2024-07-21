import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//action
export const fetchVideoDetails = createAsyncThunk(
  "fetchVideoDetails",
  async () => {
    const response = await axios.get(
      "https://aktube.vercel.app/users/current-user/"
    );
    return response.data.data;
  }
);

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const videoSlice = createSlice({
  name: "Video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideoDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideoDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchVideoDetails.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {},
});

export default videoSlice.reducer;
