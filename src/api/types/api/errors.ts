export type ErrorData = {
  message: string
  code?: string
}

export type ErrorProps = {
  code?: string
} & (
  | { message: string; errors?: never }
  | { message?: never; errors: ErrorData[] }
)

export class FetcherError {
  status: number
  errors?: never | ErrorData[]
  constructor(
    options: {
      status: number
    } & ErrorProps
  ) {
    this.status = options.status
    this.errors = options.errors
  }
}