import { useTwitchCurrentUser } from "../../hooks";

export const CurrentUserDescription = () => {
  const currentUser = useTwitchCurrentUser();
  if (currentUser) console.log(`Current user description: ${currentUser?.description}`);
  return <>{currentUser?.description}</>;
};