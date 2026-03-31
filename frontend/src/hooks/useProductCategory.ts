import { useEffect, useState } from "react";
import { getProductCategoryApi } from "../services/productApi";
import type { Product, Category } from "../types/productType";

export const useProductCategory = (categorySlug: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nameCategory, setNameCategory] = useState<string>("");

  useEffect(() => {
    if (!categorySlug) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProductCategoryApi(categorySlug);
        setProducts(res);
        setNameCategory((res[0]?.categoryId as Category)?.name || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  return {
    products,
    loading,
    error,
    nameCategory
  };
};
