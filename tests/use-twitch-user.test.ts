import { renderHook } from '@testing-library/react-hooks'
import mockConsole from 'jest-mock-console'
import { ENTITY_IDENTIFIER } from '../lib/constants'
import { useTwitchCurrentUser } from '../lib/hooks'
import { getErrorMessage } from '../lib/utils'
import { renderHookWithMockTwitchContext } from './utils'
import {
  TWITCH_INTERNAL_SERVER_ERROR_RESPONSE,
  TWITCH_INVALID_CLIENT_ID,
  TWITCH_INVALID_OAUTH_TOKEN,
} from './__mocks__/fixtures'
import * as usersDb from './__mocks__/fixtures/data/users'
import { USERS_PATH } from './__mocks__/paths'
import { rest, server } from './__mocks__/server'

describe('useTwitchCurrentUser', () => {
  it('should throw an error if used outside a Twitch provider', () => {
    const restoreConsole = mockConsole()
    const { result } = renderHook(() => useTwitchCurrentUser())
    expect(console.error).toHaveBeenCalled()
    expect(getErrorMessage(result.error)).toBe(
      'The TwitchProvider context is undefined. Verify that useTwitchContext() is being called as a child of a <TwitchProvider> component.',
    )
    restoreConsole()
  })

  it('should return a 200 response with data', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCurrentUser())

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeDefined()
  })

  it('should return a 401 error on an invalid Twitch OAuth token', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCurrentUser(), {
      accessToken: TWITCH_INVALID_OAUTH_TOKEN,
    })

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error?.status).toBe(401)
    expect(result.current.error?.name).toBe('Unauthorized')
    expect(result.current.error?.message).toBe('Invalid OAuth token')
  })

  it('should return a 401 error on an invalid Twitch client identifier', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCurrentUser(), {
      clientId: TWITCH_INVALID_CLIENT_ID,
    })

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error?.status).toBe(401)
    expect(result.current.error?.name).toBe('Unauthorized')
    expect(result.current.error?.message).toBe('Client ID and OAuth token do not match')
  })

  it('should return a 422 error on unexpected/malformed user data received from the Twitch API', async () => {
    server.use(
      rest.get(USERS_PATH, (_, response, context) => {
        const users = usersDb.getAll()
        const malformedUsers = users.map((user) => ({ ...user, updated_at: 'Unexpected property' }))

        return response(
          context.status(200),
          context.json({
            data: malformedUsers,
          }),
        )
      }),
    )

    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCurrentUser())

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error?.status).toBe(422)
    expect(result.current.error?.name).toBe('Unexpected Twitch data format')
    expect(result.current.error?.message).toBe(
      `The response received from the Twitch API does not respect the expected format for the ${ENTITY_IDENTIFIER.USER} object. It might has been caused by breaking changes in the Twitch API that are not currently handled in the library.`,
    )
  })

  it('should return a 500 error on an internal server error', async () => {
    server.use(
      rest.get(USERS_PATH, (_, response, context) => {
        return response(context.status(500), context.json(TWITCH_INTERNAL_SERVER_ERROR_RESPONSE))
      }),
    )

    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchCurrentUser())

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.isLoading).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error?.status).toBe(500)
    expect(result.current.error?.name).toBe('Internal Server Error')
    expect(result.current.error?.message).toBe('For an unknown reason, the server cannot process the request')
  })
})
