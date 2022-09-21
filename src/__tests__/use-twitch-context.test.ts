import { renderHook } from '@testing-library/react-hooks'
import { useTwitchContext } from '../context/twitch-context'
import { enableErrorOutputSuppression } from '../utils/console'
import { getErrorMessage } from '../utils/error'
import { renderHookWithMockTwitchContext } from '../utils/render-with-twitch'

enableErrorOutputSuppression()

describe('useTwitchContext', () => {
  it('should throw if used outside a Twitch provider', () => {
    try {
      renderHook(() => useTwitchContext())
    } catch (error) {
      expect(getErrorMessage(error)).toBe('useTwitchContext must be used within a TwitchProvider')
    }
  })

  it('should expose the context data', async () => {
    const { result } = await renderHookWithMockTwitchContext(() => useTwitchContext())
    expect(result.current.accessToken).toBeDefined()
    expect(result.current.clientId).toBeDefined()
  })

  it('should expose the access token as a string', async () => {
    const { result } = await renderHookWithMockTwitchContext(() => useTwitchContext())
    expect(typeof result.current.accessToken).toBe('string')
    expect(result.current.accessToken.length).toBeGreaterThan(0)
  })

  it('should expose the client id as a string', async () => {
    const { result } = await renderHookWithMockTwitchContext(() => useTwitchContext())
    expect(typeof result.current.clientId).toBe('string')
    expect(result.current.accessToken.length).toBeGreaterThan(0)
  })
})
