import { useEffect, useState } from "react";
import { getAllCategoryApi } from "../services/categoryApi";
import type { CategoryType } from "../types/categoryType";

export const useAllCategory = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllCategoryApi();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategory();
  }, []);

  return {
    categories,
    loading,
    error,
  };
};