/**
 * Products Repository — stable interface.
 * Delegates to mock or remote based on EXPO_PUBLIC_USE_MOCK_DATA.
 */

import { USE_MOCK_DATA } from '../config';
import { productsRepository as mockRepo } from '../productsRepository';
import { get, post, put, del } from '../../services/api/client';
import { ENDPOINTS } from '../../services/api/endpoints';
import { mapProductFromApi, mapProductToApi } from '../mappers/productMapper';

const remoteRepo = {
  async list(params) {
    const data = await get(ENDPOINTS.PRODUCTS_LIST, params);
    return (data?.items || data || []).map(mapProductFromApi);
  },

  async get(id) {
    const data = await get(ENDPOINTS.PRODUCTS_BY_ID(id));
    return mapProductFromApi(data);
  },

  async getById(id) {
    return this.get(id);
  },

  async create(payload) {
    const data = await post(ENDPOINTS.PRODUCTS_CREATE, mapProductToApi(payload));
    return mapProductFromApi(data);
  },

  async update(id, payload) {
    const data = await put(ENDPOINTS.PRODUCTS_UPDATE(id), mapProductToApi(payload));
    return mapProductFromApi(data);
  },

  async delete(id) {
    await del(ENDPOINTS.PRODUCTS_DELETE(id));
    return true;
  },

  async remove(id) {
    return this.delete(id);
  },

  async publish(id) {
    return this.update(id, { draft: false });
  },

  async restock(id, amount) {
    return this.update(id, { stock: amount });
  },
};

// Enhance mockRepo with aliases so both match the exact same stable interface
const enhancedMockRepo = {
  ...mockRepo,
  getById: (id) => mockRepo.get(id),
  remove: (id) => mockRepo.delete(id),
  publish: (id) => mockRepo.update(id, { draft: false }),
  restock: (id, amount) => mockRepo.update(id, { stock: amount }),
};

export const productsRepository = USE_MOCK_DATA ? enhancedMockRepo : remoteRepo;
