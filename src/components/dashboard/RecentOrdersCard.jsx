import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts, radii } from '@/theme';
import { StatusBadge, Card } from '@/components/ui';
import { formatINR } from '@/utils/format';

export function RecentOrdersCard({ orders = [], onViewAll }) {
  return (
    <Card style={styles.card} padding={0}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {onViewAll && (
          <TouchableOpacity onPress={onViewAll} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.viewAllText}>View all ›</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Orders List */}
      <View style={styles.list}>
        {orders.map((order, index) => {
          const isLast = index === orders.length - 1;
          return (
            <View
              key={order.id || order.orderNumber}
              style={[styles.orderItem, !isLast && styles.borderBottom]}
            >
              <View style={styles.orderLeft}>
                <View style={styles.orderNumberRow}>
                  <Text style={styles.orderNumber}>{order.orderNumber || order.id}</Text>
                  <Text style={styles.dotSeparator}>•</Text>
                  <Text style={styles.schoolName} numberOfLines={1}>
                    {order.schoolName || order.schoolFull || order.school}
                  </Text>
                </View>
                <Text style={styles.itemSummary} numberOfLines={1}>
                  {order.itemSummary || order.item}
                </Text>
                <Text style={styles.timeText}>{order.time}</Text>
              </View>

              <View style={styles.orderRight}>
                <Text style={styles.amountText}>{formatINR(order.amount)}</Text>
                <StatusBadge status={order.status} style={styles.badge} />
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.ink,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4EA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.full,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  liveText: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.success,
    letterSpacing: 0.5,
  },
  viewAllText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.primary,
  },
  list: {
    paddingHorizontal: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F0EC',
  },
  orderLeft: {
    flex: 1,
    marginRight: 12,
  },
  orderNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  orderNumber: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.ink,
  },
  dotSeparator: {
    marginHorizontal: 4,
    color: colors.muted,
  },
  schoolName: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.secondary,
    flex: 1,
  },
  itemSummary: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
    marginBottom: 2,
  },
  timeText: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: '#9CA3AF',
  },
  orderRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amountText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.ink,
    marginBottom: 4,
  },
  badge: {
    marginTop: 2,
  },
});
