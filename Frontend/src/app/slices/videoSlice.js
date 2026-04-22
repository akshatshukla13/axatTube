import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import parseAxiosError from "@/utils/errorUtil";

//action
export const fetchVideoDetails = createAsyncThunk(
  "fetchVideoDetails",
  async () => {
    try {
      console.log("doing");
      // const response = await axios.get("https://videotube-two.vercel.app/users/current-user/");
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/videos/`,
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
        url: `${API_BASE_URL}/videos/${id}`,
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

//uplaodVideo
export const uplaodVideo = createAsyncThunk("uplaodVideo", async ({ formData }) => {
  try {
    console.log("uploading video");
    console.log(formData);
    
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/videos/`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      onUploadProgress: ({ loaded, total }) => {
        if (!total) {
          return;
        }
        window.dispatchEvent(
          new CustomEvent("video-upload-progress", {
            detail: Math.round((loaded / total) * 100),
          }),
        );
      },
    });
    console.log("uploaded video");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Err ");
    const err = parseAxiosError(error.response.data);
    console.log(err);
    throw error;
  }
});

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
  perticularVideoData: null,
  uploadedVideo: false,
  uploadProgress: 0,
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

    builder.addCase(uplaodVideo.pending, (state, action) => {
      state.isLoading = true;
      state.uploadedVideo = false;
      state.uploadProgress = 0;
    });
    builder.addCase(uplaodVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.uploadedVideo = action.payload?.data || true;
      state.uploadProgress = 100;
    });
    builder.addCase(uplaodVideo.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.isLoading = false;
      state.uploadedVideo = false;
      state.uploadProgress = 0;
    });
  },
  reducers: {
    resetPerticularVideo: (state, action) => {
      state.perticularVideoData = null;
    },
    resetUploadedVideo: (state, action) => {
      state.uploadedVideo = false;
      state.uploadProgress = 0;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
});

export const { resetPerticularVideo, resetUploadedVideo, setUploadProgress } =
  videoSlice.actions;

export default videoSlice.reducer;
