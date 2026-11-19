/**
 * Auth Store — placeholder for backend authentication.
 * Disabled for now. Does not change today's flow.
 *
 * When the backend is ready:
 * 1. Implement login/logout with real API calls
 * 2. Store the JWT in expo-secure-store (already wired in api/client.js)
 * 3. Enable the guarded route group in app/(auth)/
 */

import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'vardhman_auth_token';
const USER_KEY = 'vardhman_auth_user';

export const useAuthStore = create((set, get) => ({
  /** @type {{ id: string, name: string, initials: string, role: string } | null} */
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  /**
   * Hydrate session from secure storage on app launch.
   * Currently a no-op — returns the hardcoded admin user.
   */
  async hydrate() {
    set({ isLoading: true });
    try {
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      if (storedToken) {
        const userJson = await SecureStore.getItemAsync(USER_KEY);
        const user = userJson ? JSON.parse(userJson) : null;
        set({ token: storedToken, user, isAuthenticated: true, isLoading: false });
        return;
      }
    } catch (_) {
      /* secure store unavailable in some envs */
    }

    // Default: mock admin user (no real auth)
    set({
      user: { id: 'admin-1', name: 'Rakesh Kumar', initials: 'RK', role: 'admin' },
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  /**
   * Login placeholder. Backend developer will implement.
   * @param {string} _email
   * @param {string} _password
   */
  async login(_email, _password) {
    // TODO: Replace with real API call
    // const { token, user } = await post('/api/v1/auth/login', { email, password });
    // await SecureStore.setItemAsync(TOKEN_KEY, token);
    // await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    // set({ token, user, isAuthenticated: true });
  },

  /**
   * Logout — clears token and user.
   */
  async logout() {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (_) {
      /* ignore */
    }
    set({ token: null, user: null, isAuthenticated: false });
  },

  /**
   * Called by the API client on 401 responses.
   */
  handleSessionExpired() {
    get().logout();
  },
}));
