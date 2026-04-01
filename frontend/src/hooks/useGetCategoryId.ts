import { useEffect, useState } from "react";
import { getCategoryIdApi } from "../services/categoryApi";

export const useGetCategoryId = (id: string) => {
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await getCategoryIdApi(id);
      setCategory(res);
    }  catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    if (id) fetchCategory();
  }, [id]);

  return { category, loading, error, refetch: fetchCategory };
};