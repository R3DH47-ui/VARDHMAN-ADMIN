/**
 * API Endpoints — placeholder paths for the backend developer.
 * When the backend is ready, update only this file with real paths.
 * No screen or component should ever reference these directly.
 */

export const ENDPOINTS = {
  // Products
  PRODUCTS_LIST: '/api/v1/products',
  PRODUCTS_BY_ID: (id) => `/api/v1/products/${id}`,
  PRODUCTS_CREATE: '/api/v1/products',
  PRODUCTS_UPDATE: (id) => `/api/v1/products/${id}`,
  PRODUCTS_DELETE: (id) => `/api/v1/products/${id}`,

  // Schools
  SCHOOLS_LIST: '/api/v1/schools',
  SCHOOLS_BY_ID: (id) => `/api/v1/schools/${id}`,
  SCHOOLS_CREATE: '/api/v1/schools',
  SCHOOLS_UPDATE: (id) => `/api/v1/schools/${id}`,
  SCHOOLS_DELETE: (id) => `/api/v1/schools/${id}`,

  // Orders
  ORDERS_RECENT: '/api/v1/orders/recent',
  ORDERS_LOW_STOCK: '/api/v1/inventory/low-stock',
  DASHBOARD_SUMMARY: '/api/v1/dashboard/summary',

  // Notifications
  NOTIFICATIONS_LIST: '/api/v1/notifications',
  NOTIFICATIONS_MARK_READ: (id) => `/api/v1/notifications/${id}/read`,
  NOTIFICATIONS_MARK_ALL_READ: '/api/v1/notifications/mark-all-read',
};
