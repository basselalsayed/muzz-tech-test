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
     - Opted for `tsup` as it is a more lightweight alternative to typescript for small projects
1. Create tsconfig package
1. Setup frontend linting using my own config
1. Install and implement react router
   1. Implement a dynamic type-safe method of exposing routing calls while interpolating params
1. Create a reusable useValidatedQuery hook
   1. This uss zod to validate api responses, securing the contract between frontend and backend. Allows us to throw a generic error to the user rather than get a strange bug
1. Use the generic query hook to make useUsers and useCurrentRecipient hooks, deprecating the need for currentRecipient in the users store
1. Directory & import cleanup
1. Move QueryClient creation to outside of react render cycle as one one is needed per app instance
1. Install ts-pattern, a very powerful pattern matching library that brings rust/dart style language features to ts
1. Setup lintstaged for precommit hooks
1. create a cn function to better handle conditional tailwind classes
1. tRPC backend complete
   1. ws + event emitter for message push and user typing features
1. Chat Frontend feature
   1. Base components: Typing indicator & Skeleton for loading

Changes I would make if I had more time:

1. Move frontend to an SSR framework, tanstack start, remix etc.
1. Create a modular @muzz/eslint-config package. This can be a little fiddly due to tsconfig resolving, so I've skipped for velocity.
   1. Experimented with replacing prettier with eslint-stylistic
1. Authentication
1. JSX/css refactoring
   1. Remove all direct usage of px, rem is better for responsive layout
   1. Move page structures to CSS grid layouts
      1. Remove divs that are no longer necessary with grid
   1. Extract various css variables into the tailwind config, colours spacing border radius etc.
   1. Extract more components as necessary
   1. Responsive design - ensure [safe area](https://developer.mozilla.org/en-US/docs/Web/CSS/env) is used
