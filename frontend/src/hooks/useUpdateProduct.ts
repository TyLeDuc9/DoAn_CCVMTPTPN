import { useState } from "react";
import { updateProductApi } from "../services/productApi";
import type { Product } from "../types/productType";

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (
    id: string,
    formData: FormData
  ): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);

      const res = await updateProductApi(id, formData);
      return res.product;

    } catch (err: any) {
      setError(err.response?.data?.message || "Cập nhật thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProduct,
    loading,
    error,
  };
};