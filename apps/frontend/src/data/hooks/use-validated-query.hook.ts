import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { type ZodTypeAny, type z } from 'zod';

/**
 * Fetches data from a URL and validates it with a zod schema.
 * Throws if validation fails.
 */
async function fetcher<TSchema extends ZodTypeAny>(
  url: string,
  schema: TSchema
): Promise<z.infer<TSchema>> {
  const response = await axios.get<unknown>(url);

  const result = schema.safeParse(response.data);
  if (!result.success) {
    throw new Error(
      'Schema validation failed: ' + JSON.stringify(result.error.issues)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result.data as z.infer<TSchema>;
}

/**
 * Generic hook to fetch and validate data using a zod schema.
 * @param url The endpoint to fetch from.
 * @param schema The zod schema to validate the response.
 * @param options Optional react-query options.
 */
export function useValidatedQuery<TSchema extends ZodTypeAny>(
  url: string,
  schema: TSchema,
  options?: Omit<UseQueryOptions<z.infer<TSchema>>, 'queryKey' | 'queryFn'>
): UseQueryResult<z.output<TSchema>> {
  return useQuery<z.output<TSchema>>({
    queryFn: () => fetcher(url, schema),
    queryKey: [url],
    ...options,
  });
}
