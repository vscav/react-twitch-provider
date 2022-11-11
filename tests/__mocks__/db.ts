import * as cheermotesDb from './fixtures/data/cheermotes'
import * as usersDb from './fixtures/data/users'

const database = {
  cheermotes: cheermotesDb,
  users: usersDb,
}

function resetDb() {
  Object.values(database).forEach((entityDb) => entityDb.reset())
}

export { database, resetDb }
