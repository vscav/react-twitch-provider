import { TwitchProvider } from "./components/TwitchProvider";
import {
  CurrentUserDescription,
  CurrentUserName,
  FollowersCount,
  LatestFollower,
  LiveStreamViewersCount,
  RecentSubscriber,
  SubscribersCount,
} from "./components/info";

function App() {
  return (
    <TwitchProvider>
      <div>
        <CurrentUserName /> is the current user authenticated.
      </div>
      <div>
        Description : <CurrentUserDescription />
      </div>
      <div>
        Number of followers: <FollowersCount /> (latest: <LatestFollower />)
      </div>
      <div>
        Number of subscribers: <SubscribersCount /> (recent:{" "}
        <RecentSubscriber />)
      </div>
      <div>
        Number of viewers: <LiveStreamViewersCount />
      </div>
    </TwitchProvider>
  );
}

export default App;
