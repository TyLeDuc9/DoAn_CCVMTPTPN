import { useState } from "react";
import { deleteProductApi } from "../services/productApi";

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await deleteProductApi(id);

      return res;
    }  catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteProduct,
    loading,
    error,
  };
};