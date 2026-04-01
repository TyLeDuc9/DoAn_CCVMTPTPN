export interface User {
  _id?: string; 
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  gender?: "male" | "female" | "unknown";
  birthday?: Date;
  role?: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  gender?: "male" | "female" | "unknown";
  birthday?: string;
}
export interface GetAllUsersResponse {
  success: boolean;
  count: number;
  data: User[];
}