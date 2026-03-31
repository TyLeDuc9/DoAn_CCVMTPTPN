import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAddressApi,
  getAddressesApi,
  updateAddressApi,
  deleteAddressApi
} from "../Address/addressApi";
import axios from "axios";
import type { Address } from "../../types/addressType";

// GET ALL
export const fetchAddresses = createAsyncThunk(
  "address/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAddressesApi();
    }  catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message);
      }
      return rejectWithValue("Register failed");
    }
  }
);

// CREATE
export const createAddress = createAsyncThunk(
  "address/create",
  async (data: Partial<Address>, { rejectWithValue }) => {
    try {
      return await createAddressApi(data);
    }  catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message);
      }
      return rejectWithValue("Register failed");
    }
  }
);

// UPDATE
export const updateAddress = createAsyncThunk(
  "address/update",
  async (
    { id, data }: { id: string; data: Partial<Address> },
    { rejectWithValue }
  ) => {
    try {
      return await updateAddressApi(id, data);
    }  catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message);
      }
      return rejectWithValue("Register failed");
    }
  }
);

// DELETE
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteAddressApi(id);
    }  catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message);
      }
      return rejectWithValue("Register failed");
    }
  }
);