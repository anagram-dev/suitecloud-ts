# suitecloud-ts

Starter project for using TypeScript v7+ in SuiteCloud Account Customization Projects (ACP).

## Table of Contents

- [Motivation](#motivation)
- [Features](#features)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [License](#license)

## Motivation

This project aims to improve the experience of developing for NetSuite with SuiteCloud. Static
checks catch mistakes before they reach NetSuite, where finding them usually means deploying and
testing in an account. The SuiteCloud CLI already provides a testing framework with Jest, but
leaves type checking, linting and formatting to the developer.

There are multiple ways of closing this gap, and many developers have already done it in their own
projects. This one picks one of those ways, wires TypeScript, ESLint and Prettier into the
SuiteCloud CLI workflow, and takes it one step further as a fully fledged starter project that is
open for everyone to use.

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

### Main Features

- TypeScript v7 for better performance and long-term support
- TypeScript and JavaScript sources co-exist, and TypeScript can import JavaScript, allowing
  incremental adoption of TypeScript into existing JavaScript projects
- NetSuite types via the third-party [`@hitc/netsuite-types`](https://www.npmjs.com/package/@hitc/netsuite-types) package
- SuiteCloud CLI commands work as usual, with the build running automatically before each deploy
  or upload
- Native support for `object:import` of XML object files
- Supports bundling third-party npm libraries into SuiteScript-compatible AMD modules, and fails the
  build on direct npm imports that NetSuite can't resolve
- Jest tests in TypeScript or JavaScript, using the SuiteCloud `N/*` stubs and type checked like the
  sources

### Quality-of-life Features

- ESLint with TypeScript support and `requirejs` rules for plain JavaScript files
- Prettier formatting
- GitHub Action for pull request validation
- Git hooks for linting, formatting and Conventional Commits messages
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

1. Create a new Git repository from the starter. The Git repository has to exist before
   `npm install`, since the install sets up the Git hooks.

    Create a GitHub repository from the template and clone it. Click **Use this template** on the
    repository page, or run the command below with the [GitHub CLI](https://cli.github.com/).
    GitHub starts the new repository with a fresh history:

    ```bash
    gh repo create my-project --template anagram-dev/suitecloud-ts --private --clone
    cd my-project
    ```

    Alternatively, if not using GitHub, clone the starter into a new folder and start a fresh Git
    history:

    ```bash
    git clone --depth 1 https://github.com/anagram-dev/suitecloud-ts.git my-project
    cd my-project
    rm -rf .git
    git init
    ```

2. Rename the project:

    - Update `name`, `version`, `description`, `author`, `license` and `repository` in
      `package.json`.
    - Update `<projectname>` in `src/manifest.xml`.
    - Replace `LICENSE` with the new project's license, or delete it (see [License](#license)).

3. Follow [Setup](docs/setup.md) to install the prerequisites and dependencies, and to
   authenticate the SuiteCloud CLI.

4. Check that the setup works while the sample code is still in place. `project:validate` builds
   the project first, then validates it against the authenticated account:

    ```bash
    npm test
    suitecloud project:validate
    ```

5. Replace the sample code with your own:

    - `src/SuiteScripts/RL_Echo.ts` and `src/Objects/customscript_rl_echo.xml` are a sample RESTlet
      and its script object.
    - `src/SuiteScripts/utils/` holds the sample's error and response helpers.
    - `__tests__/` holds the sample's tests. `RL_Echo.test.ts` and `utils/` mirror
      `src/SuiteScripts/` in TypeScript, and `sample-test.js` is the SuiteCloud CLI's JavaScript
      sample.
    - Zod is bundled as a sample library. To remove it, delete `lib/zod.mjs`,
      `src/SuiteScripts/lib/zod.*` and its entries in `rollup.config.lib.mjs`, then run
      `npm uninstall zod`.

    `AGENTS.md` points at some of these files as examples, so update it after removing them.

6. Optionally, disable any [quality-of-life features](docs/disabling-features.md) the project
   doesn't need.

7. Replace this `README.md` with one for the new project. The files in `docs/` describe the
   starter itself, so they can stay as they are.

## Documentation

- [Setup](docs/setup.md): prerequisites, dependencies and SuiteCloud CLI authentication.
- [Usage](docs/usage.md): day-to-day commands, `npm` scripts, tests and SuiteCloud CLI hooks.
- [Project Structure](docs/project-structure.md): folder layout and where to put each file.
- [Build Pipeline](docs/build-pipeline.md): how TypeScript is compiled and bundled into AMD modules.
- [Library Bundler](docs/library-bundler.md): how to bundle third-party npm libraries.
- [Disabling Quality-of-life Features](docs/disabling-features.md): how to turn off optional
  tooling.

## License

This starter is licensed under [MIT No Attribution](LICENSE) (`MIT-0`). Projects created from
it don't need to keep the copyright notice or credit this repository, though a link back is always
appreciated.

The agent skills in `.agents/skills/` and `.claude/skills/` that come from
[`oracle/netsuite-suitecloud-sdk`](https://github.com/oracle/netsuite-suitecloud-sdk) are Copyright
(c) 2019, 2023 Oracle and/or its affiliates, and remain under the
[Universal Permissive License 1.0](https://github.com/oracle/netsuite-suitecloud-sdk/blob/master/LICENSE.txt)
(`UPL-1.0`).
