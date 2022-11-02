import { ENTITY_IDENTIFIER, TWITCH_API_CHEERMOTES_ENDPOINT } from '../constants'
import type { CheermotesApiResponse, TwitchCheermotesHookReturn } from '../types'
import { createApiEndpoint, safelyValidateCheermotesData, UnexpectedTwitchDataError } from '../utils'
import { useTwitchApi } from './use-twitch-api'

/**
 * Retrieves the list of available Cheermotes, animated emotes to which viewers can assign Bits, to cheer in chat.
 * Cheermotes returned are available throughout Twitch, in all Bits-enabled channels.
 *
 * See the [Twitch API endpoint documentation](https://dev.twitch.tv/docs/api/reference#get-cheermotes) for more information.
 *
 * @param {string} [broadcasterId] ID for the broadcaster who might own specialized Cheermotes.
 * @returns {TwitchCheermotesHookReturn}
 */
function useTwitchCheermotes(broadcasterId?: string): TwitchCheermotesHookReturn {
  const path = createApiEndpoint(TWITCH_API_CHEERMOTES_ENDPOINT, {
    ...(broadcasterId && { broadcaster_id: broadcasterId }),
  })

  const { data, error, isValidating } = useTwitchApi<CheermotesApiResponse>(path)

  const needsDataValidation = data && !isValidating && !error
  const isLoading = !error && !data

  const cheermotes = data?.data

  if (needsDataValidation) {
    const areCheermotesDataValid = safelyValidateCheermotesData(cheermotes)
    if (!areCheermotesDataValid) {
      return {
        error: new UnexpectedTwitchDataError(ENTITY_IDENTIFIER.CHEERMOTE),
        isValidating,
        isLoading,
      }
    }
  }

  return { data: cheermotes, error, isValidating, isLoading }
}

export { useTwitchCheermotes }
