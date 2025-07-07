# 🧪 Muzz Frontend Engineering Test

📝 **See [CHANGELOG.md](./CHANGELOG.md) for documentation of changes and thought process during development.**

## 📋 Prerequisites

- Node.js (24)
  - [fnm](https://github.com/Schniz/fnm)
  - [nvm](https://github.com/nvm-sh/nvm)
  - [direct](https://nodejs.org/en/download)
- pnpm (v10) - [Install pnpm](https://pnpm.io/installation)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/basselalsayed/muzz-tech-test.git
   cd muzz-tech-test
   ```

1. **Install dependencies**

   ```bash
   # Install all dependencies using pnpm
   pnpm install
   ```

1. **Start the development servers**
   ```bash
   # Start all development servers using Turbo
   turbo dev
   ```

## 🧪 Running Tests

To run tests, you'll need two terminal windows:

**Terminal 1 - Start the development servers:**

```bash
turbo dev
```

**Terminal 2 - Run tests:**

```bash
turbo test
```

## 📁 Project Structure

```
.
├── apps/
│   ├── frontend/                    # Frontend application
│   │   ├── src/
│   │   │   ├── assets/             # Static assets and images
│   │   │   ├── components/         # Reusable UI components
│   │   │   │   ├── ui/             # UI component library
│   │   │   │   │   ├── button.component.tsx
│   │   │   │   │   ├── skeleton.component.tsx
│   │   │   │   │   └── tabs.component.tsx
│   │   │   │   ├── layout.component.tsx
│   │   │   │   ├── typing-indicator.component.tsx
│   │   │   │   └── user-card.component.tsx
│   │   │   ├── data/               # Data layer and API
│   │   │   │   ├── hooks/          # Data fetching hooks
│   │   │   │   ├── schemas/        # Data validation schemas
│   │   │   │   └── trpc.ts         # tRPC client configuration
│   │   │   ├── hooks/              # Custom React hooks
│   │   │   │   ├── use-current-recipient.hook.ts
│   │   │   │   └── use-typing.hook.ts
│   │   │   ├── lib/                # Utilities and constants
│   │   │   │   ├── constants/      # App constants
│   │   │   │   └── utils.ts        # Utility functions
│   │   │   ├── pages/              # Page components
│   │   │   │   ├── chat/           # Chat functionality
│   │   │   │   │   ├── components/ # Chat-specific components
│   │   │   │   │   │   ├── header.component.tsx
│   │   │   │   │   │   └── tabs/   # Chat tabs
│   │   │   │   │   │       ├── chat-tab.component.tsx
│   │   │   │   │   │       ├── profile-tab.tsx
│   │   │   │   │   │       └── components/
│   │   │   │   │   │           ├── message-item.component.tsx
│   │   │   │   │   │           ├── messages.component.tsx
│   │   │   │   │   │           └── messages-skeleton.component.tsx
│   │   │   │   │   └── chat.page.tsx
│   │   │   │   └── home/           # Home page
│   │   │   │       ├── components/
│   │   │   │       │   └── user-list.component.tsx
│   │   │   │       └── home.page.tsx
│   │   │   ├── store/              # State management
│   │   │   │   └── user.store.ts   # User state
│   │   │   ├── app.component.tsx   # Root component
│   │   │   ├── router.tsx          # App routing
│   │   │   └── main.tsx            # App entry point
│   │   ├── e2e/                    # End-to-end tests
│   │   ├── public/                 # Public assets
│   │   ├── utils/                  # Build utilities
│   │   └── package.json
│   │
│   └── backend/                     # Backend application
│       ├── server.ts               # Server entry point
│       ├── server.dev.ts           # Development server
│       └── package.json
│
└── packages/                        # Shared packages
    ├── trpc/                       # tRPC configuration
    │   └── src/
    │       ├── routers/            # API routes
    │       │   ├── chat/           # Chat API
    │       │   │   ├── router.ts
    │       │   │   ├── event-service.ts
    │       │   │   ├── schema.ts
    │       │   │   └── seed.ts
    │       │   ├── users.router.ts
    │       │   └── index.ts
    │       ├── schema.ts
    │       └── index.ts
    ├── tsconfig/                   # TypeScript configurations
    ├── prettier/                   # Prettier configuration
    └── scripts/                    # Build scripts
```

### Backend Starter

We've included a basic backend starter to save you time, but feel free to:

- Use your own backend implementation
- Modify the existing backend
- Use a different technology stack
- Implement any additional features

The current backend is a simple Express.js server with basic user and message endpoints. You can find it in the `apps/backend` directory.

### Key Frontend Directories

- **`apps/frontend/src/pages/chat`**: Contains the main chat functionality
  - `components/tabs/chat-tab.component.tsx`: Main chat interface
  - `components/tabs/components/`: Message components
  - `components/header.component.tsx`: Chat header with navigation

- **`apps/frontend/src/data`**: Data layer and API integration
  - `hooks/`: Data fetching hooks
  - `schemas/`: Data validation schemas
  - `trpc.ts`: tRPC client configuration

- **`apps/frontend/src/hooks`**: Custom React hooks
  - `use-typing.hook.ts`: Typing indicator logic
  - `use-current-recipient.hook.ts`: Current user management

- **`apps/frontend/src/store`**: State management
  - `user.store.ts`: Handles user data and authentication

- **`apps/frontend/src/components`**: Reusable UI components
  - `ui/`: UI component library (button, skeleton, tabs)
  - `user-card.component.tsx`: User display component
  - `typing-indicator.component.tsx`: Typing indicator component
