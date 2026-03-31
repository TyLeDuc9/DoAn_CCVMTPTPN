import { useEffect, useState } from "react";
import { getAllSupplierApi } from "../services/supplierApi";
import type { SupplierType } from "../types/supplierType";

export const useAllSupplier = () => {
  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllSupplierApi();
        setSuppliers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategory();
  }, []);

  return {
    suppliers,
    loading,
    error,
  };
};
