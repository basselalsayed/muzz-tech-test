Changes I've made

1. Move frontend/backend to `apps` directory which is standard for js monorepos
1. Install turborepo and move to pnpm workspaces
   1. Backend: install tsx to run server
1. Install chokidar to run the server with hot-reload
1. Create a packages directory
   - Create some shared prettier configs
   - Install in frontend and monorepo root
1. Create a scripts package for shared scripts
   - Create a tsup-dts script that can be run as a binary
     - This allows for streamlined scaffolding of packages, as types can be generated from jsdoc or typescript without overhead of tsconfig.json or compilation workflow
     - Opted for [tsup](https://github.com/evanw/esbuild/tree/main/packages/tsup) as it is a more lightweight alternative to typescript for small projects
1. Create [tsconfig package](./packages/tsconfig/README.md)
1. Setup frontend linting using my own config
   1. As well as general legibility, the main focus here is on clean imports that encourage modularity. It's easy to end up with circular imports that cause hard to solve runtime bugs, so my philosophy is all about strong folder structure before it reaches that stage. In a larger project, I would perhaps move to something like [boundaries](https://www.npmjs.com/package/eslint-plugin-boundaries)
1. Install and implement react router
   1. Implement a dynamic type-safe method of exposing routing calls while interpolating params [here](./apps/frontend/src/lib/constants/routes.ts)
1. Create a reusable [useValidatedQuery hook](./apps/frontend/src/data/hooks/use-validated-query.hook.ts)
   1. This uses zod to validate api responses, securing the contract between frontend and backend. Allows us to throw a generic error to the user rather than get a strange bug
1. Use the generic query hook to make useUsers and useCurrentRecipient hooks, deprecating the need for currentRecipient in the users store
1. Directory & import cleanup
1. Move QueryClient creation to outside of react render cycle as only one is needed per app instance
1. Install [ts-pattern](https://github.com/gvergnaud/ts-pattern), a very powerful pattern matching library that brings rust/dart style language features to ts
1. Setup [lint-staged](https://github.com/okonet/lint-staged) for precommit hooks
1. create a [cn](./apps/frontend/src/lib/utils.ts) function to better handle conditional tailwind classes
1. tRPC backend complete
1. ws + event emitter for message push and user typing features
1. Chat Frontend feature
1. Base components: [TypingIndicator](./apps/frontend/src/components/typing-indicator.component.tsx) & [Skeleton](./apps/frontend/src/components/ui/skeleton.component.tsx) for loading
1. [Messages component](./apps/frontend/src/pages/chat/components/tabs/components/messages.component.tsx)
1. Refactor MessageItem
1. Move MessageSchema to trpc package and export schemas from there
1. MessagesSkeleton for nice loading indicator
1. Chat feature complete
   1. Various queries, subscriptions and mutations implemented with the backend
   2. Chat websocket complete
   3. Partner is typing websocket complete
   4. Migrate to [react-hook-form](https://react-hook-form.com/)
   5. Deprecate Messages store & page store as they've been replaced with react-query and react-router
   6. Add local storage to user store to allow the chat page to be refreshed
   7. Install [usehooks-ts](https://usehooks-ts.com/) for useful React hooks like useLocalStorage, useDebounce, and useEventListener
1. Install and setup [Playwright](https://playwright.dev/) for end-to-end testing
1. Write playwright tests

Changes I would make if I had more time:

1. Move frontend to an SSR framework, tanstack start, remix etc.
2. Create a modular @muzz/eslint-config package. This can be a little fiddly due to tsconfig resolving, so I've skipped for velocity.
   1. Experimented with replacing prettier with eslint-stylistic
3. Authentication
4. Create a UI component library package
5. JSX/css refactoring
   1. Remove all direct usage of px, rem is better for responsive layout
   2. Move page structures to CSS grid layouts
      1. Remove divs that are no longer necessary with grid
   3. Extract various css variables into the tailwind config, colours spacing border radius etc.
      1. Replace HEX colours with HSL for compatibility with tailwind opacity classes
   4. Extract more components as necessary
   5. Responsive design - ensure [safe area](https://developer.mozilla.org/en-US/docs/Web/CSS/env) is used
6. Create a paths package to be used by all tooling of other projects
7. Vitest unit/snapshot testing
8. CI/CD & Deployment
9. Animation with something like [motion](https://motion.dev)
10. Styled Error boundaries so users see a nice error page, these ErrorBoundary components will also be responsible for forwarding bugs to bugsnag/logging service
