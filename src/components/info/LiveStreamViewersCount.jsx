import { useTwitchLegacyLiveStream } from "../../hooks/useTwitchLegacyLiveStream";

export const LiveStreamViewersCount = () => {
  const { data } = useTwitchLegacyLiveStream();
  if(data) console.log(data);
  if (data)
    console.log(
      `Live stream: ${
        data?.stream != null
          ? data?.stream?.viewers > 0
            ? data?.stream.viewers
            : "no viewers on the live"
          : "no current live stream"
      }`
    );
  return (
    <>
      {data?.stream != null
        ? data?.stream?.viewers > 0
          ? data?.stream.viewers
          : "no viewers on the live"
        : "no current live stream"}
    </>
  );
};
