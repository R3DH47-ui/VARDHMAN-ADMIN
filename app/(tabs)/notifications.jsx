import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, fonts } from '@/theme';
import { TabHeaderCard } from '@/components/layout';
import { Chip, Icon } from '@/components/ui';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { useAppStore } from '@/store/useAppStore';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'orders', label: 'Orders' },
  { id: 'stock', label: 'Stock Alerts' },
  { id: 'schools', label: 'Schools' },
];

export function NotificationsScreen() {
  const notifications = useAppStore((s) => s.notifications);
  const markAsRead = useAppStore((s) => s.markNotificationAsRead);
  const markAllAsRead = useAppStore((s) => s.markAllNotificationsAsRead);

  const [activeFilter, setActiveFilter] = useState('all');

  const unreadCount = useAppStore((s) => s.getUnreadCount());

  const filtered = useMemo(() => {
    const list = notifications || [];
    if (activeFilter === 'all') return list;
    if (activeFilter === 'orders') {
      return list.filter((n) => {
        const t = (n.type || n.category || '').toUpperCase();
        return t.includes('ORDER') || t.includes('DELIVER') || t.includes('RETURN');
      });
    }
    if (activeFilter === 'stock') {
      return list.filter((n) => {
        const t = (n.type || n.category || '').toUpperCase();
        return t.includes('STOCK');
      });
    }
    if (activeFilter === 'schools') {
      return list.filter((n) => {
        const t = (n.type || n.category || '').toUpperCase();
        return t.includes('SCHOOL') || t.includes('PUBLISH') || t.includes('ITEM');
      });
    }
    return list;
  }, [notifications, activeFilter]);

  const todayItems = useMemo(
    () => filtered.filter((n) => (n.group || '').toUpperCase() === 'TODAY'),
    [filtered]
  );
  const earlierItems = useMemo(
    () => filtered.filter((n) => (n.group || '').toUpperCase() === 'EARLIER'),
    [filtered]
  );

  const allRead = unreadCount === 0;

  return (
    <View style={styles.screen}>
      <TabHeaderCard />

      {/* Page Title Row */}
      <View style={styles.pageTitleRow}>
        <View style={styles.pageTitleLeft}>
          <Text style={styles.pageTitle}>Admin Notifications</Text>
          <Text style={styles.pageSubtitle}>Portal Admin</Text>
        </View>
        <TouchableOpacity
          onPress={markAllAsRead}
          disabled={allRead}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.6}
        >
          <Text style={[styles.markAllText, allRead && styles.markAllTextDisabled]}>
            Mark all read
          </Text>
        </TouchableOpacity>
      </View>

      {/* Subheader: unread notice */}
      <View style={styles.noticeBar}>
        <View style={styles.noticeDot} />
        <Text style={styles.noticeText}>
          {unreadCount > 0
            ? `${unreadCount} pending critical notices`
            : 'No pending critical notices'}
        </Text>
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {FILTERS.map((f) => {
            const count =
              f.id === 'all'
                ? notifications.length
                : f.id === 'orders'
                ? notifications.filter(
                    (n) =>
                      n.type === 'ORDER' ||
                      n.type === 'DELIVERED' ||
                      n.type === 'RETURN_REQUESTED'
                  ).length
                : f.id === 'stock'
                ? notifications.filter((n) => n.type === 'LOW_STOCK').length
                : notifications.filter(
                    (n) =>
                      n.type === 'SCHOOL_ADDED' || n.type === 'ITEM_PUBLISHED'
                  ).length;

            return (
              <Chip
                key={f.id}
                label={f.label}
                count={count}
                selected={activeFilter === f.id}
                onPress={() => setActiveFilter(f.id)}
                size="sm"
              />
            );
          })}
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today Section */}
        {todayItems.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>TODAY</Text>
              <Text style={styles.sectionAction}>Recent first</Text>
            </View>
            <View style={styles.cardBox}>
              {todayItems.map((item) => (
                <NotificationItem
                  key={item.id}
                  notification={item}
                  onPress={() => markAsRead(item.id)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Earlier Section */}
        {earlierItems.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>EARLIER</Text>
              <Text style={styles.sectionAction}>Archive</Text>
            </View>
            <View style={styles.cardBox}>
              {earlierItems.map((item) => (
                <NotificationItem
                  key={item.id}
                  notification={item}
                  onPress={() => markAsRead(item.id)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Bottom all caught up */}
        <View style={styles.caughtUpContainer}>
          <Icon name="check-circle" size={24} color={colors.muted} />
          <Text style={styles.caughtUpTitle}>All caught up</Text>
          <Text style={styles.caughtUpSub}>
            Automated logs purge every 30 days.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default NotificationsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pageTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  pageTitleLeft: {
    flex: 1,
  },
  pageTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.ink,
    lineHeight: 24,
  },
  pageSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  markAllText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },
  markAllTextDisabled: {
    color: colors.muted,
    opacity: 0.5,
  },
  noticeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    gap: 6,
  },
  noticeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  noticeText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.primary,
  },
  filtersWrapper: {
    backgroundColor: colors.surface,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chipsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    marginTop: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 1.2,
  },
  sectionAction: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
  cardBox: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  caughtUpContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    gap: 4,
  },
  caughtUpTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.secondary,
    marginTop: 6,
  },
  caughtUpSub: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
});
