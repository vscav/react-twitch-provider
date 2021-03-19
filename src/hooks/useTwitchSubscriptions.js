import { useTwitchCurrentUser } from './useTwitchCurrentUser';
import { useTwitchApi } from './useTwitchApi';

/**
 * https://dev.twitch.tv/docs/api/reference#get-broadcaster-subscriptions
 */
export const useTwitchSubscriptions = () => {
  const currentUser = useTwitchCurrentUser();
  let path = null;
  if (currentUser != null) {
    const params = new URLSearchParams({ broadcaster_id: currentUser.id });
    path = `subscriptions?${params}`;
  }
  return useTwitchApi(path);
};
