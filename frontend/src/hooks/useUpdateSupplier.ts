import { useState } from "react";
import { updateSupplierApi } from "../services/supplierApi";
import type { SupplierType } from "../types/supplierType";

export const useUpdateSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const updateSupplier = async (
    id: string,
    data: Partial<SupplierType>
  ) => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const res = await updateSupplierApi(id, data);

      setSuccess(true);
      return res;
    } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
  };

  return { updateSupplier, loading, error, success };
};