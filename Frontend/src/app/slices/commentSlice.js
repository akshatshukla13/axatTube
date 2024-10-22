import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//actions
export const fetchVideoComments = createAsyncThunk(
  "fetchVideoComments",
  async ({ id }) => {
    try {
      // console.log("doing fetchVideoComments ",id);
      const response = await axios({
        method: "get",
        url: `/api/comment/${id}`,
        withCredentials: true,
      });
      // console.log("comment : ",response.data);
      return response.data;
    } catch (error) {
      console.log("Err ",error);
      const err = parseAxiosError(error.response.data);
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideoComments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideoComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchVideoComments.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {},
});

export default commentSlice.reducer;
