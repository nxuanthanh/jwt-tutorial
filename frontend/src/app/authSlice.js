import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const register = createAsyncThunk("auth/register", async (payload) => {
  const { data } = await userApi.register(payload);

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data));

  return data;
});

export const login = createAsyncThunk("auth/login", async (payload) => {
  const { data } = await userApi.login(payload);

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data));

  return data;
});

export const logout = createAsyncThunk("auth/logout", async (payload) => {
  const { data } = await userApi.login(payload);

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data));

  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
    pending: false,
    error: false,
    registerSuccess: false,
  },

  extraReducers: {
    // Register
    [register.pending]: (state, action) => {
      state.pending = true;
    },
    [register.fulfilled]: (state, action) => {
      state.registerSuccess = true;
    },
    [register.rejected]: (state, action) => {
      state.error = true;
    },

    // Login
    [login.pending]: (state, action) => {
      state.pending = true;
    },
    [login.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.error = true;
    },

    // Logout
    [logout.pending]: (state, action) => {
      state.pending = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.currentUser = {};
    },
    [logout.rejected]: (state, action) => {
      state.error = true;
    },
  },
});
const { reducer } = authSlice;
export default reducer;
