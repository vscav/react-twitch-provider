import { renderHook } from '@testing-library/react-hooks'
import { useTwitchApi } from '../hooks/use-twitch-api'
import { useTwitchUser } from '../hooks/use-twitch-user'
import { enableErrorOutputSuppression } from '../utils/console'
import { getErrorMessage } from '../utils/error'
import { renderHookWithMockTwitchContext } from '../utils/render-with-twitch'

enableErrorOutputSuppression()

describe('useTwitchApi', () => {
  it('should throw if used outside a Twitch provider', () => {
    const { result } = renderHook(() => useTwitchApi(''))
    expect(getErrorMessage(result.error)).toBe('useTwitchContext must be used within a TwitchProvider')
  })

  it('should return a 401 error on an invalid OAuth token', async () => {
    const { result, waitForNextUpdate } = await renderHookWithMockTwitchContext(() => useTwitchUser(), {
      token: 'foo',
    })

    expect(result.current.loading).toBeTruthy()

    await waitForNextUpdate()

    expect(result.current.loading).toBeFalsy()

    expect(result.current.error?.status).toBe(401)
    expect(result.current.error?.name).toBe('Unauthorized')
    expect(result.current.error?.message).toBe('Invalid OAuth token')
  })

  it('should return the valid current Twitch user', async () => {
    const { result, waitForNextUpdate } = await renderHookWithMockTwitchContext(() => useTwitchUser())

    expect(result.current.loading).toBeTruthy()

    await waitForNextUpdate()

    expect(result.current.loading).toBeFalsy()
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeDefined()
  })
})
