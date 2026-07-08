# suitecloud-ts

Sample scaffolding for using TypeScript in NetSuite SuiteCloud Account Customization Projects (ACP).

This project demonstrates **Option 3** of the folder structure alternatives proposed in [oracle/netsuite-suitecloud-sdk#976](https://github.com/oracle/netsuite-suitecloud-sdk/issues/976):

> Use TS files inside `defaultProjectFolder` but outside the `FileCabinet` folder, `tsc` builds into `FileCabinet`.

## Folder Structure

```text
src/
  FileCabinet/          # tsc output — compiled JS files go here (deployed to NetSuite)
  SuiteScripts/         # TypeScript source files live here (not deployed)
  Objects/              # SuiteCloud objects (XML)
  ...
```

TypeScript source files sit inside `defaultProjectFolder` (i.e. `src/`) but outside `FileCabinet/`.
The TypeScript compiler outputs compiled JS directly into `src/FileCabinet/SuiteScripts/`, which is
what gets deployed to the File Cabinet, and is ignored from Git.

### Features

- TypeScript and JavaScript files are compiled into the native `FileCabinet` folder
  expected by the CLI
- TypeScript and JavaScript source co-exist in the same directory
- No need to customize `object:import` when downloading files
- TypeScript files won't be deployed to the File Cabinet
- Compiled JavaScript files are ignored from Git
- Developer is warned whenever a file may be downloaded/created in the ignored folder
- Allows incremental adoption of TypeScript into existing JavaScript projects by
  supporting import of JavaScript files from TypeScript
- Includes NetSuite types via 3rd-party [`@hitc/netsuite-types`](https://www.npmjs.com/package/@hitc/netsuite-types) package
- (TODO) Support for TypeScript v7
- (TODO) Support bundling third party libraries into SuitScript compatible source

Other quality-of-life features for developers:

- ESLint with TypeScript support and `requirejs` rules for plain JavaScript files
- Prettier formatting
- Includes GitHub Action for PR validation
- Pre-commit hooks for linting, format and conventional commit message
- NVM support via `.nvmrc` file
- Nix flake configuration with `direnv` support for dev shell

## Setup

Install dependencies:

```bash
npm install
```

## Scripts

| Script                            | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `npm run build`                   | Compile TypeScript and copy static files to `FileCabinet` |
| `npm run clean`                   | Remove compiled output from `FileCabinet/SuiteScripts`    |
| `npm run lint` / `lint:fix`       | Lint the project or auto-fix linting issues               |
| `npm run format` / `format:check` | Format or check format with Prettier                      |
| `npm test`                        | Run unit tests with Jest                                  |

## Deployment

The project compiles TypeScript before deploying or validating via the `beforeExecuting`
hook in `suitecloud.config.js`. Run deployments and other SuiteCloud CLI commands as usual:

```bash
suitecloud project:deploy
```

## Dependencies

- [`typescript`](https://www.typescriptlang.org/) — TypeScript compiler
- [`@hitc/netsuite-types`](https://www.npmjs.com/package/@hitc/netsuite-types) — NetSuite type definitions
