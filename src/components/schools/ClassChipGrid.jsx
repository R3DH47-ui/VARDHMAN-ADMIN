import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/theme';
import { ALL_CLASSES, CLASS_PRESETS } from '@/utils/classes';

export function ClassChipGrid({
  selectedClasses = [],
  onChangeClasses,
  showPresets = true,
  availableClasses = ALL_CLASSES, // If scoped to a specific school's classes
}) {
  const isSelected = (cls) => selectedClasses.includes(cls);

  const toggleClass = (cls) => {
    if (isSelected(cls)) {
      onChangeClasses(selectedClasses.filter((c) => c !== cls));
    } else {
      // Keep order consistent with availableClasses
      const updated = availableClasses.filter(
        (c) => selectedClasses.includes(c) || c === cls
      );
      onChangeClasses(updated);
    }
  };

  const applyPreset = (presetClasses) => {
    // Only select classes that exist in availableClasses
    const valid = presetClasses.filter((c) => availableClasses.includes(c));
    onChangeClasses(valid);
  };

  const selectAll = () => {
    onChangeClasses([...availableClasses]);
  };

  const clearAll = () => {
    onChangeClasses([]);
  };

  return (
    <View style={styles.container}>
      {/* Presets Row */}
      {showPresets && (
        <View style={styles.presetsContainer}>
          <View style={styles.presetChipsRow}>
            {CLASS_PRESETS.map((preset) => {
              const isMatch =
                preset.classes.length === selectedClasses.length &&
                preset.classes.every((c) => selectedClasses.includes(c));

              return (
                <TouchableOpacity
                  key={preset.id}
                  onPress={() => applyPreset(preset.classes)}
                  style={[
                    styles.presetChip,
                    isMatch && styles.presetChipActive,
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.presetChipText,
                      isMatch && styles.presetChipTextActive,
                    ]}
                  >
                    {preset.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* Grid of Class Chips */}
      <View style={styles.grid}>
        {availableClasses.map((cls) => {
          const active = isSelected(cls);
          return (
            <TouchableOpacity
              key={cls}
              onPress={() => toggleClass(cls)}
              activeOpacity={0.7}
              style={[
                styles.classChip,
                active ? styles.classChipActive : styles.classChipInactive,
              ]}
            >
              <Text
                style={[
                  styles.classText,
                  active ? styles.classTextActive : styles.classTextInactive,
                ]}
              >
                {cls}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Summary Footer */}
      <View style={styles.footerRow}>
        <Text style={styles.summaryText}>
          {selectedClasses.length}{' '}
          {selectedClasses.length === 1 ? 'class' : 'classes'} selected
        </Text>
        <View style={styles.quickActions}>
          <TouchableOpacity onPress={selectAll} style={styles.actionBtn}>
            <Text style={styles.actionText}>Select all</Text>
          </TouchableOpacity>
          <Text style={styles.dot}>•</Text>
          <TouchableOpacity onPress={clearAll} style={styles.actionBtn}>
            <Text style={[styles.actionText, { color: colors.error }]}>Clear all</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  presetsContainer: {
    marginBottom: 10,
  },
  presetChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  presetChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FAF8F5',
  },
  presetChipActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  presetChipText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.secondary,
  },
  presetChipTextActive: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  classChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.md,
    borderWidth: 1,
    minWidth: '22%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  classChipActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  classChipInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  classText: {
    fontSize: 12,
    fontFamily: fonts.medium,
  },
  classTextActive: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
  },
  classTextInactive: {
    color: colors.ink,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  summaryText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
  },
  quickActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionBtn: {
    paddingVertical: 2,
  },
  actionText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.primary,
  },
  dot: {
    color: colors.muted,
    fontSize: 10,
  },
});
