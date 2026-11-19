import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, fonts, radii } from '@/theme';

export function Chip({
  label,
  selected = false,
  onPress,
  count,
  icon,
  size = 'md', // 'sm' | 'md'
  variant = 'dark', // 'dark' | 'primary'
  style,
  textStyle,
}) {
  const isDark = variant === 'dark';
  const activeBg = isDark ? colors.ink : colors.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        size === 'sm' ? styles.chipSm : styles.chipMd,
        selected
          ? { backgroundColor: activeBg, borderColor: activeBg }
          : styles.chipInactive,
        style,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text
        style={[
          styles.text,
          size === 'sm' ? styles.textSm : styles.textMd,
          selected ? styles.textActive : styles.textInactive,
          textStyle,
        ]}
      >
        {label}
        {count !== undefined && count !== null ? ` (${count})` : ''}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: radii.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  chipSm: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 28,
  },
  chipMd: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    minHeight: 34,
  },
  chipInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  iconContainer: {
    marginRight: 5,
  },
  text: {
    fontFamily: fonts.medium,
  },
  textSm: {
    fontSize: 11,
    lineHeight: 14,
  },
  textMd: {
    fontSize: 12,
    lineHeight: 16,
  },
  textActive: {
    color: '#FFFFFF',
    fontFamily: fonts.semiBold,
  },
  textInactive: {
    color: colors.secondary,
  },
});
