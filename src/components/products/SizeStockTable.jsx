import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/theme';
import { Icon } from '@/components/ui';

export function SizeStockTable({ sizes = [], onChangeSizes }) {
  const handleUpdate = (index, field, value) => {
    const updated = [...sizes];
    updated[index] = { ...updated[index], [field]: value };
    onChangeSizes(updated);
  };

  const handleRemove = (index) => {
    if (sizes.length <= 1) return; // Keep at least one
    const updated = sizes.filter((_, i) => i !== index);
    onChangeSizes(updated);
  };

  const handleAddSize = () => {
    // Guess next size increment
    const lastSize = sizes[sizes.length - 1]?.size;
    let nextSize = '30';
    if (lastSize && !isNaN(Number(lastSize))) {
      nextSize = String(Number(lastSize) + 2);
    }
    onChangeSizes([...sizes, { size: nextSize, stock: '10' }]);
  };

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.sizeCol]}>Size</Text>
        <Text style={[styles.headerCell, styles.stockCol]}>Stock Qty</Text>
        <Text style={[styles.headerCell, styles.actionCol]}>Action</Text>
      </View>

      {/* Rows */}
      {sizes.map((item, index) => {
        const stockNum = Number(item.stock);
        const isLow = item.stock !== '' && !isNaN(stockNum) && stockNum > 0 && stockNum <= 3;
        const isOut = item.stock !== '' && !isNaN(stockNum) && stockNum === 0;

        return (
          <View key={`size-row-${index}`} style={styles.row}>
            {/* Size Cell */}
            <View style={[styles.cell, styles.sizeCol]}>
              <TextInput
                value={item.size}
                onChangeText={(val) => handleUpdate(index, 'size', val)}
                placeholder="24"
                style={styles.cellInput}
              />
            </View>

            {/* Stock Cell */}
            <View style={[styles.cell, styles.stockCol]}>
              <View style={styles.stockInputRow}>
                <TextInput
                  value={String(item.stock ?? '')}
                  onChangeText={(val) => handleUpdate(index, 'stock', val)}
                  keyboardType="number-pad"
                  placeholder="0"
                  style={[styles.cellInput, styles.stockInput]}
                />
                {isLow && (
                  <View style={styles.lowStockBadge}>
                    <Text style={styles.lowStockBadgeText}>Low Stock</Text>
                  </View>
                )}
                {isOut && (
                  <View style={styles.outStockBadge}>
                    <Text style={styles.outStockBadgeText}>Out of stock</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Action Cell */}
            <View style={[styles.cell, styles.actionCol]}>
              <TouchableOpacity
                onPress={() => handleRemove(index)}
                disabled={sizes.length <= 1}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={[styles.deleteBtn, sizes.length <= 1 && styles.disabledBtn]}
              >
                <Icon
                  name="delete"
                  size={18}
                  color={sizes.length <= 1 ? '#D1D5DB' : colors.muted}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      {/* Add Size Button */}
      <TouchableOpacity
        onPress={handleAddSize}
        style={styles.addSizeBtn}
        activeOpacity={0.7}
      >
        <Icon name="add" size={16} color={colors.primary} />
        <Text style={styles.addSizeText}>Add size</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF8F5',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F0EC',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerCell: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sizeCol: {
    width: '30%',
  },
  stockCol: {
    flex: 1,
  },
  actionCol: {
    width: 50,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F0EC',
    backgroundColor: colors.surface,
  },
  cell: {
    justifyContent: 'center',
  },
  cellInput: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingHorizontal: 8,
    paddingVertical: 5,
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.ink,
    minHeight: 34,
  },
  stockInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stockInput: {
    width: 60,
  },
  lowStockBadge: {
    backgroundColor: colors.warningBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  lowStockBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.warningText,
  },
  outStockBadge: {
    backgroundColor: colors.blush,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  outStockBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.error,
  },
  deleteBtn: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledBtn: {
    opacity: 0.4,
  },
  addSizeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 4,
    backgroundColor: colors.surface,
  },
  addSizeText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.primary,
  },
});
