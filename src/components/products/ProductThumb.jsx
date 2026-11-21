import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors, radii } from '@/theme';
import { Icon } from '@/components/ui';

function getFallbackIcon(name, category) {
  const text = `${name || ''} ${category || ''}`.toLowerCase();
  if (
    text.includes('shirt') ||
    text.includes('t-shirt') ||
    text.includes('polo') ||
    text.includes('top') ||
    text.includes('blazer') ||
    text.includes('sweater') ||
    text.includes('pinafore')
  ) {
    return 'checkroom';
  }
  return 'shopping-bag';
}

export function ProductThumb({ uri, name, category, size = 52, style }) {
  const [hasError, setHasError] = useState(false);

  // Accepts both local require() (number/object) and remote string URL ("https://...")
  let imageSource = null;
  if (uri) {
    if (typeof uri === 'string') {
      const cleanUri = uri.trim();
      if (cleanUri.length > 0) {
        imageSource = { uri: cleanUri };
      }
    } else {
      imageSource = uri;
    }
  }

  if (imageSource && !hasError) {
    return (
      <View
        style={[
          styles.container,
          { width: size, height: size, borderRadius: radii.md },
          style,
        ]}
      >
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
          onError={() => setHasError(true)}
        />
      </View>
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
  container: {
    backgroundColor: '#F3F0EC',
    borderWidth: 1,
    borderColor: '#E8E3DE',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    backgroundColor: '#F3F0EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E3DE',
  },
});
