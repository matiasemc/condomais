# Angular Project Structure

## 1. Overview

Define Angular monorepo structure using Nx.

```
condomais/
├── apps/
│   ├── morador-app/      # Mobile app (Capacitor)
│   ├── porteiro-app/     # Doorman web
│   └── admin-panel/      # Admin web
├── libs/
│   └── shared/           # Shared library
├── angular.json
├── nx.json
├── package.json
└── tsconfig.base.json
```

## 2. Shared Library

```
libs/shared/
├── src/
│   ├── lib/
│   │   ├── components/   # Reusable components
│   │   ├── services/    # Core services
│   │   ├── guards/       # Route guards
│   │   ├── interceptors/ # HTTP interceptors
│   │   ├── models/       # TypeScript interfaces
│   │   └── pipes/        # Custom pipes
│   └── index.ts
└── package.json
```