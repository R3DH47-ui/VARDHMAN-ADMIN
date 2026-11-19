import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/theme';
import { Icon } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';

const VSU_LOGO = require('../../../assets/vsu-logo.jpeg');

export function TabHeaderCard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const unreadCount = useAppStore((state) => state.getUnreadCount());

  return (
    <View style={[styles.wrapper, { paddingTop: Math.max(insets.top, 8) + 4 }]}>
      <View style={styles.card}>
        {/* Left: Circular Logo (48px, pure white bg, contain, ~5% padding) */}
        <View style={styles.logoCircle}>
          <Image
            source={VSU_LOGO}
            style={styles.logoImage}
            contentFit="contain"
            accessibilityLabel="Vardhman Logo"
          />
        </View>

        {/* Middle: Brand text (Two lines: Vardhman / Admin Portal) */}
        <View style={styles.brandCol}>
          <Text style={styles.brandTitle} numberOfLines={1} ellipsizeMode="tail">
            Vardhman
          </Text>
          <Text style={styles.brandSubtitle} numberOfLines={1} ellipsizeMode="tail">
            Admin Portal
          </Text>
        </View>

        {/* Right: Search, Bell with badge, RK Profile circle */}
        <View style={styles.rightActions}>
          {/* Search Trigger */}
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/products')}
            style={styles.actionBtn}
            hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Search catalog"
          >
            <Icon name="search" size={21} color={colors.ink} />
          </TouchableOpacity>

          {/* Bell with Unread Badge */}
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/notifications')}
            style={styles.actionBtn}
            hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Icon name="notifications" size={21} color={colors.ink} />
            {unreadCount > 0 && (
              <View style={styles.notificationDot}>
                <Text style={styles.notificationDotText}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* RK Profile Circle (40px, #EFEEEB bg, Inter 600) */}
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>RK</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: colors.background,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 66,
    borderRadius: 33,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#B0000F',
    paddingHorizontal: 9,
    shadowColor: '#B0000F',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2.5,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  brandCol: {
    marginLeft: 8,
    flex: 1,
    justifyContent: 'center',
  },
  brandTitle: {
    fontFamily: fonts.brand,
    fontSize: 21,
    lineHeight: 24,
    color: '#B0000F',
  },
  brandSubtitle: {
    fontFamily: fonts.semiBold,
    fontSize: 12.5,
    lineHeight: 16,
    color: '#5F5E5E',
    marginTop: 0.5,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 6,
  },
  actionBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#B0000F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  notificationDotText: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
    fontSize: 9,
    lineHeight: 11,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFEEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: '#1A1A1A',
  },
});
