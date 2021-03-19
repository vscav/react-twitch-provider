import { TwitchProvider } from "./components/TwitchProvider";
import { CurrentUserName } from "./components/ui";

function App() {
  return (
    <TwitchProvider>
      <div>
        <CurrentUserName /> is the current user authenticated.
      </div>
    </TwitchProvider>
  );
}

export default App;
