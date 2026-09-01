# Monorepo Project — AI Assistant & Engineering Guidelines

This repository is a full-stack monorepo consisting of a **NestJS** backend and an **Expo / React Native** mobile application.

## Workspace Layout
- `backend/` — NestJS Modular Hexagonal API
- `mobile-app/` — React Native (Expo Router + NativeWind + TanStack Query)

## Monorepo Tooling & Scripts
- **Linter & Formatter**: Biome (`npm run biome:check`, `npm run biome:fix`)
- **Spell Check**: CSpell (`npm run cspell`)
- **Git Hooks**: Lefthook (`lefthook.yml`)
- **Dead Code Detection**: Fallow (`npm run fallow:check`)
- **Package Manager**: npm workspaces

## Key Invariants
1. **API Contracts**: Backend endpoints return `{ success, status, message, data, meta }`. The mobile app consumes this through Axios and maps DTOs into camelCase Domain models.
2. **Feature Isolation**: Both backend and mobile app follow domain/feature-driven vertical slices.
3. **No Cross-Package Sprawl**: Keep backend-specific logic in `backend/` and mobile-specific logic in `mobile-app/`.
