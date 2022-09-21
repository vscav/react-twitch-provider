class FetcherError extends Error {
  name
  status

  constructor(name: string, status: number, message: string) {
    super(message)

    this.name = name
    this.status = status

    Object.setPrototypeOf(this, FetcherError.prototype)
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export { getErrorMessage, FetcherError }
