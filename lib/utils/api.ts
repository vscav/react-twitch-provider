import { BASE_REDIRECT_PARAMETERS, TWITCH_API_AUTHORIZATION_URL, TWITCH_API_BASE_URL } from '../constants'
import { nullableString } from '../types'

/**
 * Creates a Twitch API URL from a given endpoint.
 *
 * @param {?string} endpoint The Twitch API endpoint to access
 * @returns {string} The Twitch API URL
 */
function createApiUrl(endpoint: nullableString): string {
  return `${TWITCH_API_BASE_URL}/${endpoint}`
}

/**
 * Adds given parameters to the endpoint.
 *
 * @param {?string} endpoint The Twitch API endpoint to access
 * @param {Object.<string, string>} queryParams The query parameters to add to the endpoint
 * @returns {string} The endpoint with its query parameters
 */
function createApiEndpoint(endpoint: nullableString, queryParams: Record<string, string>): string {
  const hasQueryParameters = Object.keys(queryParams).length !== 0
  const queryParameters = new URLSearchParams(queryParams)

  return hasQueryParameters ? `${endpoint}?${queryParameters}` : (endpoint as string)
}

/**
 * The following function is ignored from test coverage because it is only used by
 * the Twitch provider, which is mocked in tests and ignored from coverage as well.
 */

/* istanbul ignore next */

/**
 * Redirects the user to the Twitch authorization page to retrieve an access token.
 *
 * @param {string} clientId The Twitch client ID
 * @param {string} redirectUri The location to which the authorization server sends the user once the application has been authorised and an access token assigned
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
