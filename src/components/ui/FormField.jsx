import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts, radii } from '@/theme';

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helper,
  required = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  prefix,
  suffix,
  rightIcon,
  onRightIconPress,
  editable = true,
  onPress,
  style,
  inputStyle,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const containerBorderColor = error
    ? colors.error
    : isFocused
    ? colors.ink
    : colors.border;

  const content = (
    <View
      style={[
        styles.inputWrapper,
        { borderColor: containerBorderColor },
        multiline && { height: numberOfLines * 24 + 24, alignItems: 'flex-start' },
        !editable && styles.disabledWrapper,
        inputStyle,
      ]}
    >
      {prefix && <View style={styles.prefixContainer}>{prefix}</View>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        editable={editable && !onPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          multiline && styles.multilineInput,
          !editable && styles.disabledInput,
        ]}
        {...props}
      />
      {suffix && <View style={styles.suffixContainer}>{suffix}</View>}
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightIconPress || onPress}
          disabled={!onRightIconPress && !onPress}
          style={styles.iconContainer}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={[styles.fieldContainer, style]}>
      {label && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      {onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          {content}
        </TouchableOpacity>
      ) : (
        content
      )}

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helper ? (
        <Text style={styles.helperText}>{helper}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  labelRow: {
    marginBottom: 6,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  required: {
    color: colors.primary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  disabledWrapper: {
    backgroundColor: '#F8F7F5',
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.ink,
    paddingVertical: 10,
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  disabledInput: {
    color: colors.ink,
  },
  prefixContainer: {
    marginRight: 6,
  },
  suffixContainer: {
    marginLeft: 6,
  },
  iconContainer: {
    marginLeft: 6,
    padding: 4,
  },
  helperText: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },
  errorText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.error,
    marginTop: 4,
  },
});
