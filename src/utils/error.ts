import { z } from 'zod'
import { HTTP_STATUS_MAP } from '../constants/error'

const TwitchApiError = z.object({
  error: z.string(),
  message: z.string(),
  status: z.number(),
})

type TwitchApiError = z.infer<typeof TwitchApiError>

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

async function generateError(fetcherResponse: Response) {
  const genericErrorInformation = HTTP_STATUS_MAP.get(fetcherResponse.status)

  const name = genericErrorInformation?.name || 'Unknown error'
  const status = fetcherResponse.status

  let message = genericErrorInformation?.message || "Couldn't obtain more details about the error"

  try {
    // Try to parse the response because it may be a specific Twitch API error
    // with a more relevant message
    const parsedResponse = await fetcherResponse.json()
    const isTwitchApiError = safelyValidateTwitchApiError(parsedResponse)

    if (isTwitchApiError && parsedResponse.message.length) message = parsedResponse.message
  } finally {
    /* eslint-disable-next-line no-unsafe-finally */
    return new FetcherError(name, status, message)
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

function safelyValidateTwitchApiError(maybeTwitchApiError: unknown) {
  const { success: isTwitchApiError } = TwitchApiError.safeParse(maybeTwitchApiError)
  return isTwitchApiError
}

export { FetcherError, generateError, getErrorMessage, UnexpectedTwitchDataError }
