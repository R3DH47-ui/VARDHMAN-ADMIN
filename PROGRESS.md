# PROGRESS.md — Vardhman Admin Mobile

## Phase 1: UI Fixes ✅ DONE
- **1A. School Cards**: Each school row is now a standalone card with radius 16, 1px border #E8E3DE, elevation 2 shadow, 16px horizontal margin, 12px vertical gap. Press effect: Animated.spring scale to 0.98. Pressable with subtle tint on press. Bottom padding 110px so last card is not hidden behind FAB/tab bar.
  - Files changed: `src/components/schools/SchoolRow.jsx`, `app/(tabs)/schools.jsx`
- **1B. Tab Bar Animation**: Each tab has a translucent circle (rgba(176,0,15,0.14), 52×32px pill, centered behind icon) that expands from 0.3 to 1.0 scale in 220ms on activation. Icon zooms to 1.18x with spring. Deactivation fades circle out in 150ms and returns icon to 1x. Respects system "reduce motion" setting via AccessibilityInfo. Badge on Alerts tab stays visible and unclipped.
  - Files changed: `src/components/layout/TabBar.jsx`

## Phase 2: Backend-Ready Architecture ✅ DONE
- **Configuration & Switch**: `src/data/config.js` with `USE_MOCK_DATA = EXPO_PUBLIC_USE_MOCK_DATA !== 'false'`.
- **API Client**: `src/services/api/client.js` with base URL, timeout, JWT injection from SecureStore, normalized error shape, 401 callback, and retry logic.
- **Endpoints**: `src/services/api/endpoints.js` centralized route definitions for future backend API.
- **Repository Pattern**: `src/data/repositories/` (products, schools, notifications, orders) implementing uniform interfaces with mock and remote branches.
- **DTO Mappers**: `src/data/mappers/` transforming backend payloads to/from UI models.
- **Custom Hooks Layer**: `src/hooks/` (`useSchools`, `useProducts`, `useNotifications`, `useDashboardSummary`, `useAuth`) exposing `{ data, isLoading, error, refetch }` and mutation actions.
- **Auth Placeholder**: `src/store/useAuthStore.js` and `src/hooks/useAuth.js` wired with SecureStore token persistence.

## Phase 3: Security & Bug Audit ✅ DONE
- **Audited**: Secrets, credentials, storage, permissions, PII in logs, input validations, npm dependencies, config files.
- **Applied Safe Fixes**:
  - Hardened `.gitignore` against `.env*`, `*.keystore`, `google-services.json`, `*.apk`, `*.aab`.
  - Configured `android.allowBackup: false` in `app.json` for admin portal security.
  - Added strict zod/runtime input validation in `app/products/new.jsx` (selling price <= MRP, bounds 1-100k, unique sizes, non-negative stock, character length limits).
  - Added strict input validation in `app/schools/new.jsx` (length limits, trimming).
  - Updated image picker options to `['images']`.
  - Verified 0 typescript artifacts, pure JavaScript code.

## Phase 4: README.md ✅ DONE
- Comprehensive production-grade documentation created documenting design tokens, assets, folder architecture, backend integration guide, build commands, and conventions.
