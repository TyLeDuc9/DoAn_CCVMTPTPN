import { useState, useEffect } from "react";
import type { ProductPagination, Product } from "../types/productType";
import { getAllProductsApi } from "../services/productApi";

export const useAllProducts = (page = 1, limit = 20) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res: ProductPagination = await getAllProductsApi(page, limit);
        setProducts(res.data);
        setTotalPages(res.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  return { products, loading, error, totalPages };
};