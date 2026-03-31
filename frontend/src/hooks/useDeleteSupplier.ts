import { useState } from "react";
import { deleteSupplierApi } from "../services/supplierApi";

export const useDeleteSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSupplier = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await deleteSupplierApi(id);
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteSupplier,
    loading,
    error,
  };
};