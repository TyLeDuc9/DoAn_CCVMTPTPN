import type { User } from "./userType";

export type ChangePassRequest = {
  oldPassword: string;
  newPassword: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
export type AuthRequest={
  email:string,
  password:string
}
export type RegisterResponse = {
  message: string;
  userId: string;
};