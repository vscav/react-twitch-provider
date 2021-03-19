import { useTwitchApi } from './useTwitchApi';

/**
 * https://dev.twitch.tv/docs/api/reference#get-users
 */
export const useTwitchUsers = () => {
  return useTwitchApi('users');
};
