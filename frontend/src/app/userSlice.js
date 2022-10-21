import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const getAllUser = createAsyncThunk("getAllUser", async (payload) => {
  const data = await userApi.getAllUsers(payload);

  return data;
});

export const deleteUser = createAsyncThunk("deleteUser", async (payload) => {
  const data = await userApi.deleteUser(payload);

  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: {},
    pending: false,
    error: false,
    registerSuccess: false,
  },

  extraReducers: {
    // getAllUser
    [getAllUser.pending]: (state, action) => {
      state.pending = true;
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.users = true;
    },
    [getAllUser.rejected]: (state, action) => {
      state.error = true;
    },

    // Delete user
    [deleteUser.pending]: (state, action) => {
      state.pending = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.users = true;
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = true;
    },
  },
});
const { reducer } = authSlice;
// export const { logout } = actions;
export default reducer;
