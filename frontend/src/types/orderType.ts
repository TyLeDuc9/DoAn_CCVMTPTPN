import type { User } from '../types/userType';

// ---------------------
// Product trong Order
// ---------------------
export interface PopulatedOrderProduct {
  productId: {
    _id: string;
    name: string;
    price: number;
    image_url?: string;
  };
  quantity: number;
  price: number;
  _id: string;
}

// ---------------------
// Address trong Order
// ---------------------
export interface PopulatedAddress {
  _id: string;
  userId: string; // id của user
  fullName: string;
  phone: string;
  address: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------------------
// Order đã populate
// ---------------------
export interface PopulatedOrder {
  _id: string;
  userId: User;  // <-- quan trọng: object User
  products: PopulatedOrderProduct[];
  total_amount: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  shippingAddressId: PopulatedAddress;
  payment_method: "Code" | "VNPAY";
  createdAt: string;
  updatedAt: string;
}

// ---------------------
// All orders
// ---------------------
export type AllOrder = PopulatedOrder[];