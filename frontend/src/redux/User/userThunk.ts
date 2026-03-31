import { createAsyncThunk } from "@reduxjs/toolkit";
import type {User, UpdateUserRequest } from "../../types/userType";
import {  getMeApi, updateUserApi, changePasswordApi } from "./userApi";
import axios from "axios";

export const changePassword = createAsyncThunk<
  string, 
  { oldPassword: string; newPassword: string },
  { rejectValue: string }
>(
  "user/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = await changePasswordApi(oldPassword, newPassword);
      return res.message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Change password failed");
      }
      return rejectWithValue("Change password failed");
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  { id: string; data: UpdateUserRequest },
  { rejectValue: string }
>(
  "user/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateUserApi(id, data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Update failed");
      }
      return rejectWithValue("Update failed");
    }
  }
);
export const getMeUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("user/me", async (_, { rejectWithValue }) => {
  try {
    return await getMeApi();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Get user failed"
      );
    }
    return rejectWithValue("Get user failed");
  }
});

