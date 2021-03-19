import { createContext, useContext } from "react";

export const TwitchContext = createContext(undefined);

export const useTwitchContext = () => {
  const context = useContext(TwitchContext);

  if (context === undefined) {
    throw new Error("useTwitchContext must be used within a TwitchProvider");
  }

  return context;
};
