import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import parseAxiosError from "@/utils/errorUtil";

//actions
export const LogedInUser = createAsyncThunk(
  "LogedInUser",
  async ({ email, password }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/users/login/",
        data: {
          email: email,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success("LogedIn");
      toast.success("hello, " + response.data.data.user.fullName);
      console.log("hii....", response.data.data.user.fullName);
      return response.data;
    } catch (error) {
      console.log("Err ");
      const err = parseAxiosError(error.response.data);
      console.log(err);
      toast.error(err);
      throw error;
    }
  }
);

export const LogedOutUser = createAsyncThunk("LogedOutUser", async () => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/users/logout/",
      withCredentials: true,
    });
    toast.success("LogedOut");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Err ");
    const err = parseAxiosError(error.response.data);
    console.log(err);
    toast.error(err);
    throw error;
  }
});

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(LogedInUser.pending, (state, action) => {
      console.log("pend");
      state.isLoading = true;
    });
    builder.addCase(LogedInUser.fulfilled, (state, action) => {
      console.log("done");
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(LogedInUser.rejected, (state, action) => {
      console.log("Error...");
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(LogedOutUser.pending, (state, action) => {
      console.log("pend");
      state.isLoading = true;
    });
    builder.addCase(LogedOutUser.fulfilled, (state, action) => {
      console.log("logout done");
      state.isLoading = false;
    });
    builder.addCase(LogedOutUser.rejected, (state, action) => {
      console.log("Error...logout");
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {
    resetAuthData: (state, action) => {
      state.data = null;
    },
  },
});

export const { resetAuthData } = authSlice.actions;
export default authSlice.reducer;
