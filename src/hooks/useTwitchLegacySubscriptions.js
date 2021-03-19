import { useTwitchCurrentUser } from './useTwitchCurrentUser';
import { useLegacyTwitchApi } from './useTwitchApi';

/**
 * https://dev.twitch.tv/docs/v5/reference/channels#get-channel-subscribers
 */
export const useTwitchLegacySubscriptions = () => {
  const currentUser = useTwitchCurrentUser();
  let path = null;
  if (currentUser != null) {
    path = `channels/${currentUser.id}/subscriptions?direction=desc&limit=1`;
  }
  return useLegacyTwitchApi(path);
};
