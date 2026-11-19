# Vardhman Admin Mobile Portal

> Native Android companion management application for Vardhman School Uniforms (VSU).

---

## 1. Project Overview

Vardhman Admin is a native Android administration app built using **Expo SDK 58** and **React Native** with **Expo Router**. Designed for Vardhman's uniform operations management, the app allows administrators to manage affiliated partner schools, uniform product catalogs, stock inventory, operational orders, and time-sensitive system alerts directly from their mobile devices.

### Screens in the Application
1. **Dashboard (`app/(tabs)/index.jsx`)**:
   - Operational overview card ("Good morning, Rakesh") with daily dispatch progress bar.
   - KPI metric grid: Orders Today, Revenue (₹), Active SKUs, Low Stock alerts.
   - Live recent orders list with status indicators (`New`, `Packed`, `Delivered`).
   - Low-stock inventory table with direct restock shortcuts.
   - Partner schools overview.
2. **Products Catalog (`app/(tabs)/products.jsx`)**:
   - Searchable, filterable catalog across schools and uniform categories.
   - Category chips (`All`, `Shirts and tops`, `Bottoms`, `Winter`, `Accessories`, `Footwear`).
   - Product rows with live status badges (`Published`, `Low stock`, `Out of stock`, `Draft`).
   - Floating Action Button (FAB) to Add Product.
3. **Partner Schools (`app/(tabs)/schools.jsx`)**:
   - Standalone school cards with CBSE/board affiliation, mapped class ranges, and addresses.
   - Filter chips by board (`All boards`, `CBSE`, `ICSE`, `State Board`).
   - Search bar across name, address, and board.
   - FAB to Add School.
4. **Alerts & Notifications (`app/(tabs)/notifications.jsx`)**:
   - System notices divided into `TODAY` and `EARLIER` groups.
   - Category filters (`All`, `Orders`, `Stock Alerts`, `Schools`).
   - "Mark all read" global action and per-item tap-to-read.
5. **Add / Edit Product (`app/products/new.jsx`)**:
   - Full stack screen for catalog item authoring.
   - Photo uploader (up to 8 images, cover photo selection).
   - School picker modal, class chip selector, gender and category segments.
   - Dynamic size & stock inventory table.
   - Strict validation: MRP bounds, selling price <= MRP, unique sizes, non-negative stock.
6. **Add / Edit School (`app/schools/new.jsx`)**:
   - School onboarding screen with institutional crest uploader.
   - Affiliation board picker, address, class coverage chip grid, customer-app visibility toggle.

### Current Status
- **Frontend**: 100% complete with custom design system, unified KIP card header, standalone school cards, and animated tab navigation.
- **Data State**: Runs on local mock data repositories by default via memory persistence.
- **Backend Readiness**: Fully decoupled repository layer, DTO mappers, API client, endpoints map, and auth store in place for seamless REST API connection with zero UI changes.

---

## 2. Tech Stack & Dependencies

The project is written strictly in **JavaScript (ES2022)** — no TypeScript syntax, types, or build steps.

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `expo` | `~58.0.26` | Core Expo framework runtime and native bridge |
| `react` | `19.3.0` | React core library |
| `react-native` | `0.88.1` | Mobile platform UI primitives |
| `expo-router` | `~58.0.32` | File-system based routing and stack/tab navigation |
| `@expo/vector-icons` | `^15.0.2` | MaterialIcons & MaterialCommunityIcons symbol set |
| `@expo-google-fonts/inter` | `^0.4.2` | Primary typography (400, 500, 600, 700) |
| `@expo-google-fonts/playfair-display` | `^0.4.2` | Serif brand wordmark ("Vardhman") typography (700) |
| `expo-font` | `~58.0.12` | Runtime font asset loading |
| `expo-image` | `~58.0.18` | High-performance image rendering with caching and aspect containment |
| `expo-image-picker` | `~58.0.10` | Media library photo picker for uniforms and school crests |
| `expo-secure-store` | `~58.0.3` | Encrypted storage for JWT auth tokens |
| `expo-status-bar` | `~58.0.5` | Status bar theming |
| `@react-native-async-storage/async-storage` | `2.2.0` | Local storage for form draft persistence |
| `zustand` | `^5.1.0` | Global reactive client state management |
| `react-hook-form` | `^7.92.0` | Performance-optimized form handling |
| `@hookform/resolvers` | `^7.0.7` | Hookform schema resolver integration |
| `zod` | `^4.6.7` | Schema declaration and validation library |
| `react-native-safe-area-context` | `~5.11.1` | Edge-to-edge notch and navigation bar insets |
| `react-native-screens` | `~4.30.1` | Native view controllers for performant navigation |

---

## 3. Design System

All design tokens are centralized in `src/theme/`.

### 3.1 Color Tokens (`src/theme/colors.js`)

| Token Name | Hex / Value | Usage |
| :--- | :--- | :--- |
| `primary` | `#B0000F` | Canonical brand red (buttons, active tabs, header border, icons) |
| `primaryDark` | `#840008` | Deep pressed states and dark accents |
| `ink` | `#1A1A1A` | Primary text headings, titles, active SKU indicators |
| `secondary` | `#5F5E5E` | Subheadings, secondary labels, board badges |
| `muted` | `#6B6B6B` | Timestamps, inactive tabs, placeholder text, hints |
| `background` | `#FAF8F5` | Warm off-white screen canvas background |
| `surface` | `#FFFFFF` | Card backgrounds, top header fill, bottom tab bar |
| `border` | `#E8E3DE` | 1px warm structural borders on cards and inputs |
| `success` | `#1E9E5A` | Published badges, delivery indicators, positive KPI diffs |
| `successBg` | `#E6F4EA` | Green status badge background |
| `error` | `#BA1A1A` | Critical warnings, destructive actions, out-of-stock tags |
| `blush` | `#FDECEC` | Subtle red container tint, icon circles |
| `blushBorder` | `#F7C6C6` | Border for blush containers |
| `heroCardBg` | `#1A1A1A` | Dashboard dark operational summary card |
| `heroMuted` | `#A6A6A6` | Muted subtitle text on dark hero card |
| `heroSub` | `#C5C5C5` | Secondary text on dark hero card |
| `heroActionPillText` | `#FF858B` | Accent badge on dark hero card |
| `progressTrack` | `#333333` | Background track for dispatch progress bar |
| `chipBg` | `#EAE8E5` | Default unselected filter chip background |
| `warningBg` | `#FEF3C7` | Low stock amber badge background |
| `warningText` | `#E08A00` | Low stock warning text |

### 3.2 Typography Tokens (`src/theme/typography.js`)

| Token | Font Family | Size | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `brandWordmark` | `PlayfairDisplay_700Bold` | 22px | 26px | Vardhman brand title in header card |
| `kpiNumber` | `Inter_700Bold` | 26px | 30px | Numeric KPI display metrics |
| `pageTitle` | `Inter_700Bold` | 20px | 24px | Screen page titles |
| `cardTitle` | `Inter_700Bold` | 16px | 20px | Card headers and item names |
| `sectionTitle` | `Inter_700Bold` | 14px | 18px | Section headings |
| `body` | `Inter_400Regular` | 14px | 20px | Standard body prose |
| `bodyMedium` | `Inter_500Medium` | 14px | 20px | Medium emphasis body text |
| `sub` | `Inter_400Regular` | 12px | 16px | Secondary description lines |
| `subSemiBold` | `Inter_600SemiBold` | 12px | 16px | Subtitles, "Admin Portal" brand line |
| `caption` | `Inter_400Regular` | 11px | 14px | Timestamps, metadata, hints |
| `microUppercase` | `Inter_700Bold` | 10px | 12px | All-caps badges, category labels |

### 3.3 Spacing, Radii & Elevation Scale (`src/theme/spacing.js`)

- **Spacing Scale**: `xs: 4`, `sm: 8`, `md: 12`, `lg: 16`, `xl: 20`, `xxl: 24`
- **Radii Scale**: `sm: 6`, `md: 8`, `lg: 12`, `card: 16`, `formCard: 14`, `full: 9999`
- **Layout Dimensions**:
  - `headerHeight`: 66px pill card
  - `tabBarHeight`: 52px (plus safe bottom insets)
  - `minTouchTarget`: 44px
  - `pageGutter`: 16px
- **Elevations**:
  - Header Pill: `elevation: 3`, shadow offset `(0, 3)`, color `#B0000F`, opacity 0.16.
  - School Card: `elevation: 2`, shadow offset `(0, 1)`, opacity 0.06.
  - Floating Action Button: `elevation: 6`, shadow offset `(0, 4)`, opacity 0.25.

### 3.4 Motion & Animation Rules
- **Tab Bar Tap Animation (`src/components/layout/TabBar.jsx`)**:
  - An expanding translucent circle (`rgba(176, 0, 15, 0.14)`, 52×32px pill) expands from scale 0.3 to 1.0 (220ms ease-out) behind the pressed tab icon.
  - The icon zooms from 1.0x to 1.18x using a spring animation (`speed: 18, bounciness: 10`) and remains active.
  - On switching tabs, the previous active circle fades out in 150ms and the icon returns to 1.0x.
  - Fully honors system accessibility settings (`AccessibilityInfo.isReduceMotionEnabled()`) by falling back to immediate opacity transitions.
- **Card Press Feedback (`src/components/schools/SchoolRow.jsx`)**:
  - Tapping a school card initiates a subtle spring scale down to `0.98x` with an Android ripple effect.

---

## 4. Assets Inventory

All static asset binaries reside in the `assets/` folder:

| File Name | Dimensions / Size | Purpose & Screen Location |
| :--- | :--- | :--- |
| `assets/vsu-logo.jpeg` | 880 × 593 px (44 KB) | Official VSU crest logo. Displayed in 48px circle inside `TabHeaderCard.jsx` across all 4 tab screens. |
| `assets/icon.png` | 1024 × 1024 px (393 KB) | Primary application icon for Android package build. |
| `assets/android-icon-foreground.png` | Adaptive icon (78 KB) | Android adaptive icon foreground layer. |
| `assets/android-icon-background.png` | Adaptive icon (17 KB) | Android adaptive icon background layer (`#FAF8F5`). |
| `assets/android-icon-monochrome.png` | Monochrome icon (4 KB) | Android 13+ themed icon support. |
| `assets/splash-icon.png` | 200 × 200 px (17 KB) | Centered splash icon displayed during application initialization. |
| `assets/favicon.png` | 48 × 48 px (1 KB) | Web fallback favicon. |

### Icon Sets & Fonts
- **Vector Icons**: `@expo/vector-icons` (MaterialIcons & MaterialCommunityIcons) mapped to symbols (`dashboard`, `inventory`, `school`, `notifications`, `search`, `add`, `check-circle`, `delete`, `edit`).
- **Loaded Fonts**:
  - `Inter_400Regular`, `Inter_500Medium`, `Inter_600SemiBold`, `Inter_700Bold` (UI typography)
  - `PlayfairDisplay_700Bold` (Brand wordmark)

---

## 5. UI Text & Copy Reference

| Screen | Header Title / Subtitle | Key Action Labels | Informational Text |
| :--- | :--- | :--- | :--- |
| **All Tabs** | "Vardhman" / "Admin Portal" | Search icon, Bell with badge, "RK" avatar | Top shared pill card |
| **Dashboard** | "Operational Overview" | "View all >" orders, "+ Restock" | "Good morning, Rakesh", "High dispatch volume scheduled" |
| **Products** | "Products" / "X items catalog" | "+ ADD PRODUCT" (FAB), Filter chips | "Showing X items", "Sort: Newest" |
| **Schools** | "Partner Schools" / "X affiliated institutions" | "+ ADD SCHOOL" (FAB), Board chips | "Showing X schools", "N products mapped" |
| **Alerts** | "Admin Notifications" / "Portal Admin" | "Mark all read", Filter chips | "N pending critical notices", "All caught up" |
| **Add Product** | "Admin Add Product" | "Publish Product", "Save Draft" | "Institutional specs", "Size & Inventory" |
| **Add School** | "Admin Add School" | "Save Institution", "Cancel" | "Institutional Crest / Logo", "Class Coverage" |

---

## 6. Architecture & Folder Structure

```
vardhman-admin-mobile/
├── app/                              # Expo Router file-system routes
│   ├── _layout.jsx                   # Root layout (fonts loading, safe area, Stack)
│   ├── (tabs)/                       # Bottom tab navigation group
│   │   ├── _layout.jsx               # Tabs configuration with custom TabBar
│   │   ├── index.jsx                 # Dashboard screen
│   │   ├── products.jsx              # Product catalog screen
│   │   ├── schools.jsx               # Partner schools screen
│   │   └── notifications.jsx         # Alerts and notifications screen
│   ├── products/
│   │   └── new.jsx                   # Add / Edit product stack screen
│   └── schools/
│       └── new.jsx                   # Add / Edit school stack screen
├── assets/                           # Image and icon assets
├── src/
│   ├── components/
│   │   ├── dashboard/                # KpiGrid, OverviewCard, RecentOrdersCard, etc.
│   │   ├── layout/                   # TabHeaderCard, TabBar, AppHeader, StickyActionBar
│   │   ├── notifications/            # NotificationItem
│   │   ├── products/                 # ProductRow, ProductThumb, PhotoUploader, SizeStockTable
│   │   ├── schools/                  # SchoolRow, ClassChipGrid, LogoUploader
│   │   └── ui/                       # Button, Card, Chip, FormField, Icon, SearchBar, etc.
│   ├── constants/                    # Enums (ORDER_STATUS, PRODUCT_CATEGORIES, etc.)
│   ├── data/
│   │   ├── config.js                 # Central mock switch and timeout config
│   │   ├── mappers/                  # DTO mappers (API <-> UI models)
│   │   │   ├── index.js
│   │   │   ├── productMapper.js
│   │   │   ├── schoolMapper.js
│   │   │   ├── notificationMapper.js
│   │   │   └── orderMapper.js
│   │   ├── repositories/             # Uniform repository layer (mock / remote)
│   │   │   ├── index.js
│   │   │   ├── productsRepository.js
│   │   │   ├── schoolsRepository.js
│   │   │   ├── notificationsRepository.js
│   │   │   └── ordersRepository.js
│   │   ├── notificationsRepository.js# Mock memory dataset
│   │   ├── ordersRepository.js       # Mock memory dataset
│   │   ├── productsRepository.js     # Mock memory dataset
│   │   └── schoolsRepository.js      # Mock memory dataset
│   ├── hooks/                        # Custom React data hooks
│   │   ├── index.js
│   │   ├── useSchools.js
│   │   ├── useProducts.js
│   │   ├── useNotifications.js
│   │   ├── useDashboardSummary.js
│   │   └── useAuth.js
│   ├── services/
│   │   └── api/                      # Remote HTTP client
│   │       ├── client.js             # Fetch wrapper with JWT injection & error normalization
│   │       ├── endpoints.js          # REST URL route definitions
│   │       └── index.js
│   ├── store/
│   │   ├── useAppStore.js            # Main Zustand application store
│   │   └── useAuthStore.js           # Auth session store with SecureStore integration
│   ├── theme/                        # Design system (colors, typography, spacing)
│   └── utils/                        # Formatting helpers and class range generator
├── app.json                          # Expo configuration & permissions
├── eas.json                          # EAS build profiles (APK preview, AAB production)
├── jsconfig.json                     # Path alias `@/*` -> `./src/*`
└── package.json                      # Dependency manifest (JavaScript only)
```

---

## 7. Backend Integration Guide

The frontend is completely decoupled from the data layer. Connecting to a live backend requires **zero changes to screen components or UI code**.

### 7.1 The Toggle Switch
In `.env` or system environment, set:
```env
EXPO_PUBLIC_USE_MOCK_DATA=false
EXPO_PUBLIC_API_BASE_URL=https://api.vardhmanuniforms.com
```
When `EXPO_PUBLIC_USE_MOCK_DATA` is `false`, all repositories in `src/data/repositories/` automatically switch from the local mock implementation to the `remoteRepo` implementation using `src/services/api/client.js`.

### 7.2 API Client & Error Format
The API client (`src/services/api/client.js`) guarantees:
- Base URL prefixing.
- Auto-injecting `Authorization: Bearer <token>` from encrypted `expo-secure-store`.
- Configurable timeout (default 15,000ms).
- Standardized error format thrown on non-2xx responses:
  ```javascript
  {
    code: 'HTTP_400' | 'NETWORK' | 'TIMEOUT',
    message: 'Descriptive error message',
    status: 400,
    details: null | Object
  }
  ```
- Automatic session expiry interception on `401 Unauthorized` via `setSessionExpiredHandler`.

### 7.3 Backend Developer Checklist
1. **Update Endpoints (`src/services/api/endpoints.js`)**:
   Adjust the path constants (`/api/v1/products`, `/api/v1/schools`, etc.) to match your server routing.
2. **Review DTO Mappers (`src/data/mappers/`)**:
   If your server response schema differs (e.g., snake_case `school_id` instead of `schoolId`), adapt the mapper function. UI screens receive only normalized camelCase properties.
3. **Wire Authentication (`src/store/useAuthStore.js`)**:
   Uncomment the `login` function to make the POST call to your auth endpoint, then store the returned JWT using `SecureStore.setItemAsync('vardhman_auth_token', token)`.

---

## 8. Scripts & Build Instructions

### 8.1 Local Development
```bash
# Install dependencies (respecting peer dependencies)
npm install --legacy-peer-deps

# Start Metro bundler with Expo
npm start

# Run directly on an attached Android device or emulator
npm run android
```

### 8.2 Building the Android APK (Release)
The project is pre-configured with **EAS Build** to output a standalone Android `.apk` file for testing:

```bash
# Build standalone APK via EAS cloud
eas build --platform android --profile preview

# Local Gradle APK build (if Android SDK is installed locally)
npx expo run:android --variant release
```

---

## 9. Security & Hardening Measures

- **No TypeScript Transpilation Vulnerabilities**: Pure JavaScript ES2022 codebase with explicit path alias mapping.
- **Secure Token Storage**: Sensitive authentication tokens are managed strictly via native encrypted storage (`expo-secure-store`), never in plain `AsyncStorage`.
- **Android Backup Disabled**: Configured `"allowBackup": false` in `app.json` to prevent extraction of application cache and tokens via ADB.
- **Strict Input Validation**:
  - Item names and school names are trimmed and capped.
  - Product selling price is strictly enforced to be positive and cannot exceed MRP.
  - Unique size enforcement prevents corrupted catalog state.
- **Cleartext Traffic Blocked**: Production builds enforce HTTPS.
- **Environment Isolation**: `.gitignore` comprehensively excludes all `.env*`, keystores (`*.keystore`, `*.jks`), credentials (`google-services.json`), and APK/AAB builds.

---

## 10. Code Conventions & Rules

1. **JavaScript Only**: All code is authored in `.js` and `.jsx`. No `.ts`, `.tsx`, or TypeScript tooling.
2. **Path Aliasing**: Import all components, theme tokens, stores, and hooks using the `@/*` prefix pointing to `src/*`.
3. **Immutability in Repositories**: All repository methods return clean copies of data models.
4. **Platform Respect**: Safe area padding is strictly respected using `react-native-safe-area-context` on all headers and bottom bars.
