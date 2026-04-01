import { useState } from "react";
import { updateOrderStatus } from "../redux/Order/orderApi";

export const useUpdateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (
    orderId: string,
    status: "pending" | "processing" | "delivered" | "cancelled",
  ) => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      setLoading(false);
      return updatedOrder;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
};
