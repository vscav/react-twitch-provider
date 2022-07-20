import { useTwitchFollowers } from "../../hooks";

export const FollowersCount = () => {
  const { data } = useTwitchFollowers();
  if(data) console.log(`Total followers: ${data?.total}`);
  return <>{data?.total}</>;
};
