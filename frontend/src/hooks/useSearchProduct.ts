import { useState } from "react";
import { searchProductApi } from "../services/productApi"; 
import type { Product } from "../types/productType";

export const useSearchProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProduct = async (name: string) => {
    if (!name) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await searchProductApi(name);
      setProducts(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, searchProduct };
};