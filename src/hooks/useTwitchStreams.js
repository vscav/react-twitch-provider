import { useTwitchApi } from './useTwitchApi';

/**
 * https://dev.twitch.tv/docs/api/reference#get-streams
 */
export const useTwitchStreams = ({ first, after, before } = {}) => {
  const params = new URLSearchParams({
    ...first && { first },
    ...after && { after },
    ...before && { before },
  });
  const path = `streams?${params}`

  return useTwitchApi(path);
};
