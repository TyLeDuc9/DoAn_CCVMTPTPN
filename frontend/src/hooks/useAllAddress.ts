import { useEffect, useState } from "react";
import { getAllAddressesApi } from "../redux/Address/addressApi";
import type { AddressAll } from "../types/addressType";

export const useAllAddress = () => {
  const [addresses, setAddresses] = useState<AddressAll[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await getAllAddressesApi();
      setAddresses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addresses,
    loading,
    error,
    refetch: fetchAddresses,
  };
};
