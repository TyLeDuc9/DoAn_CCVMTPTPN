import { useState, useEffect } from "react";
import type { Product, Supplier } from "../types/productType";
import { getProductSupplierApi } from "../services/productApi";

export const useProductSupplier = (supplierSlug: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [supplier, setSupplier] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supplierSlug) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data: Product[] = await getProductSupplierApi(supplierSlug);
        setProducts(data);

        if (data.length > 0 && typeof data[0].supplierId !== "string") {
          const sup = data[0].supplierId as Supplier;
          setSupplier(sup.name);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [supplierSlug]);

  return { products, supplier, loading, error };
};