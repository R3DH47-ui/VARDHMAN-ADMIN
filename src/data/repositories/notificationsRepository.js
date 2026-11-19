/**
 * Notifications Repository — stable interface.
 * Delegates to mock or remote based on EXPO_PUBLIC_USE_MOCK_DATA.
 */

import { USE_MOCK_DATA } from '../config';
import { notificationsRepository as mockRepo } from '../notificationsRepository';
import { get, post } from '../../services/api/client';
import { ENDPOINTS } from '../../services/api/endpoints';
import { mapNotificationFromApi } from '../mappers/notificationMapper';

const remoteRepo = {
  async list(params) {
    const data = await get(ENDPOINTS.NOTIFICATIONS_LIST, params);
    return (data?.items || data || []).map(mapNotificationFromApi);
  },

  async markRead(id) {
    await post(ENDPOINTS.NOTIFICATIONS_MARK_READ(id));
    return true;
  },

  async markAllRead() {
    await post(ENDPOINTS.NOTIFICATIONS_MARK_ALL_READ);
    return true;
  },
};

export const notificationsRepository = USE_MOCK_DATA ? mockRepo : remoteRepo;
