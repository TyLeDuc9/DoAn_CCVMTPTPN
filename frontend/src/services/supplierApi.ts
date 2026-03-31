import axios from "axios";
import { API } from "../config/api";
import axiosInstance from "../utils/axiosInstance";
import type {
  GetAllSupplierResponse,
  SupplierType,
} from "../types/supplierType";

export const updateSupplierApi = async (
  id: string,
  data: Partial<SupplierType>,
) => {
  const res = await axiosInstance.put(`${API}/supplier/${id}`, data);
  return res.data;
};

export const getSupplierIdApi = async (id: string) => {
  const res = await axios.get(`${API}/supplier/${id}`);
  return res.data;
};
export const deleteSupplierApi = async (id: string) => {
  const res = await axiosInstance.delete(`${API}/supplier/${id}`);
  return res.data;
};
export const createSupplierApi = async (data: Partial<SupplierType>) => {
  const res = await axiosInstance.post(`${API}/supplier`, data);
  return res.data;
};
export const getAllSupplierApi = async (): Promise<GetAllSupplierResponse> => {
  const res = await axios.get(`${API}/supplier`);
  return res.data;
};
