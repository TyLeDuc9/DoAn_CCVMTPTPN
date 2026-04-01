// hooks/useCreateSupplier.ts
import { useState } from "react";
import { createSupplierApi } from "../services/supplierApi";
import type { SupplierType } from "../types/supplierType";

export const useCreateSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSupplier = async (data: Partial<SupplierType>) => {
    try {
      setLoading(true);
      setError(null);

      const res = await createSupplierApi(data);
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    createSupplier,
    loading,
    error,
  };
};
