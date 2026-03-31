import { useEffect, useState } from "react";
import { getLatestApi } from "../services/productApi";

import type {Product } from "../types/productType";

export const useLatestProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      setLoading(true);
      try {
        const res = await getLatestApi(); 
        setProducts(res); 
      }  catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  return { products, loading, error };
};