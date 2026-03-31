import { useEffect, useState } from "react";
import { getProductIdApi } from "../services/productApi";
import type { Product } from "../types/productType";

export const useGetProductId = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getProductIdApi(id);
      setProduct(res.data); 

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};