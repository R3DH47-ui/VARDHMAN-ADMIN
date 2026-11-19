import { useCallback, useMemo, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

/**
 * Hook to access and manage notifications.
 * Returns normalized UI models with { data, isLoading, error, refetch }
 * and markAsRead / markAllAsRead methods.
 *
 * @param {string} [categoryFilter='all']
 */
export function useNotifications(categoryFilter = 'all') {
  const notifications = useAppStore((s) => s.notifications);
  const isLoading = useAppStore((s) => s.loading);
  const initData = useAppStore((s) => s.initData);
  const markNotificationAsRead = useAppStore((s) => s.markNotificationAsRead);
  const markAllNotificationsAsRead = useAppStore((s) => s.markAllNotificationsAsRead);
  const unreadCount = useAppStore((s) => s.getUnreadCount());

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
    const list = notifications || [];
    if (!categoryFilter || categoryFilter === 'all') return list;
    if (categoryFilter === 'orders') {
      return list.filter((n) => {
        const t = (n.type || n.category || '').toUpperCase();
        return t.includes('ORDER') || t.includes('DELIVER') || t.includes('RETURN');
      });
    }
    if (categoryFilter === 'stock') {
      return list.filter((n) => {
        const t = (n.type || n.category || '').toUpperCase();
        return t.includes('STOCK');
      });
    }
    if (categoryFilter === 'schools') {
      return list.filter((n) => {
        const t = (n.type || n.category || '').toUpperCase();
        return t.includes('SCHOOL') || t.includes('PUBLISH') || t.includes('ITEM');
      });
    }
    return list;
  }, [notifications, categoryFilter]);

  return {
    data: filteredData,
    notifications,
    unreadCount,
    isLoading,
    error,
    refetch,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  };
}
