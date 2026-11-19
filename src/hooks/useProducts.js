import { useCallback, useMemo, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

/**
 * Hook to access and manage products.
 * Returns normalized UI models with { data, isLoading, error, refetch }
 * and mutation helpers.
 *
 * @param {Object} [filters]
 * @param {string} [filters.category]
 * @param {string} [filters.schoolId]
 * @param {string} [filters.searchQuery]
 */
export function useProducts(filters = {}) {
  const products = useAppStore((s) => s.products);
  const isLoading = useAppStore((s) => s.loading);
  const initData = useAppStore((s) => s.initData);
  const addProduct = useAppStore((s) => s.addProduct);
  const updateProduct = useAppStore((s) => s.updateProduct);
  const deleteProduct = useAppStore((s) => s.deleteProduct);

  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setError(null);
      await initData();
    } catch (err) {
      setError(err);
    }
  }, [initData]);

  const filteredData = useMemo(() => {
    let list = products || [];
    if (filters.schoolId && filters.schoolId !== 'all') {
      list = list.filter((p) => p.schoolId === filters.schoolId);
    }
    if (filters.category && filters.category !== 'All') {
      const cat = filters.category.toLowerCase();
      list = list.filter((p) => p.category?.toLowerCase() === cat);
    }
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.school?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, filters.schoolId, filters.category, filters.searchQuery]);

  return {
    data: filteredData,
    products,
    isLoading,
    error,
    refetch,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
