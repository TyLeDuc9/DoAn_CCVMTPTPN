
export interface SupplierType {
  _id: string;
  name: string;
  slug: string;
  phone:string;
  address:string,
  email:string,
  createdAt: string;
  updatedAt: string;
}
export type GetAllSupplierResponse = SupplierType[];