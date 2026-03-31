import { useState } from "react";
import { deleteCategoryApi } from "../services/categoryApi";

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCategory = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await deleteCategoryApi(id);

      return res;
    }  catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteCategory,
    loading,
    error,
  };
};