import { useTwitchLegacySubscriptions } from "../../hooks/useTwitchLegacySubscriptions";

export const RecentSubscriber = () => {
  const { data } = useTwitchLegacySubscriptions();
  if (data)
    console.log(
      `Recent subscriber: ${
        data?.subscriptions?.length > 0
          ? data?.subscriptions[0]?.user.display_name
          : "none"
      }`
    );
  return (
    <>
      {data?.subscriptions?.length > 0
        ? data?.subscriptions[0]?.user.display_name
        : "none"}
    </>
  );
};
