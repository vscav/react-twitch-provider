# Release

## Requirements

The release strategy has the following requirements:

- **Start the release manually** with an appropriate [version bump](https://docs.npmjs.com/cli/v8/commands/npm-version) (patch, minor, major, prepatch, preminor, premajor, or prerelease)
- Support for **manually maintained [changelog file](https://github.com/vscav/react-twitch-provider/tree/main/CHANGELOG.md)** (using [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) conventions)
- **Automatically tag the package version** in the repository and **publish release notes** with [GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- **Publish the package to npm registry** with appropriate [distribution tags](https://docs.npmjs.com/cli/v8/commands/npm-dist-tag) (latest for stable versions, next or beta for pre-release versions with)

## Script

Each of the workflow jobs are described in the [`release.yml` file](https://github.com/vscav/react-twitch-provider/tree/main/.github/workflows/release.yml).

> Note that as we aim at having a package fully tested with 100% test coverage, we made sure to add a test job.

## How to

As this is a manual release, this is the **responsability of the developer to trigger it**.

To do so, on the repository:

- Go to `Actions`
- Find the `Release Package` workflow
- Choose the appropriate verison bump and click on `Run workflow`
