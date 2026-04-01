import type { Address, AddressAll } from "../../types/addressType";
import axiosInstance from "../../utils/axiosInstance";


export const getAllAddressesApi = async (): Promise<AddressAll[]> => {
  const res = await axiosInstance.get("/address/all");
  return res.data;
};
// CREATE
export const createAddressApi = async (
  data: Partial<Address>
): Promise<Address> => {
  const res = await axiosInstance.post("/address", data);
  return res.data;
};

// GET ALL
export const getAddressesApi = async (): Promise<Address[]> => {
  const res = await axiosInstance.get("/address");
  return res.data;
};

// UPDATE
export const updateAddressApi = async (
  id: string,
  data: Partial<Address>
): Promise<Address> => {
  const res = await axiosInstance.put(`/address/${id}`, data);
  return res.data;
};

// DELETE
export const deleteAddressApi = async (id: string): Promise<string> => {
  await axiosInstance.delete(`/address/${id}`);
  return id;
};