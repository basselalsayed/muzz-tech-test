#!/usr/bin/env node

import { build } from 'tsup';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('input', {
    alias: 'i',
    type: 'string',
    demandOption: true,
    describe: 'Input file (entry point)',
  })
  .option('outDir', {
    alias: 'o',
    type: 'string',
    demandOption: true,
    describe: 'Output directory',
  })
  .help().argv;

async function main() {
  try {
    await build({
      entry: [argv.input],
      dts: {
        only: true,
      },
      outDir: argv.outDir,
      format: 'esm',
      clean: true,
    });
    console.log('Declaration files generated successfully.');
  } catch (err) {
    console.error('Failed to generate declaration files:', err);
    process.exit(1);
  }
}

main();
