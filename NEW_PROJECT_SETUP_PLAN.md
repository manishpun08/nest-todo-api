# New Project Setup & Bootstrapping Plan

This guide outlines the step-by-step procedure to initialize a new full-stack monorepo with **NestJS (Backend)** and **React Native / Expo (Mobile)** matching the exact architectural conventions.

---

## 1. Monorepo Root Initialization

```bash
# 1. Initialize git and package.json
mkdir my-new-project && cd my-new-project
git init
npm init -y
```

### Root `package.json` Configuration:
```json
{
  "name": "my-new-project",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "backend",
    "mobile-app"
  ],
  "scripts": {
    "dev:backend": "npm run start:dev -w backend",
    "dev:mobile": "npm run start -w mobile-app",
    "build:backend": "npm run build -w backend",
    "build:mobile": "npm run build -w mobile-app",
    "mobile:ios": "npm run ios -w mobile-app",
    "mobile:android": "npm run android -w mobile-app",
    "biome:check": "biome check .",
    "biome:fix": "biome check --write --unsafe .",
    "lint": "npm run lint -w backend && npm run lint -w mobile-app",
    "type-check": "npm run type-check -w backend && npm run type-check -w mobile-app"
  },
  "devDependencies": {
    "@biomejs/biome": "2.4.10",
    "lefthook": "^2.1.4"
  }
}
```

---

## 2. NestJS Backend Initialization

```bash
# Generate NestJS project in backend/
npx -y @nestjs/cli new backend --package-manager npm --strict --skip-git

# Navigate and install core architecture dependencies
cd backend
npm i @nestjs/config @nestjs/swagger @nestjs/throttler @nestjs/bullmq bullmq @prisma/client prisma class-validator class-transformer nestjs-pino pino pino-pretty dotenv
npm i -D @types/node @types/express tsconfig-paths tsc-alias
```

### Configure `backend/tsconfig.json`:
```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2023",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@common/*": ["src/common/*"],
      "@modules/*": ["src/modules/*"],
      "@shared-kernel/*": ["src/shared-kernel/*"]
    }
  }
}
```

### Create Core Directory Structure:
```bash
mkdir -p src/common/{filters,interceptors,guards,decorators,middleware,request-context,database}
mkdir -p src/shared-kernel
mkdir -p src/modules
```

---

## 3. React Native / Expo Mobile App Initialization

```bash
# From the root directory:
npx -y create-expo-app@latest mobile-app --template default

# Install core data & UI libraries:
cd mobile-app
npm i @tanstack/react-query axios nativewind tailwindcss react-native-reanimated react-native-safe-area-context react-native-screens lucide-react-native react-i18next i18next @react-native-async-storage/async-storage
```

### Create Feature-Slice Structure:
```bash
mkdir -p src/core/{api,storage}
mkdir -p src/components/{ui,shared}
mkdir -p src/constants
mkdir -p src/navigation
mkdir -p src/providers
mkdir -p src/styles
mkdir -p src/features
```

---

## 4. Place AI Guidelines

Copy the templates into your new project:
- Copy `docs/templates/AGENTS.md` -> `my-new-project/AGENTS.md`
- Copy `docs/templates/backend.AGENTS.md` -> `my-new-project/backend/AGENTS.md`
- Copy `docs/templates/mobile-app.AGENTS.md` -> `my-new-project/mobile-app/AGENTS.md`
