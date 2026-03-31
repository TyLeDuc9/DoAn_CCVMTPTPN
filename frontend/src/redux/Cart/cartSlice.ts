// cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart } from "../../types/cartType";
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "./cartThunk";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchCart
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCart.fulfilled,
      (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // addToCart
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateCartItem.fulfilled,
      (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(removeCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      removeCartItem.fulfilled,
      (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(removeCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
