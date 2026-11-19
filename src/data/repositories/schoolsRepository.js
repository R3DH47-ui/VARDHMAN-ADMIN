/**
 * Schools Repository — stable interface.
 * Delegates to mock or remote based on EXPO_PUBLIC_USE_MOCK_DATA.
 */

import { USE_MOCK_DATA } from '../config';
import { schoolsRepository as mockRepo } from '../schoolsRepository';
import { get, post, put, del } from '../../services/api/client';
import { ENDPOINTS } from '../../services/api/endpoints';
import { mapSchoolFromApi, mapSchoolToApi } from '../mappers/schoolMapper';

const remoteRepo = {
  async list(params) {
    const data = await get(ENDPOINTS.SCHOOLS_LIST, params);
    return (data?.items || data || []).map(mapSchoolFromApi);
  },

  async get(id) {
    const data = await get(ENDPOINTS.SCHOOLS_BY_ID(id));
    return mapSchoolFromApi(data);
  },

  async getById(id) {
    return this.get(id);
  },

  async create(payload) {
    const data = await post(ENDPOINTS.SCHOOLS_CREATE, mapSchoolToApi(payload));
    return mapSchoolFromApi(data);
  },

  async update(id, payload) {
    const data = await put(ENDPOINTS.SCHOOLS_UPDATE(id), mapSchoolToApi(payload));
    return mapSchoolFromApi(data);
  },

  async delete(id) {
    await del(ENDPOINTS.SCHOOLS_DELETE(id));
    return true;
  },

  async remove(id) {
    return this.delete(id);
  },
};

const enhancedMockRepo = {
  ...mockRepo,
  getById: (id) => mockRepo.get(id),
  remove: (id) => mockRepo.delete(id),
};

export const schoolsRepository = USE_MOCK_DATA ? enhancedMockRepo : remoteRepo;
