import { z } from 'zod'
import { HTTP_STATUS_MAP } from '../constants'
import { isEmptyString, isString } from './string'
import { isUrl } from './url'

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
  constructor(entityIdentifier: string) {
    super(
      'Unexpected Twitch data format',
      422,
      `The response received from the Twitch API does not respect the expected format for the ${entityIdentifier} object. It might has been caused by breaking changes in the Twitch API that are not currently handled in the library.`,
    )
  }
}

class UnexpectedTwitchPaginationError extends FetcherError {
  constructor() {
    super(
      'Unexpected Twitch pagination format',
      422,
      `The response received from the Twitch API does not respect the expected format for the pagination object. It might has been caused by breaking changes in the Twitch API that are not currently handled in the library.`,
    )
  }
}

async function generateError(fetcherResponse: Response): Promise<FetcherError> {
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

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

function safelyValidateTwitchApiError(maybeTwitchApiError: unknown): boolean {
  const { success: isTwitchApiError } = TwitchApiError.safeParse(maybeTwitchApiError)
  return isTwitchApiError
}

function throwOnInvalidClientIdentifier(clientId: unknown): void {
  const isClientIdValid = isString(clientId) && !isEmptyString(clientId)

  if (!isClientIdValid)
    throw new Error(
      'You need to provide an existing and valid Twitch client identifier to the provider. See https://dev.twitch.tv/docs/api/get-started#register-an-application for more information on how to register an application and obtain your Twitch client identifier.',
    )
}

function throwOnInvalidRedirectUri(redirectUri: unknown): void {
  const isRedirectUriValid = isUrl(redirectUri)

  if (!isRedirectUriValid)
    throw new Error(
      'You need to provide a valid URL as the redirect URI that will be used as part of the Twitch OAuth flow.',
    )
}

export {
  FetcherError,
  generateError,
  getErrorMessage,
  throwOnInvalidClientIdentifier,
  throwOnInvalidRedirectUri,
  UnexpectedTwitchDataError,
  UnexpectedTwitchPaginationError,
}
