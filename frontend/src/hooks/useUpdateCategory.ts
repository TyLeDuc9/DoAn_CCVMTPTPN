import { useState } from "react";
import { updateCategoryApi } from "../services/categoryApi";
import type { CategoryType } from "../types/categoryType";

export const useUpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCategory = async (
    id: string,
    data: Partial<CategoryType>
  ) => {
    try {
      setLoading(true);
      const res = await updateCategoryApi(id, data);
      return res;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Có lỗi xảy ra";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateCategory,
    loading,
    error,
  };
};