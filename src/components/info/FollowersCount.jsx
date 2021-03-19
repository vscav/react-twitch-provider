import { useTwitchFollowers } from "../../hooks/useTwitchFollowers";

export const FollowersCount = () => {
  const { data } = useTwitchFollowers();
  if(data) console.log(`Total followers: ${data?.total}`);
  return <>{data?.total}</>;
};
