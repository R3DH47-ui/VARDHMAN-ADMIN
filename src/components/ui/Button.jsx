import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors, fonts, radii } from '@/theme';

export function Button({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'dark' | 'ghost' | 'danger'
  size = 'lg', // 'sm' | 'md' | 'lg'
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
  activeOpacity = 0.8,
  children,
}) {
  const containerStyles = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.textBase,
    styles[`text_${size}`],
    styles[`textVariant_${variant}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  const spinnerColor = variant === 'primary' || variant === 'dark' ? '#FFFFFF' : colors.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={activeOpacity}
      style={containerStyles}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : children ? (
        children
      ) : (
        <View style={styles.contentRow}>
          {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
          <Text style={textStyles}>{title}</Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
  size_sm: {
    height: 32,
    paddingHorizontal: 12,
  },
  size_md: {
    height: 40,
    paddingHorizontal: 16,
  },
  size_lg: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: radii.lg,
  },
  variant_primary: {
    backgroundColor: colors.primary,
  },
  variant_secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  variant_dark: {
    backgroundColor: colors.ink,
  },
  variant_ghost: {
    backgroundColor: 'transparent',
  },
  variant_danger: {
    backgroundColor: colors.error,
  },
  disabled: {
    opacity: 0.5,
  },
  textBase: {
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },
  text_sm: {
    fontSize: 12,
    lineHeight: 16,
  },
  text_md: {
    fontSize: 13,
    lineHeight: 18,
  },
  text_lg: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.bold,
  },
  textVariant_primary: {
    color: '#FFFFFF',
  },
  textVariant_secondary: {
    color: colors.ink,
  },
  textVariant_outline: {
    color: colors.ink,
  },
  textVariant_dark: {
    color: '#FFFFFF',
  },
  textVariant_ghost: {
    color: colors.ink,
  },
  textVariant_danger: {
    color: '#FFFFFF',
  },
  textDisabled: {
    opacity: 0.8,
  },
});
