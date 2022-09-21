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

class UnexpectedTwitchDataError extends FetcherError {
  constructor() {
    super(
      'Unexpected Twitch data format',
      422,
      'The response received from the Twitch API does not respect the expected format for a user object. It might has been caused by breaking changes in the Twitch API that are not currently handled in the library.',
    )
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export { getErrorMessage, FetcherError, UnexpectedTwitchDataError }
