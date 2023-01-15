import { ENTITY_IDENTIFIER, TWITCH_API_CHANNELS_ENDPOINT } from '../constants'
import type { ChannelsApiResponse, TwitchChannelsHookReturn } from '../types'
import { buildApiEndpoint, safelyValidateChannelsData, UnexpectedTwitchDataError } from '../utils'
import { useTwitchApi } from './use-twitch-api'

/**
 * Retrieves information about one or more channels.
 *
 * See the [Twitch API endpoint documentation](https://dev.twitch.tv/docs/api/reference/#get-channel-information) for more information.
 *
 * @param {?(string | string[])} [broadcasterId] ID for the broadcaster who might own specialized Cheermotes.
 * @returns {TwitchChannelsHookReturn}
 */
function useTwitchChannelsInfo(broadcasterId?: string | string[]): TwitchChannelsHookReturn {
  const isBroadcasterIdSpecified = arguments.length
  const isBroadcasterIdDefined = isBroadcasterIdSpecified && broadcasterId

  let path = null

  if (!isBroadcasterIdSpecified || isBroadcasterIdDefined) {
    path = buildApiEndpoint(TWITCH_API_CHANNELS_ENDPOINT, {
      ...(broadcasterId && { broadcaster_id: broadcasterId }),
    })
  }

  const { data, error, isValidating } = useTwitchApi<ChannelsApiResponse>(path)

  const needsDataValidation = data && !isValidating && !error
  const isLoading = !error && !data

  const channels = data?.data

  if (needsDataValidation) {
    const areChannelsDataValid = safelyValidateChannelsData(channels)
    if (!areChannelsDataValid) {
      return {
        error: new UnexpectedTwitchDataError(ENTITY_IDENTIFIER.CHANNEL),
        isValidating,
        isLoading,
      }
    }
  }

  return { data: channels, error, isValidating, isLoading }
}

export { useTwitchChannelsInfo }
