import { useState, useEffect } from "react";
import { fourProductApi } from "../services/productApi";
import type { Product } from "../types/productType";

export const useFourProduct = (categorySlug: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fourProductApi(categorySlug);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  return { products, loading, error };
};
