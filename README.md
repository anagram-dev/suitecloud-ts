# suitecloud-ts

Scaffolding and boilerplate for using TypeScript v7+ in SuiteCloud Account Customization Projects (ACP).

## Table of Contents

- [Motivation](#motivation)
- [Features](#features)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Documentation](#documentation)

## Motivation

This project aims to improve the experience of developing for NetSuite with SuiteCloud. Static
checks catch mistakes before they reach NetSuite, where finding them usually means deploying and
testing in an account. The SuiteCloud CLI already provides a testing framework with Jest, but
leaves type checking, linting and formatting to the developer.

There are multiple ways of closing this gap, and many developers have already done it in their own
projects. This one picks one of those ways, wires TypeScript, ESLint and Prettier into the
SuiteCloud CLI workflow, and takes it one step further as a fully fledged boilerplate that is open
for everyone to use. For example:

- TypeScript and JavaScript sources co-exist, so existing projects can adopt TypeScript one file
  at a time.
- Third-party NPM libraries can be bundled into SuiteScript-compatible AMD modules.
- TypeScript v7 brings better performance and long-term support, and a Rollup step produces the
  AMD modules it can no longer emit (see [Build Pipeline](docs/build-pipeline.md)).

Static checks benefit everyone working on the project, including AI coding agents, which work best
when each check gives them a fast, deterministic signal to verify their own changes. Agents also
need project and NetSuite context. `AGENTS.md` tells them where to make changes and how to verify
them, and `.agents/skills/` vendors a subset of the
[NetSuite agent skills](https://github.com/oracle/netsuite-suitecloud-sdk) that Oracle publishes,
covering topics such as SDF best practices, record field IDs and role permissions.

Rather than becoming [one more competing standard](https://xkcd.com/927/), this project is also
meant as a way of collaborating with the Oracle SuiteCloud team. Its folder structure, for example,
demonstrates one of the alternatives proposed in
[oracle/netsuite-suitecloud-sdk#976](https://github.com/oracle/netsuite-suitecloud-sdk/issues/976).
The hope is that ideas proven here make their way into the SuiteCloud CLI itself, so their effects
outlast this repository and reach every SuiteCloud project.

## Features

### Main features

- TypeScript v7 for better performance and long-term support
- TypeScript and JavaScript sources co-exist, and TypeScript can import JavaScript, allowing
  incremental adoption of TypeScript into existing JavaScript projects
- NetSuite types via the 3rd-party [`@hitc/netsuite-types`](https://www.npmjs.com/package/@hitc/netsuite-types) package
- SuiteCloud CLI commands work as usual, with the build running automatically before each deploy
- Native support for `object:import` of XML object files
- Support bundling third-party NPM libraries into SuiteScript-compatible AMD modules

### Quality-of-life Features

- ESLint with TypeScript support and `requirejs` rules for plain JavaScript files
- Prettier formatting
- Includes GitHub Action for Pull Request validation
- Pre-commit hooks for linting, format and conventional commit message
- `AGENTS.md` and `CLAUDE.md` instructions for AI coding agents
- Relevant subset of [`suitecloud-sdk` agent skills](https://github.com/oracle/netsuite-suitecloud-sdk/tree/master/packages/agent-skills)
- NVM support via `.nvmrc` file
- Nix flake configuration with `direnv` support for dev shell

All of these are enabled by default, but can be left unused if desired. See
[Disabling Quality-of-life Features](docs/disabling-features.md).

## How It Works

TypeScript and JavaScript sources live in `src/SuiteScripts/`, outside the `FileCabinet/` folder
that the SuiteCloud CLI deploys. The build compiles them into `src/FileCabinet/SuiteScripts/`, so
TypeScript files are never deployed and compiled output stays out of Git. See
[Project Structure](docs/project-structure.md) for the full layout.

Since TypeScript 7 no longer emits AMD modules, `tsc` compiles to ESNext and Rollup bundles the
result into the AMD modules NetSuite expects. Hooks in `suitecloud.config.js` run this build before
the SuiteCloud CLI deploys, validates, packages or uploads files. See
[Build Pipeline](docs/build-pipeline.md) for each step.

## Getting Started

1. Copy the boilerplate into a new folder and start a fresh Git history. Git has to exist before
   `npm install`, since it sets up the pre-commit hooks:

    ```bash
    git clone --depth 1 https://github.com/anagram-dev/suitecloud-ts.git my-project
    cd my-project
    rm -rf .git
    git init
    ```

2. Follow [Setup](docs/setup.md) to install the prerequisites and dependencies, and to
   authenticate the SuiteCloud CLI.

3. Rename the project:

    - Update `name`, `version`, `description`, `author` and `repository` in `package.json`.
    - Update `<projectname>` in `src/manifest.xml`.

4. Replace this `README.md` with one for the new project. The files in `docs/` describe the
   boilerplate itself, so they can stay as they are.

5. Replace the sample code with your own:

    - `src/SuiteScripts/RL_Echo.ts` and `src/Objects/customscript_rl_echo.xml` are a sample RESTlet
      and its script object.
    - `src/SuiteScripts/utils/` holds the sample's error and response helpers.
    - `__tests__/sample-test.js` is a sample Jest test. Keep at least one test, since Jest fails
      when it finds none and `project:deploy` runs the tests.
    - Zod is bundled as a sample library. To remove it, delete `lib/zod.ts`,
      `src/SuiteScripts/lib/zod.*` and its entries in `rollup.config.lib.mjs`, then run
      `npm uninstall zod`.

    `AGENTS.md` points at some of these files as examples, so update it after removing them.

6. Optionally, disable any [quality-of-life features](docs/disabling-features.md) the project
   doesn't need.

## Documentation

- [Setup](docs/setup.md): prerequisites, dependencies and SuiteCloud CLI authentication.
- [Usage](docs/usage.md): day-to-day commands, `npm` scripts and SuiteCloud CLI hooks.
- [Project Structure](docs/project-structure.md): folder layout and where to put each file.
- [Build Pipeline](docs/build-pipeline.md): how TypeScript is compiled and bundled into AMD modules.
- [Library Bundler](docs/library-bundler.md): how to bundle third-party NPM libraries.
- [Disabling Quality-of-life Features](docs/disabling-features.md): how to turn off optional
  tooling.
