import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts, radii } from '@/theme';
import { Icon } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';

export function AppHeader({
  title,
  subtitle,
  showBack = false,
  rightActions,
  style,
}) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const unreadCount = useAppStore((state) => state.getUnreadCount());

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }, style]}>
      <View style={styles.headerContent}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color={colors.ink} />
          </TouchableOpacity>
        ) : null}

        <View style={styles.titleSection}>
          {title ? (
            <View>
              <Text style={styles.titleText}>{title}</Text>
              {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
            </View>
          ) : (
            <View style={styles.brandRow}>
              <Text style={styles.brandWordmark}>Vardhman</Text>
              <View style={styles.adminBadge}>
                <Text style={styles.adminBadgeText}>ADMIN PORTAL</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.rightSection}>
          {rightActions || (
            <View style={styles.defaultActions}>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/products')}
                style={styles.iconBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon name="search" size={22} color={colors.ink} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/(tabs)/notifications')}
                style={styles.iconBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon name="notifications" size={22} color={colors.ink} />
                {unreadCount > 0 && (
                  <View style={styles.notificationDot}>
                    <Text style={styles.notificationDotText}>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>RK</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  titleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandWordmark: {
    fontFamily: fonts.brand,
    fontSize: 22,
    lineHeight: 26,
    color: colors.primary,
    marginRight: 8,
  },
  adminBadge: {
    backgroundColor: colors.blush,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  adminBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.primary,
    letterSpacing: 0.8,
  },
  titleText: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.ink,
    lineHeight: 22,
  },
  subtitleText: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
    lineHeight: 14,
    marginTop: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    position: 'relative',
    padding: 4,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  notificationDotText: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
    fontSize: 9,
    lineHeight: 11,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8E3DE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9D4CE',
  },
  avatarText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.ink,
  },
});
