import { useTwitchCurrentUser } from "../../hooks";

export const CurrentUserName = () => {
  const currentUser = useTwitchCurrentUser();
  // if (currentUser) console.group(currentUser);
  if (currentUser) console.log(`Current user: ${currentUser?.display_name}`);
  return <>{currentUser?.display_name}</>;
};
