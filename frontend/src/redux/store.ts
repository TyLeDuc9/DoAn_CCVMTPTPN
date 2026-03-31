//store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import userReducer from "./User/userSlice";
import cartReducer from "./Cart/cartSlice";
import addressReducer from "./Address/addressSlice";
import orderReducer from "./Order/orderSlice";

import { injectStore } from "./storeRef";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    cart:cartReducer,
    address:addressReducer,
    order:orderReducer,

  },
});
injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
