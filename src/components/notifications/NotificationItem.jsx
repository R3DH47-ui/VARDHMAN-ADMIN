import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/theme';
import { Icon } from '@/components/ui';

export function NotificationItem({ notification, onPress }) {
  if (!notification) return null;

  const isUnread = notification.read === false || notification.status === 'unread';

  const getTileConfig = (type) => {
    const norm = (type || '').toUpperCase();
    if (norm.includes('ORDER')) {
      return {
        icon: 'shopping-bag',
        iconColor: '#1E40AF',
        tileBg: '#EFF6FF',
      };
    }
    if (norm.includes('STOCK')) {
      return {
        icon: 'warning',
        iconColor: colors.warningText,
        tileBg: colors.warningBg,
      };
    }
    if (norm.includes('DELIVER')) {
      return {
        icon: 'local-shipping',
        iconColor: colors.success,
        tileBg: colors.successBg,
      };
    }
    if (norm.includes('SCHOOL')) {
      return {
        icon: 'school',
        iconColor: colors.primary,
        tileBg: colors.blush,
      };
    }
    if (norm.includes('PUBLISH') || norm.includes('ITEM') || norm.includes('SYSTEM')) {
      return {
        icon: 'inventory',
        iconColor: colors.ink,
        tileBg: '#F3F0EC',
      };
    }
    if (norm.includes('RETURN')) {
      return {
        icon: 'swap-horiz',
        iconColor: colors.warningText,
        tileBg: colors.amberTile,
      };
    }
    return {
      icon: 'notifications',
      iconColor: colors.secondary,
      tileBg: '#F3F0EC',
    };
  };

  const tile = getTileConfig(notification.type || notification.category);
  const timeDisplay = notification.timestamp || notification.time || '';
  const descDisplay = notification.description || notification.body || '';
  const tagsList = notification.tags || [notification.tag1, notification.tag2].filter(Boolean);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isUnread ? styles.containerUnread : styles.containerRead,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Unread indicator dot */}
      {isUnread && <View style={styles.unreadDot} />}

      {/* Icon tile */}
      <View style={[styles.iconTile, { backgroundColor: tile.tileBg }]}>
        <Icon name={tile.icon} size={18} color={tile.iconColor} />
      </View>

      {/* Content */}
      <View style={styles.contentCol}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>
            {notification.title}
          </Text>
          <Text style={styles.timestamp}>{timeDisplay}</Text>
        </View>

        {descDisplay ? <Text style={styles.description}>{descDisplay}</Text> : null}

        {/* Tags Row */}
        {tagsList && tagsList.length > 0 && (
          <View style={styles.tagsRow}>
            {tagsList.map((tag, idx) => (
              <View key={`tag-${idx}`} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F0EC',
  },
  containerRead: {
    backgroundColor: colors.surface,
  },
  containerUnread: {
    backgroundColor: colors.unreadTint,
    borderBottomColor: colors.unreadBorder,
  },
  unreadDot: {
    position: 'absolute',
    left: 6,
    top: 22,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  iconTile: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentCol: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.ink,
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: '#9CA3AF',
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.secondary,
    lineHeight: 16,
    marginBottom: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    backgroundColor: '#F3F0EC',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  tagText: {
    fontFamily: fonts.medium,
    fontSize: 10,
    color: colors.secondary,
  },
});
