import { useAuthStore } from '@/store/useAuthStore';

/**
 * Auth Hook — placeholder for backend authentication.
 * Currently disabled and returns mock admin session.
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const hydrate = useAuthStore((s) => s.hydrate);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hydrate,
  };
}
