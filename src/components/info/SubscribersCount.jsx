import { useTwitchLegacySubscriptions } from "../../hooks/useTwitchLegacySubscriptions";

export const SubscribersCount = () => {
  const { data } = useTwitchLegacySubscriptions();
  // console.log(data)
  if (data) console.log(`Total subscribers: ${data?._total}`);
  return <>{data?._total}</>;
};
