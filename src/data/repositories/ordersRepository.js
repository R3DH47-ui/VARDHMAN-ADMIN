/**
 * Orders Repository — stable interface.
 * Delegates to mock or remote based on EXPO_PUBLIC_USE_MOCK_DATA.
 */

import { USE_MOCK_DATA } from '../config';
import { ordersRepository as mockRepo } from '../ordersRepository';
import { get } from '../../services/api/client';
import { ENDPOINTS } from '../../services/api/endpoints';
import { mapOrderFromApi, mapLowStockFromApi, mapDashboardSummaryFromApi } from '../mappers/orderMapper';

const remoteRepo = {
  async listRecent(params) {
    const data = await get(ENDPOINTS.ORDERS_RECENT, params);
    return (data?.items || data || []).map(mapOrderFromApi);
  },

  async listLowStock(params) {
    const data = await get(ENDPOINTS.ORDERS_LOW_STOCK, params);
    return (data?.items || data || []).map(mapLowStockFromApi);
  },

  async getDashboardSummary() {
    const data = await get(ENDPOINTS.DASHBOARD_SUMMARY);
    return mapDashboardSummaryFromApi(data);
  },
};

export const ordersRepository = USE_MOCK_DATA ? mockRepo : remoteRepo;
