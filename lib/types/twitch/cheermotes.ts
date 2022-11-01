import { z } from 'zod'
import { TwitchApiDataResponse, TwitchHookBaseReturn } from '../common'

const ImageMetadata = z.object({
  '1': z.string(),
  '1.5': z.string(),
  '2': z.string(),
  '3': z.string(),
  '4': z.string(),
})

const ImagesSet = z.object({
  /**
   * Animated image set
   */
  animated: ImageMetadata,

  /**
   * Static image set
   */
  static: ImageMetadata,
})

const Images = z.object({
  /**
   * Structure containing both animated and static dark image sets
   */
  dark: ImagesSet,

  /**
   * Structure containing both animated and static light image sets
   */
  light: ImagesSet,
})

const Tier = z.object({
  /**
   * Minimum number of bits needed to be used to hit the given tier of emote.
   */
  min_bits: z.number(),

  /**
   * ID of the emote tier. Possible tiers are: 1,100,500,1000,5000, 10k, or 100k.
   */
  id: z.string(),

  /**
   * Hex code for the color associated with the bits of that tier. Grey, Purple, Teal, Blue, or Red color to match the base bit type.
   */
  color: z.string(),

  /**
   * Structure containing both animated and static image sets, sorted by light and dark.
   */
  images: Images,

  /**
   * Indicates whether or not emote information is accessible to users.
   */
  can_cheer: z.boolean(),

  /**
   * Indicates whether or not we hide the emote from the bits card.
   */
  show_in_bits_card: z.boolean(),
})

const Cheermote = z.object({
  /**
   * The string used to Cheer that precedes the Bits amount.
   */
  prefix: z.string(),

  /**
   * An array of Cheermotes with their metadata.
   */
  tiers: z.array(Tier),

  /**
   * Shows whether the emote is global_first_party,  global_third_party, channel_custom, display_only, or sponsored.
   */
  type: z.enum(['global_first_party', 'global_third_party', 'channel_custom', 'display_only', 'sponsored']),

  /**
   * Order of the emotes as shown in the bits card, in ascending order.
   */
  order: z.number(),

  /**
   * The data when this Cheermote was last updated.
   */
  last_updated: z.string(),

  /**
   * Indicates whether or not this emote provides a charity contribution match during charity campaigns.
   */
  is_charitable: z.boolean(),
})

type Cheermote = z.infer<typeof Cheermote>

const Cheermotes = z.array(Cheermote)

type Cheermotes = z.infer<typeof Cheermotes>

type CheermotesApiResponse = TwitchApiDataResponse<Cheermotes>

type TwitchCheermotesHookReturn = TwitchHookBaseReturn & {
  data?: Cheermotes
}

export type { TwitchCheermotesHookReturn, CheermotesApiResponse }
export { Cheermotes }
