import { useCallback, useMemo, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

/**
 * Hook to access and manage schools.
 * Returns normalized UI models with { data, isLoading, error, refetch }
 * and mutation helpers.
 *
 * @param {Object} [params]
 * @param {string} [params.searchQuery]
 * @param {string} [params.board]
 */
export function useSchools(params = {}) {
  const schools = useAppStore((s) => s.schools);
  const isLoading = useAppStore((s) => s.loading);
  const initData = useAppStore((s) => s.initData);
  const addSchool = useAppStore((s) => s.addSchool);
  const updateSchool = useAppStore((s) => s.updateSchool);
  const deleteSchool = useAppStore((s) => s.deleteSchool);

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
    let list = schools || [];
    if (params.board && params.board !== 'All boards') {
      const b = params.board.toLowerCase();
      list = list.filter((s) => s.affiliationBoard && s.affiliationBoard.toLowerCase().includes(b));
    }
    if (params.searchQuery && params.searchQuery.trim()) {
      const q = params.searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name?.toLowerCase().includes(q) ||
          s.address?.toLowerCase().includes(q) ||
          s.affiliationBoard?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [schools, params.board, params.searchQuery]);

  return {
    data: filteredData,
    schools,
    isLoading,
    error,
    refetch,
    addSchool,
    updateSchool,
    deleteSchool,
  };
}
