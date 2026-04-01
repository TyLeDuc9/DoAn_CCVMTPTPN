// hooks/useAllCart.ts
import { useEffect, useState } from "react";
import { getAllCartApi } from "../redux/Cart/cartApi";
import type { CartAll } from "../types/cartType";

export const useAllCart = () => {
  const [carts, setCarts] = useState<CartAll[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCarts = async () => {
    try {
      setLoading(true);
      const data = await getAllCartApi();
      setCarts(data); 
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  return {
    carts,
    loading,
    error,
    refetch: fetchCarts,
  };
};
