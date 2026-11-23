# Vardhman Admin Portal

<p align="center">
  <img src="./assets/vsu-logo.jpeg" alt="Vardhman Logo" width="120" style="border-radius: 20px;" />
</p>

<p align="center">
  <strong>Modern Mobile Operations & Inventory Management for Vardhman Uniforms</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.88.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK_58-000020?style=flat-square&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/Language-JavaScript_ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/State-Zustand_5-443e38?style=flat-square" alt="Zustand" />
  <img src="https://img.shields.io/badge/Platform-Android_Native-3DDC84?style=flat-square&logo=android&logoColor=white" alt="Android" />
</p>

---

## 📌 About the Project

**Vardhman Admin Portal** is an enterprise-grade mobile companion application built for streamlined management of school uniform manufacturing, cataloging, and institutional distribution. 

The application empowers administrators and floor managers to oversee multi-school uniform catalogs, track real-time stock levels, manage low-inventory alerts, review daily operational orders, and onboard partner academic institutions directly from a handheld device.

### Key Capabilities
- **Operational Dashboard**: Real-time KPI summary, dispatch tracking, active SKU counts, and critical low-stock attention lists.
- **Product Catalog Management**: Comprehensive product listings categorized by uniform type (Tops, Bottoms, Winter, Accessories, Footwear) with granular size-level inventory control.
- **Institutional School Mapping**: Management of partner schools with board affiliations (CBSE, ICSE, State Boards), mapped class ranges, and official crest assets.
- **Notification Center**: Operational updates, order progress notifications, and automated inventory threshold alerts.
- **Decoupled Architecture**: Repository-based service design allowing seamless switching between local offline data and production REST backends without UI modifications.

---

## 🛠️ Technology Stack

The project is developed strictly in modern JavaScript (ES2022) with a performance-first mobile architectural foundation.

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Core Framework** | [React Native](https://reactnative.dev/) | `0.88.1` | Mobile native view controllers and layout engine |
| **Platform Runtime** | [Expo SDK](https://expo.dev/) | `~58.0.26` | Unified build ecosystem, native modules, and tooling |
| **Navigation** | [Expo Router](https://docs.expo.dev/router/introduction/) | `~58.0.32` | File-system-based navigation and deep linking |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) | `^5.1.0` | Lightweight, scalable global state store |
| **Form & Validation** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) | `^7.92.0` / `^4.6.7` | High-performance form state and schema validation |
| **Typography** | Inter & Playfair Display | Google Fonts | Primary UI and premium serif brand wordmark |
| **Vector Icons** | `@expo/vector-icons` | `^15.0.2` | Normalized Material design iconography |
| **Image Engine** | React Native Image & `expo-image` | `~58.0.18` | Hardware-accelerated image rendering and caching |
| **Local Storage** | Async Storage & Secure Store | `2.2.0` / `~58.0.3` | Persistent form drafts and session credentials |

---

## 🎨 Design System & Theme

The user interface follows a tailored, bespoke aesthetic combining Indian heritage elegance with modern industrial operational efficiency. All design tokens are centralized in `src/theme/`.

### Color Palette

| Token | Hex Value | Role in Design |
| :--- | :--- | :--- |
| `primary` | `#B0000F` | Canonical Vardhman Crimson — action buttons, primary branding, active highlights |
| `primaryDark` | `#840008` | Deep Crimson — pressed states and elevated accents |
| `background` | `#FAF8F5` | Warm Canvas — soft, low-fatigue off-white screen surface |
| `surface` | `#FFFFFF` | Pure White — cards, sheets, top header card, and bottom navigation bar |
| `ink` | `#1A1A1A` | High-contrast Charcoal — headlines, SKU numbers, and high-emphasis labels |
| `secondary` | `#5F5E5E` | Medium Gray — metadata, institution sub-labels, and neutral icons |
| `muted` | `#6B6B6B` | Low-emphasis Gray — placeholders, inactive tabs, and timestamp captions |
| `border` | `#E8E3DE` | Warm Line — subtle card borders and structural dividers |
| `success` | `#1E9E5A` | Botanical Green — published status badges, positive operational diffs |
| `warning` | `#E08A00` | Warm Amber — low-stock warnings and attention indicators |
| `error` | `#BA1A1A` | Pure Red — out-of-stock badges and critical stock notices |

### Typography & Layout Rules
- **Brand Wordmark**: *Playfair Display (Bold)* for the distinctive Vardhman identity.
- **Interface Font**: *Inter* across 400 (Regular), 500 (Medium), 600 (SemiBold), and 700 (Bold) weights for numeric legibility and clean mobile hierarchy.
- **Border Radii**: Modular scaling with `sm: 6px`, `md: 8px`, `lg: 12px`, `card: 16px`, and `full: 9999px`.
- **Touch Ergonomics**: All interactive elements strictly enforce a minimum touch target of 44×44 pt with safe area insets.

---

## 📁 Project Structure

```
VARDHMAN-ADMIN-APK/
├── app/                              # Application screen layouts and views
│   ├── (tabs)/                       # Bottom tab navigation screens
│   ├── products/                     # Product authoring and edit workflows
│   └── schools/                      # School onboarding workflows
├── assets/                           # Static media, icons, and bundled uniform imagery
│   └── products/                     # High-resolution catalog product images
├── src/
│   ├── components/                   # Modular, reusable presentation components
│   │   ├── dashboard/                # Operational summary and KPI cards
│   │   ├── layout/                   # Universal headers, navigation bar, action bars
│   │   ├── notifications/            # Alert and notice list items
│   │   ├── products/                 # Product row cards, thumbnails, stock grids
│   │   ├── schools/                  # School cards, class selectors, crest uploaders
│   │   └── ui/                       # Foundation buttons, chips, badges, inputs
│   ├── constants/                    # Enums, statuses, and asset resolvers
│   ├── data/                         # Data layer and abstraction
│   │   ├── mappers/                  # Model data transformation adapters
│   │   └── repositories/             # Unified repositories (offline-first & remote)
│   ├── hooks/                        # Custom React state and data hooks
│   ├── services/                     # Network clients and communication utilities
│   ├── store/                        # Global state management stores
│   ├── theme/                        # Centralized design tokens (colors, typography, spacing)
│   └── utils/                        # Formatting utilities and data helpers
├── app.json                          # Expo project configuration
├── eas.json                          # EAS cloud build profiles
├── jsconfig.json                     # Root path aliases (@/* -> ./src/*)
└── package.json                      # Project dependencies and script declarations
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) on an Android device or an active Android Emulator

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/R3DH47-ui/VARDHMAN-ADMIN.git
   cd VARDHMAN-ADMIN-APK
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

4. **Run on Android**:
   - Press `a` in the terminal to launch on a connected Android device / emulator.
   - Or scan the terminal QR code using the **Expo Go** application.

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying, distribution, or modification is strictly prohibited.
