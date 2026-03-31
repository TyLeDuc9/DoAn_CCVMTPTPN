// addressType.ts
export interface Address {
  _id: string;
  userId: string;
  fullName: string;
  phone: string;
  address:string,
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  phone: string;
  birthday: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}
export interface AddressAll {
  _id: string;
  userId: User;
  fullName: string;
  phone: string;
  address: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}