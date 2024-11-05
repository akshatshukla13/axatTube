import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import parseAxiosError from "@/utils/errorUtil";

export const fetchChannelDetails = createAsyncThunk(
  "fetchChannelDetails",
  async ({ username }) => {
    try {
      console.log("doing fetchUserId ", username);
      const userId = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/users/uid/${username}`,
        withCredentials: true,
      });
      console.log("got UserId ", userId.data);
      console.log("doing fetchChannelDetails ", userId.data);
      const response = await axios({
        method: "post",
        url: `https://videotube-two.vercel.app/channel/stats/${userId.data}`,
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
      console.log("doing fetchUserId ", username);
      const userId = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/users/uid/${username}`,
        withCredentials: true,
      });
      console.log("got UserId for videos", userId.data);
      console.log("doing fetchChannelVideos ", userId.data);
      const response = await axios({
        method: "post",
        url: `https://videotube-two.vercel.app/channel/videos/${userId.data}`,
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
      console.log("doing fetchUserId ", username);
      const userId = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/users/uid/${username}`,
        withCredentials: true,
      });
      console.log("got UserId ", userId.data);
      console.log("doing fetchChannelPlaylists ", userId.data.data);
      const response = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/playlist/user/${userId.data}`,
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
      console.log("doing fetchUserId ", username);
      const userId = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/users/uid/${username}`,
        withCredentials: true,
      });
      console.log("got UserId ", userId.data);
      console.log("doing fetchChannelTweets ", userId.data);
      const response = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/tweet/user/${userId.data}`,
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

export const fetchSubscribedChannels = createAsyncThunk(
  "fetchSubscribedChannels",
  async ({ username }) => {
    try {
      console.log("doing fetchUserId ", username);
      const userId = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/users/uid/${username}`,
        withCredentials: true,
      });
      console.log("got UserId ", userId.data);
      console.log("doing fetchSubscribedChannels ", userId.data);
      const response = await axios({
        method: "get",
        url: `https://videotube-two.vercel.app/subscribe/c/${userId.data}`,
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
      state.channelData = action.payload.data;
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
      state.channelVideosData = action.payload.data;
    });
    builder.addCase(fetchChannelVideos.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(fetchChannelPlaylists.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChannelPlaylists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.channelPlaylistData = action.payload.data;
    });
    builder.addCase(fetchChannelPlaylists.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(fetchChannelTweets.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChannelTweets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.channelTweetData = action.payload.data;
    });
    builder.addCase(fetchChannelTweets.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(fetchSubscribedChannels.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSubscribedChannels.fulfilled, (state, action) => {
      state.isLoading = false;
      state.channelSubscribedData = action.payload.data;
    });
    builder.addCase(fetchSubscribedChannels.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {},
});

export default channelSlice.reducer;
