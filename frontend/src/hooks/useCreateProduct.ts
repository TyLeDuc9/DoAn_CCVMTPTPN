import { useState } from "react";
import { createProductApi } from "../services/productApi";

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (formData: FormData) => {
    try {
      setLoading(true);
      setError(null);

      const data = await createProductApi(formData);
      return data;
    }  catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
  };

  return { createProduct, loading, error };
};