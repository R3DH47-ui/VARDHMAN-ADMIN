import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/theme';
import { Icon } from './Icon';

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <Icon name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      {value && value.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            onChangeText('');
            if (onClear) onClear();
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.clearBtn}
        >
          <Icon name="close" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.ink,
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
  },
});
