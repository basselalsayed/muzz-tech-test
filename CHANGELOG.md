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

Changes I would make if I had more time:

1. Move frontend to an SSR framework, tanstack start, remix etc.
