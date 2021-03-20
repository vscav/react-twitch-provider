import { useTwitchCurrentUser } from './useTwitchCurrentUser';
import { useLegacyTwitchApi } from './useTwitchApi';

export const useTwitchLegacyLiveStream = () => {
  const currentUser = useTwitchCurrentUser();
  let path = null;
  if (currentUser != null) {
    path = `streams/${currentUser.id}`;
  }
  return useLegacyTwitchApi(path);
};
