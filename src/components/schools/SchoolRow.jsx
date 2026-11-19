import React, { useRef } from 'react';
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/theme';
import { Icon } from '@/components/ui';

export function SchoolRow({ school, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View style={[styles.cardOuter, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={{ color: 'rgba(176, 0, 15, 0.08)', borderless: false }}
      >
        <View style={styles.iconCircle}>
          <Icon name="school" size={20} color={colors.primary} />
        </View>

        <View style={styles.centerCol}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {school.name}
            </Text>
            {school.affiliationBoard && (
              <View style={styles.boardBadge}>
                <Text style={styles.boardBadgeText}>
                  {school.affiliationBoard.split(' ')[0]}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.classRange}>
            {school.classRangeDisplay || school.classRange || (school.classes?.length ? `${school.classes[0]} to ${school.classes[school.classes.length - 1]}` : '')}
          </Text>

          {school.address && (
            <Text style={styles.address} numberOfLines={1}>
              {school.address}
            </Text>
          )}

          <View style={styles.metaRow}>
            <Text style={styles.productCount}>
              {school.productCount || 0} products mapped
            </Text>
          </View>
        </View>

        <Icon name="chevron-right" size={20} color={colors.muted} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    marginHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    backgroundColor: '#FBF7F4',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.blush,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  centerCol: {
    flex: 1,
    marginRight: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.ink,
    flexShrink: 1,
  },
  boardBadge: {
    backgroundColor: '#F3F0EC',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  boardBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.secondary,
  },
  classRange: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.primary,
    marginBottom: 2,
  },
  address: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productCount: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.secondary,
  },
});
