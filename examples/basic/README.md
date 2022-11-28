# Basic

> This application example was built with [Parcel](https://parceljs.org/)

## How to use

### Download

```bash
curl ...
cd basic-example
```

### Configuration

Follow the [package repository documentation](https://github.com/vscav/react-twitch-provider/tree/main#register-the-application) to generate your Twitch client ID. Make sure to set `http://localhost:3000` as the redirect URI as it is the local host address used by the example application.

Create a `.env` file based on the `.env.example` file with

    cp .env.example .env

Replace the value of the `REACT_APP_TWITCH_CLIENT_ID` key with your Twitch client Id.

### Installation

Install the application and run:

```bash
yarn
yarn start
# or
npm install
npm run start
```

## The main idea behind this example

Show you how to quickly set up an application using the package, as well as the authorization process.
