Changes I've made

1. Move frontend/backend to `apps` directory which is standard for js monorepos
1. Install turborepo and move to pnpm workspaces
   1. Backend: install tsx to run server
1. Install chokidar to run the server with hot-reload
1. Create a packages directory
   1. Create some shared prettier configs
   2. Install in frontend and monorepo root

Changes I would make if I had more time:

1. Move frontend to an SSR framework, tanstack start, remix etc.
