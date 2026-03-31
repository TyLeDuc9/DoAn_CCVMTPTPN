
import { useState, useEffect } from "react";
import type { Product } from "../types/productType";
import { getProductByIdApi } from "../services/productApi";

export const useGetProductSlug = (slug: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductByIdApi(slug);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
};
