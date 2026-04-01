import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginApi, registerApi, logoutApi } from "./authApi";
import type { AuthRequest } from "../../types/authType";

export const login = createAsyncThunk(
  "auth/login",
  async (data: AuthRequest, { rejectWithValue }) => {
    try {
      return await loginApi(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message);
      }
      return rejectWithValue("Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data: AuthRequest, { rejectWithValue }) => {
    try {
      return await registerApi(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message);
      }
      return rejectWithValue("Register failed");
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutApi();
      return res;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message);
      }
      return rejectWithValue("Logout failed");
    }
  }
);