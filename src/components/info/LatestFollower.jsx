import { useTwitchFollowers } from "../../hooks";

export const LatestFollower = () => {
  const { data } = useTwitchFollowers();
  if (data) console.log(`Latest follower: ${data?.data[0]?.from_name}`);
  return <>{data?.data[0]?.from_name}</>;
};
