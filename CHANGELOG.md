# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 0.1.1-beta.1 - 2022-11-28
### Added
- Basic application example for documentation purpose.
- Documentation for `useTwitchCheermotes`, `useTwitchCurrentUser` and `useTwitchTopGames` hooks.

## 0.1.1-beta.0 - 2022-11-28
### Added
- Package build support for both ESM and CommonJS.
- `useTwitchApi` (internal) hook to act as a wrapper around the `useSWR` hook to perform `GET` requests on the Twitch API.
- Safe data validation with `Zod`.
- `useTwitchCurrentUser` hook to retrieve current logged in user data.
- `useTwitchTopGames` hook to retrieve top Twitch games data (support for pagination).
- `useTwitchCheermotes` hook to retrieve available Twitch cheermotes (support for user's custom cheermotes).
