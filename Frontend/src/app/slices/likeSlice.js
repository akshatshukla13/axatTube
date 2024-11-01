import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLikedVideos = createAsyncThunk(
  "fetchLikedVideos",
  async () => {
    try {
      // console.log("doing fetchLikedVideos ",id);
      const response = await axios({
        method: "get",
        url: `/api/like/videos`,
        withCredentials: true,
      });
      // console.log("comment : ",response.data);
      return response.data;
    } catch (error) {
      console.log("Err ", error);
      const err = error.response ? error.response.data : error.message;
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  isLoading: false,
  likedVideosData: null,
  isError: false,
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLikedVideos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLikedVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.likedVideosData = action.payload.data;
    });
    builder.addCase(fetchLikedVideos.rejected, (state, action) => {
      console.log("Error", action.error.message);
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {},
});

export default likeSlice.reducer;
