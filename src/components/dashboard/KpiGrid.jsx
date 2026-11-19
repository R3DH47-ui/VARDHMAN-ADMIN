import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/theme';
import { Icon } from '@/components/ui';

export function KpiGrid({
  ordersToday = 24,
  ordersComparison = '+8 vs yesterday',
  revenue = '₹42,860',
  revenueComparison = '+14% vs avg',
  activeSkus = 186,
  schoolsCount = 3,
  lowStockItems = 7,
}) {
  return (
    <View style={styles.grid}>
      {/* Orders Today */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>Orders Today</Text>
          <Icon name="shopping-bag" size={16} color={colors.secondary} />
        </View>
        <Text style={styles.kpiValue}>{ordersToday}</Text>
        <Text style={styles.trendPositive}>{ordersComparison}</Text>
      </View>

      {/* Revenue */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>Revenue</Text>
          <Icon name="trending-up" size={16} color={colors.success} />
        </View>
        <Text style={styles.kpiValue}>{revenue}</Text>
        <Text style={styles.trendPositive}>{revenueComparison}</Text>
      </View>

      {/* Active SKUs */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>Active SKUs</Text>
          <Icon name="inventory" size={16} color={colors.secondary} />
        </View>
        <Text style={styles.kpiValue}>{activeSkus}</Text>
        <Text style={styles.trendNeutral}>Across {schoolsCount} schools</Text>
      </View>

      {/* Low Stock Items */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>Low Stock Items</Text>
          <Icon name="warning" size={16} color={colors.error} />
        </View>
        <Text style={[styles.kpiValue, { color: colors.error }]}>{lowStockItems}</Text>
        <Text style={styles.trendWarning}>Immediate restock</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.secondary,
  },
  kpiValue: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.ink,
    marginBottom: 4,
  },
  trendPositive: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.success,
  },
  trendNeutral: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
  trendWarning: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.error,
  },
});
