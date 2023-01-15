import { z } from 'zod'
import { TwitchApiDataResponse, TwitchHookBaseReturn } from '../common'

const Channel = z
  .object({
    /**
     * An ID that uniquely identifies the broadcaster.
     */
    broadcaster_id: z.string(),

    /**
     * The broadcaster’s login name.
     */
    broadcaster_login: z.string(),

    /**
     * The broadcaster’s display name.
     */
    broadcaster_name: z.string(),

    /**
     * The broadcaster’s preferred language.
     * The value is an ISO 639-1 two-letter language code (for example, en for English).
     * The value is set to “other” if the language is not a Twitch supported language.
     */
    broadcaster_language: z.string(),

    /**
     * An ID that uniquely identifies the game that the broadcaster is playing or last played.
     * The value is an empty string if the broadcaster has never played a game.
     */
    game_id: z.string(),

    /**
     * The name of the game that the broadcaster is playing or last played.
     * The value is an empty string if the broadcaster has never played a game.
     */
    game_name: z.string(),

    /**
     * The title of the stream that the broadcaster is currently streaming or last streamed.
     * The value is an empty string if the broadcaster has never streamed.
     */
    title: z.string(),

    /**
     * The value of the broadcaster’s stream delay setting, in seconds.
     * This field’s value defaults to zero unless:
     * - 1) the request specifies a user access token
     * - 2) the ID in the broadcaster_id query parameter matches the user ID in the access token
     * - 3) the broadcaster has partner status and they set a non-zero stream delay value
     */
    delay: z.number(),

    /**
     * The tags applied to the channel.
     */
    tags: z.string().array(),
  })
  .strict()

type Channel = z.infer<typeof Channel>

const Channels = z.array(Channel)

type Channels = z.infer<typeof Channels>

type ChannelsApiResponse = TwitchApiDataResponse<Channels>

type TwitchChannelsHookReturn = TwitchHookBaseReturn & {
  data?: Channels
}

export type { TwitchChannelsHookReturn, ChannelsApiResponse }
export { Channel, Channels }
