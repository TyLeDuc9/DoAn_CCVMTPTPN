
export interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Supplier {
  _id: string;
  name: string;
}
export interface ProductPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Product[];
}
export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId?: string | Category;     
  supplierId?: string | Supplier;     
  image_url?: string;
  slug: string;
  organic_certification?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ProductByCategoryResponse {
  success: boolean;
  count: number;
  data: Product[];
}