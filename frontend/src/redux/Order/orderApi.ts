// orderApi.ts
import type { PopulatedOrder, AllOrder } from "../../types/orderType";
import axiosInstance from "../../utils/axiosInstance";
import type { DashboardStats } from "../../types/dashboardType";
interface CreateOrderPayload {
  shippingAddressId: string;
  payment_method: "Code" | "VNPAY";
}

export const getAllOrder=async():Promise<AllOrder>=>{
  const res=await axiosInstance.get('/order')
  return res.data
}

export const getDashboardApi = async (): Promise<DashboardStats> => {
  const res = await axiosInstance.get("/order/dashboard");
  return res.data;
};
// Tạo Order
export const createOrder = async (payload: CreateOrderPayload): Promise<PopulatedOrder> => {
  const { data } = await axiosInstance.post("/order", payload);
  return data;
};

// Lấy tất cả Order của user
export const getUserOrders = async (): Promise<PopulatedOrder[]> => {
  const { data } = await axiosInstance.get("/order");
  return data;
};

// Lấy chi tiết Order
export const getOrderById = async (orderId: string): Promise<PopulatedOrder> => {
  const { data } = await axiosInstance.get(`/order/${orderId}`);
  return data;
};

// Cập nhật trạng thái Order (admin)
export const updateOrderStatus = async (
  orderId: string, 
  status: "pending" | "processing" | "delivered" | "cancelled"
): Promise<PopulatedOrder> => {
  const { data } = await axiosInstance.patch(`/order/${orderId}`, { status });
  return data;
};