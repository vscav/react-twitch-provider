import { channelsData } from './channels-data'

let channels = [...channelsData]

function getAll() {
  return channels
}

function getByBroadcasterId(broadcasterIds: string[]) {
  return channels.filter((channel) => broadcasterIds.includes(channel.broadcaster_id))
}

function reset() {
  channels = [...channelsData]
}

export { getAll, getByBroadcasterId, reset }
