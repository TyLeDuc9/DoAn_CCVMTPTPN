import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getUserOrders, getOrderById, updateOrderStatus } from "./orderApi";
import type { PopulatedOrder } from "../../types/orderType";

interface CreateOrderPayload {
  shippingAddressId: string;
  payment_method: "Code" | "VNPAY";
}

// Thunk tạo order
export const createOrderThunk = createAsyncThunk<PopulatedOrder, CreateOrderPayload>(
  "order/createOrder",
  async (payload, thunkAPI) => {
    try {
      return await createOrder(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk lấy tất cả order của user
export const getUserOrdersThunk = createAsyncThunk<PopulatedOrder[]>(
  "order/getUserOrders",
  async (_, thunkAPI) => {
    try {
      return await getUserOrders();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk lấy chi tiết order
export const getOrderByIdThunk = createAsyncThunk<PopulatedOrder, string>(
  "order/getOrderById",
  async (orderId, thunkAPI) => {
    try {
      return await getOrderById(orderId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk update status (admin)
export const updateOrderStatusThunk = createAsyncThunk<
  PopulatedOrder,
  { id: string; status: "pending" | "processing" | "delivered" | "cancelled" }
>(
  "order/updateOrderStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      return await updateOrderStatus(id, status);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);