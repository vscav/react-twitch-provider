import { z } from 'zod'
import { TwitchApiDataResponse, TwitchHookBaseReturn } from '../common'

const User = z
  .object({
    /**
     * User’s ID.
     */
    id: z.string(),

    /**
     * User’s login name.
     */
    login: z.string(),

    /**
     * User’s display name.
     */
    display_name: z.string(),

    /**
     * User’s type: "staff", "admin", "global_mod", or "".
     */
    type: z.enum(['staff', 'admin', 'global_mod', '']),

    /**
     * The user’s broadcaster type: "partner", "affiliate", or "".
     */
    broadcaster_type: z.enum(['partner', 'affiliate', '']),

    /**
     * User’s channel description.
     */
    description: z.string(),

    /**
     * URL of the user’s profile image.
     */
    profile_image_url: z.string(),

    /**
     * URL of the user’s offline image.
     */
    offline_image_url: z.string(),

    /**
     * Total number of views of the user’s channel.
     */
    view_count: z.number(),

    /**
     * User’s verified email address
     */
    email: z.string().email(),

    /**
     * Date when the user was created.
     */
    created_at: z.string(),
  })
  .strict()

type User = z.infer<typeof User>

const Users = z.array(User)

type Users = z.infer<typeof Users>

type UsersApiResponse = TwitchApiDataResponse<Users>

type TwitchUserHookReturn = TwitchHookBaseReturn & {
  data?: User
}

export type { TwitchUserHookReturn, UsersApiResponse }
export { User, Users }
