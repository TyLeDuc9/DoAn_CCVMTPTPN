
import type { PopulatedOrder, AllOrder } from "../../types/orderType";
import axiosInstance from "../../utils/axiosInstance";
import type { DashboardStats } from "../../types/dashboardType";
interface CreateOrderPayload {
  shippingAddressId: string;
  payment_method: "Code" | "VNPAY";
}

export const getAllOrder=async():Promise<AllOrder>=>{
  const res=await axiosInstance.get('/order/all')
  return res.data
}

export const getDashboardApi = async (): Promise<DashboardStats> => {
  const res = await axiosInstance.get("/order/dashboard");
  return res.data;
};

export const createOrder = async (payload: CreateOrderPayload): Promise<PopulatedOrder> => {
  const { data } = await axiosInstance.post("/order", payload);
  return data;
};


export const getUserOrders = async (): Promise<PopulatedOrder[]> => {
  const { data } = await axiosInstance.get("/order");
  return data;
};


export const getOrderById = async (orderId: string): Promise<PopulatedOrder> => {
  const { data } = await axiosInstance.get(`/order/${orderId}`);
  return data;
};


export const updateOrderStatus = async (
  orderId: string, 
  status: "pending" | "processing" | "delivered" | "cancelled"
): Promise<PopulatedOrder> => {
    const { data } = await axiosInstance.put(`/order/${orderId}/status`, { status });
    return data;
}