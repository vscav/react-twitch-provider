import { renderHook } from '@testing-library/react-hooks'
import mockConsole from 'jest-mock-console'
import { useTwitchApi } from '../lib/hooks'
import type { UsersApiResponse } from '../lib/types'
import { getErrorMessage } from '../lib/utils'
import { renderHookWithMockTwitchContext } from './utils'
import {
  TWITCH_INTERNAL_SERVER_ERROR_RESPONSE,
  TWITCH_INVALID_CLIENT_ID,
  TWITCH_INVALID_OAUTH_TOKEN,
} from './__mocks__/fixtures'
import { USERS_PATH } from './__mocks__/paths'
import { rest, server } from './__mocks__/server'

describe('useTwitchApi', () => {
  it('should throw an error if used outside a Twitch provider', () => {
    const restoreConsole = mockConsole()
    const { result } = renderHook(() => useTwitchApi(''))
    expect(console.error).toHaveBeenCalled()
    expect(getErrorMessage(result.error)).toBe(
      'The TwitchProvider context is undefined. Verify that useTwitchContext() is being called as a child of a <TwitchProvider> component.',
    )
    restoreConsole()
  })

  it('should return a 200 response with data when using an existing Twitch API endpoint', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchApi<UsersApiResponse>('users'))

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeDefined()
  })

  it('should not perform the request with a null parameter', async () => {
    const { result } = renderHookWithMockTwitchContext(() => useTwitchApi(null))

    expect(result.current.isValidating).toBeFalsy()
  })

  it('should return a 401 error on an invalid Twitch OAuth token', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchApi('users'), {
      accessToken: TWITCH_INVALID_OAUTH_TOKEN,
    })

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()

    expect(result.current.error?.status).toBe(401)
    expect(result.current.error?.name).toBe('Unauthorized')
    expect(result.current.error?.message).toBe('Invalid OAuth token')
  })

  it('should return a 401 error on an invalid Twitch client identifier', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchApi('users'), {
      clientId: TWITCH_INVALID_CLIENT_ID,
    })

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()

    expect(result.current.error?.status).toBe(401)
    expect(result.current.error?.name).toBe('Unauthorized')
    expect(result.current.error?.message).toBe('Client ID and OAuth token do not match')
  })

  it('should return a 404 error if the endpoint does not exist in the Twitch API', async () => {
    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchApi('foo'))

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeDefined()

    expect(result.current.error?.status).toBe(404)
    expect(result.current.error?.name).toBe('Not Found')
    expect(result.current.error?.message).toBe('The requested resource could not be found')
  })

  it('should return a 500 error on an internal server error', async () => {
    server.use(
      rest.get(USERS_PATH, (_, response, context) => {
        return response(context.status(500), context.json(TWITCH_INTERNAL_SERVER_ERROR_RESPONSE))
      }),
    )

    const { result, waitForNextUpdate } = renderHookWithMockTwitchContext(() => useTwitchApi('users'))

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()

    expect(result.current.error?.status).toBe(500)
    expect(result.current.error?.name).toBe('Internal Server Error')
    expect(result.current.error?.message).toBe('For an unknown reason, the server cannot process the request')
  })
})
