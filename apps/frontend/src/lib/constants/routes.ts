export const ROUTE_PATTERNS = {
  chat: '/chat/:userId',
  chatProfile: '/chat/:userId/profile',
  home: '/',
} as const;

type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

type RouteBuilder<T extends string> =
  ExtractParams<T> extends never
    ? () => string
    : (params: Record<ExtractParams<T>, string | number>) => string;

function createRouteBuilders<T extends Record<string, string>>(
  patterns: T
): {
  [K in keyof T]: RouteBuilder<T[K]>;
} {
  const builders: Record<string, unknown> = {};

  for (const key in patterns) {
    const pattern = patterns[key];
    builders[key] = (params?: Record<string, string | number>) => {
      if (!params) return pattern;
      return pattern.replaceAll(/:([a-zA-Z0-9_]+)/g, (_, param: string) => {
        if (params[param] === undefined) {
          throw new Error(`Missing parameter: ${param}`);
        }
        return String(params[param]);
      });
    };
  }
  return builders as {
    [K in keyof T]: RouteBuilder<T[K]>;
  };
}

export const ROUTES = createRouteBuilders(ROUTE_PATTERNS);

export type RouteKey = keyof typeof ROUTES;
