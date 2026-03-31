// hooks/useDashboard.ts
import { useEffect, useState } from "react";
import { getDashboardApi } from "../redux/Order/orderApi";
import type { DashboardStats } from "../types/dashboardType";

export const useDashboard = () => {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await getDashboardApi();
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard,
  };
};
