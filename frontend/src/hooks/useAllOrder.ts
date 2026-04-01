import { useState, useEffect } from "react";
import { getAllOrder } from "../redux/Order/orderApi";
import type { AllOrder } from "../types/orderType";

export const useAllOrder = () => {
  const [orders, setOrders] = useState<AllOrder>([]); // <-- đây là key
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getAllOrder();
        if (Array.isArray(data)) {
          setOrders(data); // data là AllOrder = PopulatedOrder[]
        } else {
          setOrders([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return { orders, loading, error };
};