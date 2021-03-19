import { redirectForToken } from "../api/helpers";
import { TwitchContext } from "./TwitchContext";
import { TWITCH_CLIENT_ID } from "../constants";

export const TwitchProvider = ({ children }) => {
  const hashParams = new URLSearchParams(document.location.hash.substr(1));
  const accessToken = hashParams.get("access_token");

  if (!accessToken) {
    redirectForToken();
    return null;
  } else {
    console.log(`Access token (OAuth): ${accessToken}`);
  }

  return (
    <TwitchContext.Provider
      value={{
        accessToken,
        clientId: TWITCH_CLIENT_ID,
      }}
    >
      {children}
    </TwitchContext.Provider>
  );
};
