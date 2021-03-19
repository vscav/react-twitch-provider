import { useTwitchCurrentUser } from './useTwitchCurrentUser';
import { useTwitchApi } from './useTwitchApi';

/**
 * https://dev.twitch.tv/docs/api/reference#get-users-follows
 */
export const useTwitchFollowers = () => {
  const currentUser = useTwitchCurrentUser();
  let path = null;
  if (currentUser != null) {
    const params = new URLSearchParams({ to_id: currentUser.id });
    path = `users/follows?${params}`;
  }
  return useTwitchApi(path);
};
