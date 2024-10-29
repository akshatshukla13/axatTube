import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import parseAxiosError from "@/utils/errorUtil";

export const fetchChannelDetails = createAsyncThunk(
  "fetchChannelDetails",
  async ({ username }) => {
    try {
      console.log("doing fetchChannelDetails ", username);
      const response = await axios({
        method: "post",
        url: `/api/channel/stats/${username}`,
        withCredentials: true,
      });
      console.log("channelData : ", response.data);
      return response.data;
    } catch (error) {
      console.log("Err ", error);
      const err = parseAxiosError(error.response.data);
      console.log(error);
      throw error;
    }
  }
);

export const fetchChannelVideos = createAsyncThunk(
  "fetchChannelVideos",
  async ({ username }) => {
    try {
      console.log("doing fetchChannelVideos ", username);
      const response = await axios({
        method: "post",
        url: `/api/channel/videos/${username}`,
        withCredentials: true,
      });
      console.log("channelData : ", response.data);
      return response.data;
    } catch (error) {
      console.log("Err ", error);
      const err = parseAxiosError(error.response.data);
      console.log(error);
      throw error;
    }
  }
);

export const fetchChannelPlaylists = createAsyncThunk(
  "fetchChannelPlaylists",
  async ({ username }) => {
    try {
      console.log("doing fetchChannelPlaylists ", username);
      const response = await axios({
        method: "get",
        url: `/api/playlist/user/${username}`,
        withCredentials: true,
      });
      console.log("channelData : ", response.data);
      return response.data;
    } catch (error) {
      console.log("Err ", error);
      const err = parseAxiosError(error.response.data);
      console.log(error);
      throw error;
    }
  }
);

export const fetchChannelTweets = createAsyncThunk(
  "fetchChannelTweets",
  async ({ username }) => {
    try {
      console.log("doing fetchChannelTweets ", username);
      const response = await axios({
        method: "get",
        url: `/api/tweet/user/${username}`,
        withCredentials: true,
      });
      console.log("channelData : ", response.data);
      return response.data;
    } catch (error) {
      console.log("Err ", error);
      const err = parseAxiosError(error.response.data);
      console.log(error);
      throw error;
    }
  }
);



const initialState = {
  isLoading: false,
  channelData: null,
  channelVideosData: null,
  channelPlaylistData: null,
  channelTweetData: null,
  channelSubscribedData: null,
  isError: false,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChannelDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChannelDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.channelData = action.payload;
    });
    builder.addCase(fetchChannelDetails.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(fetchChannelVideos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChannelVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.channelVideosData = action.payload;
    });
    builder.addCase(fetchChannelVideos.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {},
});

export default channelSlice.reducer;
