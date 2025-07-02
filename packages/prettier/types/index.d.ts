import * as tailwindPlugin from 'prettier-plugin-tailwindcss';

/**
 * Base Prettier config for @muzz/prettier-config
 * @type {import('prettier').Options}
 */
const baseConfig = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
};

/**
 * Returns a Prettier config with Tailwind CSS plugin enabled.
 * @param {string} tailwindStylesheet - Path to the Tailwind CSS stylesheet.
 * @returns {import('prettier').Options}
 */
function tailwindConfig(tailwindStylesheet) {
  return {
    ...baseConfig,
    plugins: [tailwindPlugin],
    tailwindStylesheet,
    tailwindFunctions: ['clsx', 'cva', 'cn'],
  };
}

var index = {
  baseConfig,
  tailwindConfig,
};

export { baseConfig, index as default, tailwindConfig };
