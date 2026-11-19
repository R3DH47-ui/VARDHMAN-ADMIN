import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/theme';

export function SegmentedControl({
  options = [],
  value,
  onChange,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        const itemVal = typeof option === 'object' ? option.value : option;
        const itemLabel = typeof option === 'object' ? option.label : option;
        const isSelected = itemVal === value;

        return (
          <TouchableOpacity
            key={itemVal}
            onPress={() => onChange(itemVal)}
            activeOpacity={0.7}
            style={[
              styles.segment,
              isSelected && styles.segmentSelected,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                isSelected ? styles.segmentTextSelected : styles.segmentTextUnselected,
              ]}
            >
              {itemLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F0EC',
    borderRadius: radii.md,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
  },
  segmentSelected: {
    backgroundColor: colors.ink,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontFamily: fonts.medium,
  },
  segmentTextSelected: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
  },
  segmentTextUnselected: {
    color: colors.secondary,
  },
});
