import axios from "axios";
import { API } from "../config/api";
import type { Product, ProductPagination } from "../types/productType";
import axiosInstance from "../utils/axiosInstance";
export const updateProductApi = async (
  id: string,
  formData: FormData
): Promise<{ message: string; product: Product }> => {
  const res = await axiosInstance.put(
    `${API}/product/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const getProductIdApi=async(id:string)=>{
  const res=await axiosInstance.get(`${API}/product/${id}`)
  return res.data
}

export const deleteProductApi = async (id: string) => {
  const res = await axiosInstance.delete(`${API}/product/${id}`);
  return res.data;
};

export const createProductApi = async (data: FormData): Promise<Product> => {
  const res = await axiosInstance.post(`${API}/product`, data);
  return res.data.product;
};

export const searchProductApi = async (name: string): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${API}/product/search`, {
    params: { name },
  });
  return res.data;
};

export const fourProductApi = async (
  categorySlug: string,
): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    `${API}/product/four/${categorySlug}`,
  );
  return response.data;
};

export const getProductSupplierApi = async (
  supplierSlug: string,
): Promise<Product[]> => {
  const res = await axios.get(`${API}/product/supplier/${supplierSlug}`);
  return res.data.data;
};

export const getProductByIdApi = async (slug: string): Promise<Product> => {
  const res = await axios.get<Product>(`${API}/product/${slug}`);
  return res.data;
};

export const getProductCategoryApi = async (
  categorySlug: string,
): Promise<Product[]> => {
  const res = await axios.get(`${API}/product/category/${categorySlug}`);
  return res.data.data;
};

export const getAllProductsApi = async (
  page = 1,
  limit = 20,
): Promise<ProductPagination> => {
  const res = await axios.get(`${API}/product`, {
    params: { page, limit },
  });
  return res.data;
};

export const getMeatFishApi = async (): Promise<Product[]> => {
  const res = await axios.get(`${API}/product/meat-fish`);
  return res.data;
};

export const getLatestApi = async (): Promise<Product[]> => {
  const res = await axios.get(`${API}/product/latest`);
  return res.data;
};
