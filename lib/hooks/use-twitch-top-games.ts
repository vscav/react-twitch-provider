import { ENTITY_IDENTIFIER, TWITCH_API_TOP_GAMES_ENDPOINT } from '../constants'
import type { GamesApiResponse, TwitchGamesHookReturn } from '../types'
import { createApiEndpoint, safelyValidateGamesData, UnexpectedTwitchDataError } from '../utils'
import { useTwitchApi } from './use-twitch-api'

interface TwitchTopGamesQueryParams {
  /**
   * Cursor for forward pagination: tells the server where to start fetching the next set of results, in a multi-page response.
   * The cursor value specified here is from the pagination response field of a prior query.
   */
  after?: string

  /**
   * Cursor for backward pagination: tells the server where to start fetching the next set of results, in a multi-page response.
   * The cursor value specified here is from the pagination response field of a prior query.
   */
  before?: string

  /**
   * Maximum number of objects to return. Maximum: 100. Default: 20.
   */
  first?: number
}

/**
 * Gets games sorted by number of current viewers on Twitch, most popular first.
 *
 * See the [Twitch API endpoint documentation](https://dev.twitch.tv/docs/api/reference#get-top-games) for more information.
 *
 * @returns {TwitchCheermotesHookReturn}
 */
function useTwitchTopGames(queryParameters?: TwitchTopGamesQueryParams): TwitchGamesHookReturn {
  const path = createApiEndpoint(TWITCH_API_TOP_GAMES_ENDPOINT, {
    ...(queryParameters?.after && { after: queryParameters.after }),
    ...(queryParameters?.before && { before: queryParameters.before }),
    ...(queryParameters?.first && { first: queryParameters.first.toString() }),
  })

  const { data, error, isValidating } = useTwitchApi<GamesApiResponse>(path)

  const needsDataValidation = data && !isValidating && !error
  const isLoading = !error && !data

  const games = data?.data

  if (needsDataValidation) {
    const areGamesDataValid = safelyValidateGamesData(games)
    if (!areGamesDataValid) {
      return {
        error: new UnexpectedTwitchDataError(ENTITY_IDENTIFIER.GAME),
        isValidating,
        isLoading,
      }
    }
  }

  return { data, error, isValidating, isLoading }
}

export { useTwitchTopGames }
