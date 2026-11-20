import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, radii } from '@/theme';
import { Icon } from '@/components/ui';

function getFallbackIcon(name, category) {
  const text = `${name || ''} ${category || ''}`.toLowerCase();
  if (text.includes('shirt') || text.includes('t-shirt') || text.includes('polo') || text.includes('top') || text.includes('blazer') || text.includes('sweater') || text.includes('pinafore')) {
    return 'checkroom';
  }
  return 'shopping-bag';
}

export function ProductThumb({ uri, name, category, size = 52, style }) {
  const [hasError, setHasError] = useState(false);

  const imageSource = typeof uri === 'string' ? { uri } : uri;

  if (uri && !hasError) {
    return (
      <Image
        source={imageSource}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: radii.md },
          style,
        ]}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
        onError={() => setHasError(true)}
      />
    );
  }

  const iconName = getFallbackIcon(name, category);

  return (
    <View
      style={[
        styles.fallback,
        { width: size, height: size, borderRadius: radii.md },
        style,
      ]}
    >
      <Icon name={iconName} size={size * 0.48} color={colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#F3F0EC',
    borderWidth: 1,
    borderColor: '#E8E3DE',
  },
  fallback: {
    backgroundColor: '#F3F0EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
