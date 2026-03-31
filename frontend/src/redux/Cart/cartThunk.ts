// cartThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Cart } from "../../types/cartType";
import { getCartApi, addToCartApi ,updateCartApi, removeCartItemApi } from "../Cart/cartApi";
import axios from "axios";
export const updateCartItem = createAsyncThunk<
  Cart,
  { productId: string; quantity: number },
  { rejectValue: string }
>("cart/updateCartItem", async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    return await updateCartApi(productId, quantity);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message);
    }
    return rejectWithValue("Update cart failed");
  }
});

// Xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = createAsyncThunk<
  Cart,
  { productId: string },
  { rejectValue: string }
>("cart/removeCartItem", async ({ productId }, { rejectWithValue }) => {
  try {
    return await removeCartItemApi(productId);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message);
    }
    return rejectWithValue("Remove cart item failed");
  }
});

// Lấy giỏ hàng
export const fetchCart = createAsyncThunk<Cart>(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await getCartApi();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message);
      }
      return rejectWithValue("Login failed");
    }
  }
);

// Thêm sản phẩm vào giỏ hàng
export const addToCart = createAsyncThunk<Cart, { productId: string; quantity: number }>(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      return await addToCartApi(productId, quantity);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message);
      }
      return rejectWithValue("Login failed");
    }
  }
);