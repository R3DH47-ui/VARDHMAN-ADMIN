import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '@/theme';
import { StatusBadge, Icon } from '@/components/ui';
import { ProductThumb } from './ProductThumb';
import { formatINR } from '@/utils/format';

export function ProductRow({ product, onPress }) {
  const totalStock = product.totalStock ?? product.sizes?.reduce((sum, s) => sum + (Number(s.stock) || 0), 0) ?? 0;
  const isOutOfStock = totalStock === 0;
  const isLowStock = totalStock > 0 && totalStock <= 10;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ProductThumb
        uri={product.image || product.photos?.[0]}
        name={product.name}
        size={52}
        style={styles.thumb}
      />

      <View style={styles.centerCol}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.schoolMeta} numberOfLines={1}>
          {product.schoolName || product.school}
          {product.classesSummary ? ` • ${product.classesSummary}` : product.classes ? ` • ${product.classes}` : ''}
        </Text>
        <View style={styles.priceStockRow}>
          <Text style={styles.price}>{formatINR(product.sellingPrice || product.price)}</Text>
          <Text style={styles.dot}>•</Text>
          <Text
            style={[
              styles.stockText,
              isOutOfStock && styles.stockOut,
              isLowStock && styles.stockLow,
            ]}
          >
            {isOutOfStock
              ? 'Out of stock'
              : `${totalStock} in stock`}
          </Text>
        </View>
      </View>

      <View style={styles.rightCol}>
        <StatusBadge status={product.status || (isOutOfStock ? 'OUT_OF_STOCK' : isLowStock ? 'LOW_STOCK' : 'PUBLISHED')} />
        <View style={styles.viewRow}>
          <Text style={styles.viewText}>View</Text>
          <Icon name="chevron-right" size={16} color={colors.muted} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F0EC',
  },
  thumb: {
    marginRight: 12,
  },
  centerCol: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.ink,
    marginBottom: 2,
  },
  schoolMeta: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
    marginBottom: 3,
  },
  priceStockRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.ink,
  },
  dot: {
    marginHorizontal: 4,
    color: colors.muted,
    fontSize: 10,
  },
  stockText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.secondary,
  },
  stockLow: {
    color: colors.warningText,
  },
  stockOut: {
    color: colors.error,
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  viewText: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
    marginRight: 1,
  },
});
