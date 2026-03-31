import type { LoginResponse, RegisterResponse ,AuthRequest} from "../../types/authType";
import axiosInstance from "../../utils/axiosInstance";
export const logoutApi = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};
export const loginApi = async (data:AuthRequest): Promise<LoginResponse> => {
  const res = await axiosInstance.post("/auth/login-email", data);
  return res.data;
};

export const registerApi = async (data:AuthRequest): Promise<RegisterResponse> => {
  const res = await axiosInstance.post("/auth/register-email", data);
  return res.data;
};