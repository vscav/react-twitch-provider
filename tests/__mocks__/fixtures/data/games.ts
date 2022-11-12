import { gamesData } from './games-data'

interface PaginationQueryParams {
  after?: string
  before?: string
  first?: number
}

let games = [...gamesData]

function getAll() {
  return games
}

function getTop(queryParameters?: PaginationQueryParams) {
  const first = queryParameters?.first || 20

  if (queryParameters) {
    const { after, before } = queryParameters

    if (after) {
      const index = games.map((game) => game.id).indexOf(after)
      const gamesSet = games.slice(index + 1, index + first + 1)
      return {
        data: gamesSet,
        pagination: {
          cursor: gamesSet[gamesSet.length - 1]?.id || '',
        },
      }
    }

    if (before) {
      const index = games.map((game) => game.id).indexOf(before)
      const gamesSet = games.slice(index - first, index)
      return {
        data: gamesSet,
        pagination: {
          cursor: gamesSet[0]?.id || '',
        },
      }
    }
  }

  const gamesSet = games.slice(0, first)

  return {
    data: gamesSet,
    pagination: {
      cursor: gamesSet[gamesSet.length - 1]?.id || '',
    },
  }
}

function reset() {
  games = [...gamesData]
}

export { getAll, getTop, reset }
