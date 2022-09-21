import {
  renderHook
} from '@testing-library/react-hooks';
import { useTwitchContext } from '../context/twitch-context';
import { getErrorMessage } from '../utils/error';
import { renderHookWithTwitchContext } from '../utils/render-twitch-hook';

describe('useTwitchContext', () => {
  it('should throw if used outside a Twitch provider', () => {
    try {
      renderHook(() => useTwitchContext())
    } catch (error) {
      expect(getErrorMessage(error)).toBe('useTwitchContext must be used within a TwitchProvider')
    }
  });

  it('should expose the context data', async () => {
    const { result } = await renderHookWithTwitchContext(() => useTwitchContext());
    expect(result.current.accessToken).toBeDefined();
    expect(result.current.clientId).toBeDefined();
  });

  it('should expose the access token as a string', async () => {
    const { result } = await renderHookWithTwitchContext(() => useTwitchContext());
    expect(typeof result.current.accessToken).toBe('string');
  });

  it('should expose the client id as a string', async () => {
    const { result } = await renderHookWithTwitchContext(() => useTwitchContext());
    expect(typeof result.current.clientId).toBe('string');
  });
});