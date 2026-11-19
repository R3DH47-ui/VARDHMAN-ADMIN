import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, fonts } from '@/theme';
import { Card, Icon, Button } from '@/components/ui';

export function LowStockCard({ items = [], onRestock, onReportPress }) {
  const handleRestock = (item) => {
    if (onRestock) {
      onRestock(item);
    } else {
      Alert.alert(
        'Restock Alert',
        `Restock request initiated for ${item.title} (${item.sizeInfo}) at ${item.school}.`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <Card style={styles.card} padding={0}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.alertIconWrapper}>
            <Icon name="warning" size={14} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Low Stock Attention</Text>
        </View>

        {onReportPress && (
          <TouchableOpacity onPress={onReportPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.reportText}>Full report ›</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <View
              key={item.id || `${item.title}-${index}`}
              style={[styles.itemRow, !isLast && styles.borderBottom]}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title || item.name}</Text>
                <Text style={styles.itemMeta}>
                  {item.school} • {item.sizeInfo || item.size}
                </Text>
                <Text style={styles.stockAlertText}>
                  {item.unitsLeftText || (item.unitsLeft !== undefined ? `Only ${item.unitsLeft} units left` : 'Low stock')}
                </Text>
              </View>

              <Button
                title="RESTOCK"
                onPress={() => handleRestock(item)}
                variant="dark"
                size="sm"
                style={styles.restockBtn}
                textStyle={styles.restockBtnText}
              />
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertIconWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.ink,
  },
  reportText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.primary,
  },
  list: {
    paddingHorizontal: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F0EC',
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.ink,
    marginBottom: 2,
  },
  itemMeta: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.secondary,
    marginBottom: 2,
  },
  stockAlertText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.error,
  },
  restockBtn: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  restockBtnText: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
});
