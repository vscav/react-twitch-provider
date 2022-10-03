import { rest } from 'msw'
import { TWITCH_API_ENDPOINT } from '../../lib/constants/twitch-api'
import { TWITCH_USER_DATA } from './fixtures'

const getUsersPath = `${TWITCH_API_ENDPOINT}/users`
const otherPaths = `${TWITCH_API_ENDPOINT}/*`

const usersHandler = rest.get(getUsersPath, (_, response, context) => {
  return response(
    context.status(200),
    context.json({
      data: [TWITCH_USER_DATA],
    }),
  )
})

const unknownEndpointHandler = rest.get(otherPaths, (_, response, context) => {
  return response(
    context.status(404),
    context.json({
      data: null,
    }),
  )
})

const handlers = [usersHandler, unknownEndpointHandler]

export { handlers }
