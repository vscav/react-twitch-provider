import useSWR from "swr";
import { useTwitchContext } from "../components/TwitchContext";
import { TWITCH_API_ENDPOINT, TWITCH_API_LEGACY_ENDPOINT } from "../constants";

const requestInit = {
  method: "GET",
  mode: "cors",
  cache: "no-store",
};

const twitchApiFetcher = async (url, headers) => {
  const response = await fetch(url, { ...requestInit, headers });
  return response.json();
};

export const useTwitchApi = (path) => {
  const { accessToken, clientId } = useTwitchContext();
  const url = path === null ? null : `${TWITCH_API_ENDPOINT}${path}`;
  const headers = {
    "client-id": clientId,
    Authorization: `Bearer ${accessToken}`,
  };
  return useSWR(url, (url) => twitchApiFetcher(url, headers), {
    refreshInterval: 10000,
  });
};

export const useLegacyTwitchApi = (path) => {
  const { accessToken, clientId } = useTwitchContext();
  const url = path === null ? null : `${TWITCH_API_LEGACY_ENDPOINT}${path}`;
  const headers = {
    "client-id": clientId,
    Authorization: `OAuth ${accessToken}`,
    Accept: "application/vnd.twitchtv.v5+json",
  };
  return useSWR(url, (url) => twitchApiFetcher(url, headers), {
    refreshInterval: 10000,
  });
};
