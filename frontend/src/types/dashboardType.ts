import type { Product } from "./productType";

export interface DashboardStats {
  overview: Overview;
  status: StatusStat[];
  revenueByDay: RevenueByDay[];
  topProducts: TopProduct[];
  payment: PaymentStat[];
}
export interface Overview {
  _id: null;
  totalOrders: number;
  totalRevenue: number;
}
export interface StatusStat {
  _id: "pending" | "processing" | "delivered" | "cancelled";
  count: number;
}
export interface RevenueByDay {
  _id: {
    year: number;
    month: number;
    day: number;
  };
  revenue: number;
}
export interface TopProduct {
  _id: string;
  totalSold: number;
  product: Product;
}
export interface TopProduct {
  _id: string; 
  totalSold: number;
  product: Product;
}
export interface PaymentStat {
  _id: "Code" | "VNPAY";
  total: number;
  count: number;
}