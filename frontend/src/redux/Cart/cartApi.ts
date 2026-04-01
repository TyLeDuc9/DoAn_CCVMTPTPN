import type { Cart, CartAll } from "../../types/cartType";
import axiosInstance from "../../utils/axiosInstance";
export const getAllCartApi = async (): Promise<CartAll[]> => {
  const res = await axiosInstance.get("/cart/all");
  return res.data;
};

export const updateCartApi = async (productId: string, quantity: number): Promise<Cart> => {
  const response = await axiosInstance.put(`/cart/update`, { productId, quantity }, { withCredentials: true });
  return response.data;
};

export const removeCartItemApi = async (productId: string): Promise<Cart> => {
  const response = await axiosInstance.delete(`/cart/remove/${productId}`, { withCredentials: true });
  return response.data;
};
export const getCartApi = async (): Promise<Cart> => {
  const response = await axiosInstance.get(`/cart`, { withCredentials: true });
  return response.data;
};


export const addToCartApi = async (productId: string, quantity: number): Promise<Cart> => {
  const response = await axiosInstance.post(`/cart/add`, { productId, quantity }, { withCredentials: true });
  return response.data;
};