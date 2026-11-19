import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, radii } from '@/theme';
import { Icon } from '@/components/ui';

export function ProductThumb({ uri, name, size = 48, style }) {
  const [hasError, setHasError] = useState(false);

  if (uri && !hasError) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: radii.md },
          style,
        ]}
        contentFit="cover"
        transition={200}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        { width: size, height: size, borderRadius: radii.md },
        style,
      ]}
    >
      <Icon name="inventory" size={size * 0.45} color={colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#F3F0EC',
  },
  fallback: {
    backgroundColor: '#F3F0EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
