import { useTwitchStreams } from "../../hooks";

export const Streams = () => {
  const { data } = useTwitchStreams();
  if (data) console.log('Streams: ', data);
  return null;
};
