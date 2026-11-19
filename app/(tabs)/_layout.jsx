import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/layout';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="products" options={{ title: 'Products' }} />
      <Tabs.Screen name="schools" options={{ title: 'Schools' }} />
      <Tabs.Screen name="notifications" options={{ title: 'Alerts' }} />
    </Tabs>
  );
}
