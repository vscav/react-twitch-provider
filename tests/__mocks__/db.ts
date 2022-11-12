import * as cheermotesDb from './fixtures/data/cheermotes'
import * as gamesDb from './fixtures/data/games'
import * as usersDb from './fixtures/data/users'

const database = {
  cheermotes: cheermotesDb,
  games: gamesDb,
  users: usersDb,
}

function resetDb() {
  Object.values(database).forEach((entityDb) => entityDb.reset())
}

export { database, resetDb }
