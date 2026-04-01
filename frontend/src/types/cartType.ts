// cartType
import type { Product } from "./productType"; 
import type { User } from "./userType"; 

export interface CartItem {
    _id: string;
  product: Product; 
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartAll {
  _id: string;
  userId: User;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}