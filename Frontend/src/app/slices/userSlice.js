import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import parseAxiosError from "@/utils/errorUtil";

//action
export const fetchUserDetails = createAsyncThunk(
  "fetchUserDetails",
  async () => {
    try {
      console.log("doing");
      // const response = await axios.get("/api/users/current-user/");
      const response = await axios({
        method: "get",
        url: "/api/users/current-user/",
        withCredentials: true,
      });
      // toast.success("welcome," + response.data.data.userName);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Err ");
      const err = parseAxiosError(error.response.data);
      console.log(err);
      // toast.error(err);
      throw error;
    }
  }
);

const initialState = {
  userName: null,
  userId: null,
  isLoading: false,
  data: null,
  isError: false,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.userName = action.payload.data.userName;
      state.userName = action.payload.data._id;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      console.log("Error");
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {
    resetUserData: (state, action) => {
      state.userName = null;
      state.data = null;
    },
  },
});

export const { resetUserData } = userSlice.actions;
export default userSlice.reducer;
