import { useEffect, useState } from "react";
import { getSupplierIdApi } from "../services/supplierApi";
import type { SupplierType } from "../types/supplierType";

export const useGetSupplierId = (id: string) => {
  const [supplier, setSupplier] = useState<SupplierType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchSupplier = async () => {
      try {
        setLoading(true);
        const res = await getSupplierIdApi(id);
        setSupplier(res.data || res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  return { supplier, loading, error };
};