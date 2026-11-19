/**
 * Order & Dashboard DTO Mapper.
 * Converts between backend API shape and UI model.
 */

import { ORDER_STATUS } from '../../constants';

export function mapOrderFromApi(dto) {
  if (!dto) return dto;
  const statusMap = { new: ORDER_STATUS.NEW, packed: ORDER_STATUS.PACKED, delivered: ORDER_STATUS.DELIVERED };
  const rawStatus = (dto.status || '').toLowerCase();
  return {
    id: dto.id ?? dto._id ?? '',
    school: dto.school ?? dto.schoolShort ?? '',
    schoolFull: dto.schoolFull ?? dto.school_full ?? dto.school ?? '',
    item: dto.item ?? dto.itemName ?? '',
    time: dto.time ?? dto.createdAt ?? '',
    amount: Number(dto.amount) || 0,
    status: statusMap[rawStatus] || dto.status || ORDER_STATUS.NEW,
  };
}

export function mapLowStockFromApi(dto) {
  if (!dto) return dto;
  return {
    id: dto.id ?? dto._id ?? '',
    name: dto.name ?? dto.productName ?? '',
    school: dto.school ?? '',
    size: dto.size ?? '',
    unitsLeft: Number(dto.unitsLeft ?? dto.units_left) || 0,
  };
}

export function mapDashboardSummaryFromApi(dto) {
  if (!dto) return dto;
  return {
    ordersToday: Number(dto.ordersToday ?? dto.orders_today) || 0,
    ordersDiff: dto.ordersDiff ?? dto.orders_diff ?? '',
    revenue: Number(dto.revenue) || 0,
    revenueDiff: dto.revenueDiff ?? dto.revenue_diff ?? '',
    activeSkus: Number(dto.activeSkus ?? dto.active_skus) || 0,
    schoolsCount: Number(dto.schoolsCount ?? dto.schools_count) || 0,
    lowStockCount: Number(dto.lowStockCount ?? dto.low_stock_count) || 0,
    targetPercent: Number(dto.targetPercent ?? dto.target_percent) || 0,
    actionItemsCount: Number(dto.actionItemsCount ?? dto.action_items_count) || 0,
  };
}
