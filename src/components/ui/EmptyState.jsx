import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';
import { Icon } from './Icon';
import { Button } from './Button';

export function EmptyState({
  icon = 'inventory',
  title = 'No items found',
  subtitle = 'Try adjusting your search or filters.',
  actionTitle,
  onAction,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Icon name={icon} size={32} color={colors.muted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          onPress={onAction}
          variant="outline"
          size="sm"
          style={styles.actionButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F0EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  actionButton: {
    marginTop: 8,
  },
});
