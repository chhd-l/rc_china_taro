import { FetcherError } from "./types/api/errors"

export function getError(errors: any[], status: number) {
  errors = errors ?? [{ message: 'Failed to fetch Shopify API' }]
  return new FetcherError({ errors, status })
}