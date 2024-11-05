import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import parseAxiosError from "@/utils/errorUtil";

export const fetchMyChannelDetails = createAsyncThunk(
  "fetchMyChannelDetails",
  async ({ username }) => {
    try {
      console.log("doing fetchMyChannelDetails ", username);
      const response = await axios({
        method: "post",
        url: `https://videotube-two.vercel.app/channel/stats/${username}`,
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

export const fetchMyChannelVideos = createAsyncThunk(
  "fetchMyChannelVideos",
  async ({ username }) => {
    try {
      console.log("doing fetchMyChannelVideos ", username);
      const response = await axios({
        method: "post",
        url: `https://videotube-two.vercel.app/channel/videos/${username}`,
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

export const fetchMyChannelPlaylists = createAsyncThunk(
  "fetchMyChannelPlaylists",
  async ({ username }) => {
    try {
      console.log("doing fetchMyChannelPlaylists ", username);
      const response = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/playlist/user/${username}`,
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

export const fetchMyChannelTweets = createAsyncThunk(
  "fetchMyChannelTweets",
  async ({ username }) => {
    try {
      console.log("doing fetchMyChannelTweets ", username);
      const response = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/tweet/user/${username}`,
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

export const fetchMySubscribedChannels = createAsyncThunk(
  "fetchMySubscribedChannels",
  async ({ username }) => {
    try {
      console.log("doing fetchMySubscribedChannels ", username);
      const response = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/subscribe/c/${username}`,
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
  myChannelData: null,
  myChannelVideosData: null,
  myChannelPlaylistData: null,
  myChannelTweetData: null,
  myChannelSubscribedData: null,
  isError: false,
};

export const myChannelSlice = createSlice({
  name: "myChannel",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMyChannelDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMyChannelDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myChannelData = action.payload.data;
    });
    builder.addCase(fetchMyChannelDetails.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(fetchMyChannelVideos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMyChannelVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myChannelVideosData = action.payload.data;
    });
    builder.addCase(fetchMyChannelVideos.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(fetchMyChannelPlaylists.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMyChannelPlaylists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myChannelPlaylistData = action.payload.data;
    });
    builder.addCase(fetchMyChannelPlaylists.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(fetchMyChannelTweets.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMyChannelTweets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myChannelTweetData = action.payload.data;
    });
    builder.addCase(fetchMyChannelTweets.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(fetchMySubscribedChannels.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMySubscribedChannels.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myChannelSubscribedData = action.payload.data;
    });
    builder.addCase(fetchMySubscribedChannels.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {},
});

export default myChannelSlice.reducer;
