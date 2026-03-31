
import { createSlice } from "@reduxjs/toolkit";
import type { PopulatedOrder } from "../../types/orderType";
import { createOrderThunk, getUserOrdersThunk, getOrderByIdThunk, updateOrderStatusThunk } from "./orderThunk";

interface OrderState {
  orders: PopulatedOrder[];
  currentOrder: PopulatedOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // createOrderThunk
      .addCase(createOrderThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload); // thêm order mới lên đầu
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getUserOrdersThunk
      .addCase(getUserOrdersThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getOrderByIdThunk
      .addCase(getOrderByIdThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateOrderStatusThunk
      .addCase(updateOrderStatusThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(o => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
        if (state.currentOrder?._id === action.payload._id) state.currentOrder = action.payload;
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearCurrentOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;