import { BASE_REDIRECT_PARAMETERS, TWITCH_API_AUTHORIZATION_URL, TWITCH_API_BASE_URL } from '../constants'
import { nullableString } from '../types'

function createApiUrl(endpoint: nullableString): string {
  return `${TWITCH_API_BASE_URL}/${endpoint}`
}

function createApiEndpoint(endpoint: nullableString, queryParams: Record<string, string>): string {
  const hasQueryParameters = Object.keys(queryParams).length !== 0
  const queryParameters = new URLSearchParams(queryParams)

  return hasQueryParameters ? `${endpoint}?${queryParameters}` : (endpoint as string)
}

/* istanbul ignore next */

/**
 * This function is ignored from test coverage because it is only used by
 * the Twitch provider, which is mocked in tests and ignored from coverage as well.
 */
function redirectForToken(clientId: string, redirectUri: string): void {
  const oauthParamaters = new URLSearchParams({
    ...BASE_REDIRECT_PARAMETERS,
    client_id: clientId,
    redirect_uri: redirectUri,
  })
  const oauthUrl = `${TWITCH_API_AUTHORIZATION_URL}?${oauthParamaters}`

  window.location.replace(oauthUrl)
}

export { createApiEndpoint, createApiUrl, redirectForToken }
