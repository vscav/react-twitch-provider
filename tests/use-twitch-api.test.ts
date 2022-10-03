import { renderHook } from '@testing-library/react-hooks'
import mockConsole from 'jest-mock-console'
import { useTwitchApi } from '../lib/hooks/use-twitch-api'
import { getErrorMessage } from '../lib/utils/error'
import { renderHookWithMockTwitchContext } from './utils/render-with-twitch'
import { TWITCH_USERS_DATA } from './__mocks__/fixtures'

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
    const { result, waitForNextUpdate } = await renderHookWithMockTwitchContext(() => useTwitchApi('users'))

    expect(result.current.isValidating).toBeTruthy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.isValidating).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toEqual({ data: TWITCH_USERS_DATA })
  })

  it('should return a 404 error if the endpoint does not exist in the Twitch API', async () => {
    const { result, waitForNextUpdate } = await renderHookWithMockTwitchContext(() => useTwitchApi('foo'))

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
})
