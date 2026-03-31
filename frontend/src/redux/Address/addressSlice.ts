import { createSlice } from "@reduxjs/toolkit";
import type { Address } from "../../types/addressType";
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress
} from "./addressThunk";

interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ================= GET =================
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ================= CREATE =================
      .addCase(createAddress.fulfilled, (state, action) => {
        // nếu là default → reset các address khác
        if (action.payload.isDefault) {
          state.addresses.forEach((a) => (a.isDefault = false));
        }
        state.addresses.push(action.payload);
      })

      // ================= UPDATE =================
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (a) => a._id === action.payload._id
        );

        if (index !== -1) {
          // nếu là default → reset các address khác
          if (action.payload.isDefault) {
            state.addresses.forEach((a) => (a.isDefault = false));
          }

          state.addresses[index] = action.payload;
        }
      })

      // ================= DELETE =================
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (a) => a._id !== action.payload
        );
      });
  }
});

export default addressSlice.reducer;