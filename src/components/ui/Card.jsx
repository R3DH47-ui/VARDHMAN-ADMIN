import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '@/theme';

export function Card({
  children,
  style,
  onPress,
  padding = spacing.lg,
  activeOpacity = 0.7,
  ...props
}) {
  const cardStyle = [
    styles.card,
    { padding },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={activeOpacity}
        style={cardStyle}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
});
