import axios from "axios";
import { API } from "../config/api";
import type { GetAllCategoryResponse, CategoryCreate, CategoryType } from "../types/categoryType";
    import axiosInstance from "../utils/axiosInstance";

export const getCategoryIdApi=async(id:string)=>{
    const res=await axios.get(`${API}/category/${id}`)
    return res.data
}

export const updateCategoryApi = async (
  id: string,
  data: Partial<CategoryType>
) => {
  const res = await axiosInstance.put(`/category/${id}`, data);
  return res.data;
};

export const deleteCategoryApi=async(id:string)=>{
    const res=await axiosInstance.delete(`${API}/category/${id}`)
    return res.data
}
export const CreateCategoryApi = async (data: CategoryCreate) => {
    const res = await axiosInstance.post(`${API}/category`, data)
    return res.data
}
export const getAllCategoryApi=async():Promise<GetAllCategoryResponse>=>{
    const res=await axios.get(`${API}/category`)
    return res.data
}