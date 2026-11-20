import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  AccessibilityInfo,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { colors, fonts } from '@/theme';
import { Icon } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';

const TABS = [
  { name: 'index', label: 'Dashboard', icon: 'dashboard', path: '/(tabs)' },
  { name: 'products', label: 'Products', icon: 'shopping-bag', path: '/(tabs)/products' },
  { name: 'schools', label: 'Schools', icon: 'school', path: '/(tabs)/schools' },
  { name: 'notifications', label: 'Alerts', icon: 'notifications', path: '/(tabs)/notifications' },
];

const CIRCLE_SIZE = 52;
const ICON_SCALE_ACTIVE = 1.18;

function TabItem({ tab, isFocused, onPress, unreadCount, reduceMotion }) {
  const circleScale = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const circleOpacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const iconScale = useRef(new Animated.Value(isFocused ? ICON_SCALE_ACTIVE : 1)).current;

  const prevFocused = useRef(isFocused);

  useEffect(() => {
    if (isFocused === prevFocused.current) return;
    prevFocused.current = isFocused;

    if (isFocused) {
      if (reduceMotion) {
        circleOpacity.setValue(1);
        circleScale.setValue(1);
        iconScale.setValue(ICON_SCALE_ACTIVE);
      } else {
        circleScale.setValue(0.3);
        circleOpacity.setValue(1);
        Animated.parallel([
          Animated.timing(circleScale, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.spring(iconScale, {
            toValue: ICON_SCALE_ACTIVE,
            useNativeDriver: true,
            speed: 18,
            bounciness: 10,
          }),
        ]).start();
      }
    } else if (reduceMotion) {
      circleOpacity.setValue(0);
      circleScale.setValue(0);
      iconScale.setValue(1);
    } else {
      Animated.parallel([
        Animated.timing(circleOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        circleScale.setValue(0);
      });
    }
  }, [isFocused, reduceMotion, circleScale, circleOpacity, iconScale]);

  const isAlertTab = tab.name === 'notifications';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={tab.label}
      onPress={onPress}
      style={styles.tabButton}
    >
      <View style={styles.iconArea}>
        <Animated.View
          style={[
            styles.circleHighlight,
            {
              opacity: circleOpacity,
              transform: [{ scale: circleScale }],
            },
          ]}
        />
        <Animated.View style={{ transform: [{ scale: iconScale }] }}>
          <Icon
            name={tab.icon}
            size={22}
            color={isFocused ? colors.primary : colors.muted}
          />
        </Animated.View>
        {isAlertTab && unreadCount > 0 && (
          <View style={styles.badgeDot}>
            <Text style={styles.badgeText}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </Text>
          </View>
        )}
      </View>
      <Text
        style={[
          styles.label,
          isFocused ? styles.labelActive : styles.labelInactive,
        ]}
      >
        {tab.label}
      </Text>
    </Pressable>
  );
}

export function TabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const unreadCount = useAppStore((s) => s.getUnreadCount());

  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const checkMotion = async () => {
      try {
        const isReduced = await AccessibilityInfo.isReduceMotionEnabled();
        setReduceMotion(isReduced);
      } catch (_) {
        /* ignore */
      }
    };
    void checkMotion();
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', (val) => {
      setReduceMotion(val);
    });
    return () => {
      if (sub?.remove) sub.remove();
    };
  }, []);

  const routes = state?.routes || TABS.map((t) => ({ name: t.name, key: t.name }));

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 6) }]}>
      <View style={styles.tabContainer}>
        {routes.map((route, index) => {
          const isFocused = state ? state.index === index : pathname.includes(route.name);
          const tabConfig = TABS.find((t) => t.name === route.name) || {
            label: route.name,
            icon: 'help-outline',
            path: `/(tabs)/${route.name}`,
          };

          const handlePress = () => {
            if (navigation && typeof navigation.emit === 'function') {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (event?.defaultPrevented) return;
            }

            if (navigation && typeof navigation.navigate === 'function') {
              navigation.navigate(route.name);
            } else if (route.name === 'index') {
              router.navigate('/(tabs)');
            } else {
              router.navigate(`/(tabs)/${route.name}`);
            }
          };

          return (
            <TabItem
              key={route.key || route.name}
              tab={tabConfig}
              isFocused={isFocused}
              onPress={handlePress}
              unreadCount={unreadCount}
              reduceMotion={reduceMotion}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 6,
  },
  tabContainer: {
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  iconArea: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE * 0.62,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circleHighlight: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE * 0.62,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'rgba(176, 0, 15, 0.14)',
  },
  badgeDot: {
    position: 'absolute',
    top: -4,
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
    zIndex: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
    fontSize: 8,
    lineHeight: 10,
  },
  label: {
    fontSize: 10,
    marginTop: 2,
  },
  labelActive: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  labelInactive: {
    fontFamily: fonts.medium,
    color: colors.muted,
  },
});
