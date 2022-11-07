import { z } from 'zod'
import { TwitchApiPaginatedDataResponse, TwitchHookBaseReturn } from '../common'
import { PaginatedData } from '../pagination'

const Game = z.object({
  /**
   * Game ID.
   */
  id: z.string(),

  /**
   * Game name.
   */
  name: z.string(),

  /**
   * Template URL for a game’s box art.
   */
  box_art_url: z.string(),
})

type Game = z.infer<typeof Game>

const Games = z.array(Game)

type Games = z.infer<typeof Games>

type GamesApiResponse = TwitchApiPaginatedDataResponse<Games>

type TwitchGamesHookReturn = TwitchHookBaseReturn & {
  data?: PaginatedData<Games>
}

export type { TwitchGamesHookReturn, GamesApiResponse }
export { Game, Games }
