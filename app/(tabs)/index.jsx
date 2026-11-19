import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';
import { TabHeaderCard } from '@/components/layout';
import {
  OverviewCard,
  KpiGrid,
  RecentOrdersCard,
  LowStockCard,
  PartnerSchoolsCard,
} from '@/components/dashboard';
import { useAppStore } from '@/store/useAppStore';

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const schools = useAppStore((s) => s.schools);
  const products = useAppStore((s) => s.products);
  const orders = useAppStore((s) => s.recentOrders);
  const lowStockItems = useAppStore((s) => s.lowStockItems);
  const loadInitialData = useAppStore((s) => s.loadInitialData);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (typeof loadInitialData === 'function') {
      await loadInitialData();
    }
    setRefreshing(false);
  }, [loadInitialData]);

  // Dynamic counts
  const totalSkus = products.length > 0 ? products.length : 186;
  const lowStockCount = lowStockItems.length > 0 ? lowStockItems.length : 7;

  return (
    <View style={styles.screen}>
      <TabHeaderCard />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <OverviewCard
          actionCount={2}
          greeting="Good morning, Rakesh"
          subtitle="High dispatch volume scheduled for Greenfield & DAV today."
          progressPercent={76}
        />

        <KpiGrid
          ordersToday={24}
          ordersComparison="+8 vs yesterday"
          revenue="₹42,860"
          revenueComparison="+14% vs avg"
          activeSkus={totalSkus}
          schoolsCount={schools.length}
          lowStockItems={lowStockCount}
        />

        <RecentOrdersCard
          orders={orders}
          onViewAll={() => router.push('/(tabs)/notifications')}
        />

        <LowStockCard
          items={lowStockItems}
          onReportPress={() => router.push('/(tabs)/products')}
        />

        <PartnerSchoolsCard schools={schools} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
