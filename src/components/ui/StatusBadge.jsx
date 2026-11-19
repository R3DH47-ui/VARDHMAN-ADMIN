import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/theme';

export function StatusBadge({ status, label, style, textStyle }) {
  const normStatus = (status || label || '').toLowerCase().replace(/[\s-]/g, '_');

  let bg = colors.surface;
  let text = colors.ink;
  let border = colors.border;
  let displayText = label || status;

  switch (normStatus) {
    case 'new':
      bg = colors.blush;
      text = colors.primary;
      border = colors.blushBorder;
      displayText = displayText || 'NEW';
      break;
    case 'packed':
      bg = colors.amberTile;
      text = colors.warningText;
      border = '#FDE68A';
      displayText = displayText || 'PACKED';
      break;
    case 'delivered':
      bg = colors.successBg;
      text = colors.success;
      border = colors.successBorder;
      displayText = displayText || 'DELIVERED';
      break;
    case 'published':
      bg = colors.successBg;
      text = colors.success;
      border = colors.successBorder;
      displayText = displayText || 'Published';
      break;
    case 'low_stock':
      bg = colors.warningBg;
      text = colors.warningText;
      border = colors.warningTagBorder;
      displayText = displayText || 'Low Stock';
      break;
    case 'out_of_stock':
      bg = colors.blush;
      text = colors.error;
      border = colors.blushBorder;
      displayText = displayText || 'Out of Stock';
      break;
    case 'draft':
      bg = colors.draftBg;
      text = colors.muted;
      border = colors.border;
      displayText = displayText || 'Draft';
      break;
    default:
      break;
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg, borderColor: border }, style]}>
      <Text style={[styles.text, { color: text }, textStyle]}>
        {displayText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.sm,
    borderWidth: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
