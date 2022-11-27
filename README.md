<p align="center">
  <img src="logo.svg" width="140px" align="center" alt="React Twitch Provider logo" />
  <h1 align="center">React Twitch Provider</h1>
  <p align="center">
    <br/>
    React provider and hooks set to retrieve Twitch account and global data
  </p>
</p>
<br/>
<p align="center">
<a href="https://opensource.org/licenses"><img alt="GitHub" src="https://img.shields.io/github/license/vscav/react-twitch-provider"></a>
</p>

<br />

## Installation

### Register the application

Coming soon

### Environement file

Coming soon

### Add the package

Coming soon

## Examples

We have several examples in the [`/examples` folder]() of the repository. Here is a first basic one to get you started:

```jsx
import TwitchProvider, { useTwitchUser } from 'react-twitch-provider'

function Greeting() {
  const { data } = useTwitchUser();
  return (
    <div>
      {data && <>Welcome {data.display_name}</>}
    </div>
  );
}

export function App() {
  return (
    <TwitchProvider
      clientId={process.env.REACT_APP_TWITCH_CLIENT_ID!}
      redirectUri={process.env.REACT_APP_TWITCH_REDIRECT_URI!}
    >
      <Greeting />
    </TwitchProvider>
  );
}
```

This example will render your Twitch username into a container on the page.

> Make sure to follow the installation section to handle the client id and redirect URI from Twitch.

## API

Coming soon

## Development

### Setup

After cloning the repository, first use

    yarn install

It will install all the necessary dependencies, like **<a href="https://swr.vercel.app/" target="_blank">SWR</a>** or **<a href="https://zod.dev/" target="_blank">Zod</a>**, two libraries that the package strongly relies on.

### Build

Build the package with

    yarn build

It will build the package source twice, once for **ESM** and once for **CommonJS**.

### Tests

We use **<a href="https://jestjs.io/" target="_blank">Jest</a>**, **<a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">React Testing Library</a>** and **<a href="https://mswjs.io/" target="_blank">Mock Service Worker</a>** to test the package.

#### Automated tests

Run the tests in `watch` mode with

    yarn test:watch

Run a tests coverage report with

    yarn test:coverage

#### Manual testing

When developing and working on the package, you may want to test your changes in live. In this case, **<a href="https://github.com/wclr/yalc" target="_blank">Yalc</a>** is a good solution, that offers a better workflow than npm | yarn link.

##### Install Yalc

    yarn global add yalc

##### Publish

> Before publishing, make sure to build the package with `yarn build`

In your `react-twitch-provider` package folder, run

    yalc publish

It will copy [all the files that should be published in remote NPM registry](https://docs.npmjs.com/files/package.json#files).

In a external React application that you've created, run

    yalc add react-twitch-provider

It will copy the current version from the store to your dependent project's `.yalc` folder and inject a `file:.yalc/my-package dependency` into the `package.json`.

> You can alternatively use one of the projects of the [`/examples` folder]() of the repository to use it as a template.

##### Update

Later, you can run

    yalc update my-package

It will update the latest version from store.
