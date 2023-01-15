import { BASE_REDIRECT_PARAMETERS, TWITCH_API_AUTHORIZATION_URL, TWITCH_API_BASE_URL } from '../constants'
import { nullableString } from '../types'
import { isEmptyString } from './string'

/**
 * Creates a Twitch API URL from a given endpoint.
 *
 * @param {?string} endpoint The Twitch API endpoint to access
 * @returns {string} The Twitch API URL
 */
function buildApiUrl(endpoint: nullableString): string {
  return `${TWITCH_API_BASE_URL}/${endpoint}`
}

/**
 * Adds query parameters to a given endpoint.
 *
 * @param {string} endpoint The Twitch API endpoint to access
 * @param {Object.<string, string | string[]>} [queryParams={}] The query parameters to add to the endpoint
 * @returns {string} The endpoint with its query parameters
 * @example
 * buildApiEndpoint('foo', { bar: 'baz', qux: ['quux', 'corge'] })
 * // => 'foo?bar=baz&qux=quux&qux=corge'
 */
function buildApiEndpoint(endpoint: string, queryParams: Record<string, string | string[]> = {}): string {
  const queryString = buildQueryString(queryParams)
  return queryString ? `${endpoint}?${queryString}` : endpoint
}

/**
 * Builds a query string from a given map of query parameters.
 *
 * @param {Object.<string, string | string[]>} queryParams The query parameters to transform into a query string
 * @returns {string} The query string
 * @example
 * buildQueryString({ foo: 'bar', baz: ['qux', 'quux'] })
 * // => 'foo=bar&baz=qux&baz=quux'
 */
function buildQueryString(queryParams: Record<string, string | string[]>): nullableString {
  const queryString = Object.keys(queryParams)
    .map((key) => {
      const value = queryParams[key]
      if (Array.isArray(value)) {
        return value.map((subvalue) => `${encodeURIComponent(key)}=${encodeURIComponent(subvalue)}`).join('&')
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      }
    })
    .join('&')

  return isEmptyString(queryString) ? null : queryString
}

/**
 * The following function is ignored from test coverage because it is only used by
 * the Twitch provider, which is mocked for testing purposes and ignored from coverage as well.
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

export { buildApiEndpoint, buildApiUrl, buildQueryString, redirectForToken }
