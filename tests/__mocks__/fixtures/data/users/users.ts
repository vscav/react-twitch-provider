import { usersData } from './users-data'

let users = [...usersData]

function getAll() {
  return users
}

function reset() {
  users = [...usersData]
}

export { getAll, reset }
