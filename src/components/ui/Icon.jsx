import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/theme';

// Normalize icon names (support both snake_case and kebab-case)
const ICON_MAP = {
  'inventory_2': 'inventory',
  'inventory-2': 'inventory',
  'dashboard': 'dashboard',
  'school': 'school',
  'notifications': 'notifications',
  'notifications-none': 'notifications-none',
  'search': 'search',
  'add': 'add',
  'delete': 'delete',
  'warning': 'warning',
  'warning-amber': 'warning',
  'shopping-bag': 'shopping-bag',
  'shopping_bag': 'shopping-bag',
  'local-shipping': 'local-shipping',
  'local_shipping': 'local-shipping',
  'arrow-back': 'arrow-back',
  'arrow_back': 'arrow-back',
  'close': 'close',
  'tune': 'tune',
  'filter-list': 'filter-list',
  'check': 'check',
  'check-circle': 'check-circle',
  'photo-camera': 'photo-camera',
  'photo_camera': 'photo-camera',
  'add-photo-alternate': 'add-photo-alternate',
  'edit': 'edit',
  'chevron-right': 'chevron-right',
  'chevron_right': 'chevron-right',
  'expand-more': 'expand-more',
  'expand_more': 'expand-more',
  'swap-horiz': 'swap-horiz',
  'swap_horiz': 'swap-horiz',
  'cached': 'cached',
  'fiber-manual-record': 'fiber-manual-record',
  'fiber_manual_record': 'fiber-manual-record',
  'more-vert': 'more-vert',
  'more_vert': 'more-vert',
  'location-on': 'location-on',
  'location_on': 'location-on',
  'mail': 'mail',
  'phone': 'phone',
  'share': 'share',
  'info': 'info',
  'help-outline': 'help-outline',
  'trending-up': 'trending-up',
  'upload': 'cloud-upload',
  'cloud-upload': 'cloud-upload',
  'refresh': 'refresh',
  'done-all': 'done-all',
  'visibility': 'visibility',
  'visibility-off': 'visibility-off',
};

export function Icon({ name, size = 20, color = colors.ink, style }) {
  const normalizedName = ICON_MAP[name] || name.replace(/_/g, '-');
  return <MaterialIcons name={normalizedName} size={size} color={color} style={style} />;
}
