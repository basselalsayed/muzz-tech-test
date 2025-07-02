# @muzz/scripts

Reusable scripts for the Muzz monorepo. This package is intended to collect CLI tools and automation scripts that can be shared across all packages in the workspace.

## Scripts

### [`tsup-dts`](./tsup-dts.js)

Generates TypeScript declaration files (`.d.ts`) for a given input file using `tsup`. Accepts `--input` (or `-i`) for the entry file and `--outDir` (or `-o`) for the output directory.

It allows you to generate type definitions without needing to set up a full `tsconfig.json` or TypeScript compilation pipeline in each package. This keeps our packages lightweight and focused, while still providing type safety and editor support for consumers.

Supports JSDoc-annotated JavaScript or TypeScript.

#### Example usage

From a package that depends on `@muzz/scripts`:

```sh
pnpm tsup-dts --input src/index.js --outDir types
# or with short flags
pnpm tsup-dts -i src/index.js -o types
```

Or as an npm script in your `package.json`:

```json
"scripts": {
  "gen-types": "tsup-dts -i src/index.js -o types"
}
```

Then run:

```sh
pnpm gen-types
```

---

More scripts will be added to this package over time. Contributions and suggestions are welcome!
