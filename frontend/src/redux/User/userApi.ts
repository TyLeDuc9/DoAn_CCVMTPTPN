import type { User, UpdateUserRequest, GetAllUsersResponse} from "../../types/userType";
import axiosInstance from "../../utils/axiosInstance";
export const changePasswordApi = async (
  oldPassword: string,
  newPassword: string
): Promise<{ message: string }> => {
  const res = await axiosInstance.put('/user/change-password', { oldPassword, newPassword });
  return res.data; 
};

export const getAllUser = async (): Promise<User[]> => {
  const res = await axiosInstance.get<GetAllUsersResponse>('/user'); 
  return res.data.data; 
};
export const getMeApi = async (): Promise<User> => {
  const res = await axiosInstance.get('/user/me');
  return res.data.user
};
export const updateUserApi = async (id: string, data: UpdateUserRequest): Promise<User> => {
  const res = await axiosInstance.put(`/user/${id}`, data);
  return res.data.user;
};