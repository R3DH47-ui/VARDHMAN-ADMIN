import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { productsRepository } from '../data/repositories/productsRepository';
import { schoolsRepository } from '../data/repositories/schoolsRepository';
import { notificationsRepository } from '../data/repositories/notificationsRepository';
import { ordersRepository } from '../data/repositories/ordersRepository';

const DRAFT_PRODUCT_KEY = '@vardhman_draft_product';
const DRAFT_SCHOOL_KEY = '@vardhman_draft_school';

export const useAppStore = create((set, get) => ({
  // Data state
  products: [],
  schools: [],
  notifications: [],
  recentOrders: [],
  lowStockItems: [],
  dashboardSummary: null,
  loading: false,

  // Read notifications tracking
  readNotificationIds: [],

  // Init data
  async initData() {
    set({ loading: true });
    try {
      const [products, schools, notifications, recentOrders, lowStockItems, summary] =
        await Promise.all([
          productsRepository.list(),
          schoolsRepository.list(),
          notificationsRepository.list(),
          ordersRepository.listRecent(),
          ordersRepository.listLowStock(),
          ordersRepository.getDashboardSummary(),
        ]);

      const initialReadIds = notifications
        .filter((n) => n.status === 'read' || n.read === true)
        .map((n) => n.id);

      set({
        products,
        schools,
        notifications,
        recentOrders,
        lowStockItems,
        dashboardSummary: summary,
        readNotificationIds: initialReadIds,
        loading: false,
      });
    } catch (err) {
      console.error('Failed to initialize app data:', err);
      set({ loading: false });
    }
  },

  // Alias for initData
  loadInitialData: async () => {
    return get().initData();
  },

  // Notification actions
  markAllNotificationsRead: async () => {
    const { notifications } = get();
    const allIds = notifications.map((n) => n.id);
    await notificationsRepository.markAllRead();
    set({
      readNotificationIds: allIds,
      notifications: notifications.map((n) => ({ ...n, status: 'read', read: true })),
    });
  },

  markAllNotificationsAsRead: async () => {
    return get().markAllNotificationsRead();
  },

  markNotificationRead: async (id) => {
    const { readNotificationIds, notifications } = get();
    if (!readNotificationIds.includes(id)) {
      await notificationsRepository.markRead(id);
      set({
        readNotificationIds: [...readNotificationIds, id],
        notifications: notifications.map((n) =>
          n.id === id ? { ...n, status: 'read', read: true } : n
        ),
      });
    }
  },

  markNotificationAsRead: async (id) => {
    return get().markNotificationRead(id);
  },

  getUnreadCount: () => {
    const { notifications, readNotificationIds } = get();
    return notifications.filter((n) => !readNotificationIds.includes(n.id) && n.status !== 'read' && n.read !== true).length;
  },

  // Product actions
  addProduct: async (data) => {
    const newProduct = await productsRepository.create(data);
    set((state) => ({ products: [newProduct, ...state.products] }));
    return newProduct;
  },

  updateProduct: async (id, data) => {
    const updated = await productsRepository.update(id, data);
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? updated : p)),
    }));
    return updated;
  },

  deleteProduct: async (id) => {
    await productsRepository.delete(id);
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  // School actions
  addSchool: async (data) => {
    const newSchool = await schoolsRepository.create(data);
    set((state) => ({ schools: [newSchool, ...state.schools] }));
    return newSchool;
  },

  updateSchool: async (id, data) => {
    const updated = await schoolsRepository.update(id, data);
    set((state) => ({
      schools: state.schools.map((s) => (s.id === id ? updated : s)),
    }));
    return updated;
  },

  deleteSchool: async (id) => {
    await schoolsRepository.delete(id);
    set((state) => ({
      schools: state.schools.filter((s) => s.id !== id),
    }));
  },

  // Draft persistence
  saveProductDraft: async (draftData) => {
    try {
      await AsyncStorage.setItem(DRAFT_PRODUCT_KEY, JSON.stringify(draftData));
    } catch (e) {
      console.warn('Failed to save product draft', e);
    }
  },

  loadProductDraft: async () => {
    try {
      const data = await AsyncStorage.getItem(DRAFT_PRODUCT_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  clearProductDraft: async () => {
    try {
      await AsyncStorage.removeItem(DRAFT_PRODUCT_KEY);
    } catch (e) {}
  },
}));
