import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';

export function Toggle({
  value,
  onValueChange,
  label,
  description,
  disabled = false,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {(label || description) && (
        <View style={styles.textContainer}>
          {label && <Text style={styles.label}>{label}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      )}
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: '#D9D4CE', true: colors.primary }}
        thumbColor={'#FFFFFF'}
        ios_backgroundColor="#D9D4CE"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.ink,
    lineHeight: 18,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
    lineHeight: 16,
    marginTop: 2,
  },
});
