import { TsConfigJson } from 'type-fest';

declare module '@muzz/tsconfig/node' {
  const config: TsConfigJson;
  export = config;
}

declare module '@muzz/tsconfig/react' {
  const config: TsConfigJson;
  export = config;
}
