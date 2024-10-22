import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//action
export const fetchVideoDetails = createAsyncThunk(
  "fetchVideoDetails",
  async () => {
    try {
      console.log("doing");
      // const response = await axios.get("/api/users/current-user/");
      const response = await axios({
        method: "get",
        url: "/api/videos/",
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Err ");
      const err = parseAxiosError(error.response.data);
      console.log(err);
      throw error;
    }
  }
);

export const fetchPerticularVideoDetails = createAsyncThunk(
  "fetchPerticularVideoDetails",
  async ({ id }) => {
    try {
      console.log("doing pv");
      const response = await axios({
        method: "get",
        url: `/api/videos/${id}`,
        withCredentials: true,
      });
      // console.log("pvv fetched");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Err ");
      const err = parseAxiosError(error.response.data);
      console.log(err);
      throw error;
    }
  }
);

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
  perticularVideoData: null,
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

    builder.addCase(fetchPerticularVideoDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPerticularVideoDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.perticularVideoData = action.payload;
    });
    builder.addCase(fetchPerticularVideoDetails.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {
    resetPerticularVideo: (state, action) => {
      state.perticularVideoData = null;
    },
  },
});

export const { resetPerticularVideo } = videoSlice.actions;

export default videoSlice.reducer;
