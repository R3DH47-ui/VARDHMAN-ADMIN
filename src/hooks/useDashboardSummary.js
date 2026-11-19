import { useCallback, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

/**
 * Hook to access dashboard KPIs, recent orders, and low-stock items.
 * Returns normalized UI models with { data, isLoading, error, refetch }.
 */
export function useDashboardSummary() {
  const summary = useAppStore((s) => s.dashboardSummary);
  const recentOrders = useAppStore((s) => s.recentOrders);
  const lowStockItems = useAppStore((s) => s.lowStockItems);
  const isLoading = useAppStore((s) => s.loading);
  const initData = useAppStore((s) => s.initData);

  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setError(null);
      await initData();
    } catch (err) {
      setError(err);
    }
  }, [initData]);

  return {
    data: summary,
    recentOrders,
    lowStockItems,
    isLoading,
    error,
    refetch,
  };
}
