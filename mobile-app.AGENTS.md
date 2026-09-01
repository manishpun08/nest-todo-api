# React Native / Expo Mobile App — AI Agent Guidelines & Architecture Rules

You are a Senior React Native & Expo Engineer. Follow the vertical-slice architecture, strict data pipeline, and NativeWind styling guidelines outlined below.

---

## 1. Directory Structure: Vertical Slice (Feature-Driven)

Every feature is fully self-contained inside `src/features/[feature-name]/`.

```
src/features/[feature-name]/
├── types/
│   ├── [feature].dto.ts          # Raw API contracts (snake_case from backend)
│   ├── [feature].domain.ts       # UI-facing models (camelCase)
│   └── index.ts                  # Subdirectory barrel
├── mappers/
│   └── [feature].mapper.ts       # Pure DTO → Domain transformation functions
├── services/
│   └── [feature].service.ts      # Singleton object wrapping apiClient + mappers
├── hooks/
│   ├── use[Feature].ts           # TanStack Query (useQuery / useMutation) wrappers
│   └── use[ScreenName].ts        # Screen-specific orchestration hooks
├── components/
│   └── [Feature]Card.tsx         # Feature-exclusive presentation UI components
├── screens/
│   └── [Feature]Screen.tsx       # Screen entry point (composes hooks & components)
├── i18n/                         # (Optional) Feature translations
└── index.ts                      # Public feature barrel export
```

### Global Shared Folders:
| Path | Purpose |
|---|---|
| `src/core/api/` | `apiClient` (Axios), `API_ENDPOINTS`, `QUERY_KEYS`, interceptors |
| `src/components/ui/` | Primitive UI components (`Button`, `Input`, `BottomSheet`, `Typography`) |
| `src/components/shared/` | Domain components shared by 2+ features (`ProfileAvatar`, `DateFilter`) |
| `src/navigation/` | `routes.ts`, Expo Router layouts & typed navigators |
| `src/constants/` | `theme.ts`, `colors.ts`, `config.ts` |
| `src/providers/` | Context providers (`QueryProvider`, `AuthProvider`, `ThemeProvider`) |
| `src/styles/` | `global.css` (Tailwind / NativeWind tokens) |

---

## 2. Mandatory Data Pipeline Flow

Never skip any layer in the data pipeline:

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│    Screen    │ ───> │     Hook     │ ───> │   Service    │ ───> │    Mapper    │ ───> │  apiClient   │
│  Component   │      │(useQuery/Mut)│      │  (Singleton) │      │ (DTO→Domain) │      │   (Axios)    │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
```

### Layer Responsibilities:

1. **DTO vs. Domain (`types/`)**:
   - `[feature].dto.ts`: Matches the backend JSON contract strictly (snake_case).
   - `[feature].domain.ts`: Consumed by React components/hooks (camelCase).
   ```ts
   // types/user.dto.ts
   export interface UserProfileDTO {
     id: string;
     full_name: string;
     avatar_url?: string;
     is_verified: boolean;
   }

   // types/user.domain.ts
   export interface UserProfile {
     id: string;
     fullName: string;
     avatarUrl?: string;
     isVerified: boolean;
   }
   ```

2. **Mappers (`mappers/`)**:
   - Pure, deterministic functions. No React hooks, no API calls.
   ```ts
   // mappers/user.mapper.ts
   import type { UserProfileDTO, UserProfile } from '../types';

   export const mapUserProfileDTO = (dto: UserProfileDTO): UserProfile => ({
     id: dto.id,
     fullName: dto.full_name,
     avatarUrl: dto.avatar_url,
     isVerified: dto.is_verified,
   });
   ```

3. **Services (`services/`)**:
   - Singleton object calling `apiClient` and transforming through mappers.
   - Use `API_ENDPOINTS` constants. Never hardcode URLs.
   ```ts
   // services/user.service.ts
   import { apiClient } from '@/core/api/client';
   import { API_ENDPOINTS } from '@/constants/endpoints';
   import { mapUserProfileDTO } from '../mappers/user.mapper';
   import type { UserProfileDTO, UserProfile } from '../types';

   export const userService = {
     getProfile: async (): Promise<UserProfile> => {
       const response = await apiClient.get<UserProfileDTO>(API_ENDPOINTS.USER.PROFILE);
       return mapUserProfileDTO(response.data);
     },
   };
   ```

4. **Hooks (`hooks/`)**:
   - Wrap service methods using TanStack Query (`useQuery` / `useMutation`).
   - Derive keys from `QUERY_KEYS`.
   ```ts
   // hooks/useUserProfile.ts
   import { useQuery } from '@tanstack/react-query';
   import { QUERY_KEYS } from '@/constants/query-keys';
   import { userService } from '../services/user.service';

   export function useUserProfile() {
     const { data, isLoading, error, refetch } = useQuery({
       queryKey: QUERY_KEYS.USER_PROFILE,
       queryFn: userService.getProfile,
       staleTime: 1000 * 60 * 5, // 5 minutes
     });

     return {
       profile: data ?? null,
       isLoading,
       error: error instanceof Error ? error.message : null,
       refetch,
     };
   }
   ```

5. **Screens & Components (`screens/` & `components/`)**:
   - Screens assemble data from companion hooks and pass down props.
   - UI components must be pure presentation (zero direct API calls or queries).

---

## 3. UI, Styling & Navigation Rules

- **NativeWind / Tailwind**: Use utility classes styled via `global.css`.
- **Theme Colors**: Always use theme semantic tokens (e.g. `text-primary`, `bg-surface-card`) or `themeColors` from `constants/theme.ts`. **Hardcoding hex codes (e.g. `#1E293B`) is strictly prohibited**.
- **Navigation**: Always use route constants from `src/navigation/routes.ts` (e.g. `router.push(ROUTES.USER_PROFILE)`). Never use raw string paths.
- **Icons**: Lucide icons (`lucide-react-native`) or Expo Vector Icons.
- **Internationalization**: Use `react-i18next` (`useTranslation`).

---

## 4. Direction of Imports Rule

To prevent circular dependencies and coupling, imports strictly flow in one direction:
```
SCREENS ──> COMPONENTS / HOOKS ──> SERVICES ──> MAPPERS ──> TYPES
```
- `types/` imports nothing.
- `mappers/` only imports `types/` and pure utils.
- `services/` only imports `mappers/`, `types/`, and `apiClient`.
- `hooks/` only imports `services/`, `types/`, and `@tanstack/react-query`.
- `components/` only imports UI primitives and `types/`.
