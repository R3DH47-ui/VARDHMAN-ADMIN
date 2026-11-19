import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layout } from '@/theme';
import { Button } from '@/components/ui';

export function StickyActionBar({
  leftTitle = 'CANCEL',
  onLeftPress,
  rightTitle = 'SAVE',
  onRightPress,
  rightLoading = false,
  rightDisabled = false,
  style,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 12) },
        style,
      ]}
    >
      <View style={styles.actionsRow}>
        {leftTitle && onLeftPress && (
          <Button
            title={leftTitle}
            onPress={onLeftPress}
            variant="outline"
            size="lg"
            style={styles.leftButton}
          />
        )}
        <Button
          title={rightTitle}
          onPress={onRightPress}
          variant="primary"
          size="lg"
          loading={rightLoading}
          disabled={rightDisabled}
          style={styles.rightButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  leftButton: {
    flex: 1,
    height: layout.buttonHeight,
  },
  rightButton: {
    flex: 1.5,
    height: layout.buttonHeight,
  },
});
