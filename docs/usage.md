# Usage

After the initial [Setup](setup.md), run deployments and other SuiteCloud CLI commands as usual.
The build runs automatically before each command that needs it (see
[SuiteCloud CLI Hooks](#suitecloud-cli-hooks)).

```bash
suitecloud project:deploy
```

For any file-specific command, pass the file's deployed path in the File Cabinet, not its source
path. For example:

```bash
suitecloud file:upload --paths /SuiteScripts/RL_Echo.js
```

## Scripts

| Script                            | Description                                                                 |
| --------------------------------- | --------------------------------------------------------------------------- |
| `npm run build`                   | Compile TypeScript and copy static files to `src/FileCabinet/SuiteScripts/` |
| `npm run bundle:lib`              | Bundle third-party libraries into `src/SuiteScripts/lib/`                   |
| `npm run check`                   | Type check the project and its tests with TypeScript 7                      |
| `npm run clean`                   | Remove compiled output from `src/FileCabinet/SuiteScripts/` and `build/`    |
| `npm run lint` / `lint:fix`       | Lint the project or auto-fix linting issues                                 |
| `npm run format` / `format:check` | Format or check format with Prettier                                        |
| `npm test`                        | Run unit tests with Jest                                                    |

## Tests

Tests live in `__tests__/` and can be written in TypeScript or JavaScript. They import sources
from `src/SuiteScripts/` by relative path, so they don't need a build first. The SuiteCloud unit
testing framework provides stubs for the `N/*` modules, which `jest.mock('N/record')` turns into
mocks.

The SuiteCloud Jest configuration only transforms JavaScript, so `jest.transformer.mjs` adds
TypeScript support. It strips the types with `typescript` and passes the result to the SuiteCloud
transformer, which still hoists `jest.mock` calls above the imports. Jest doesn't type check
tests. `npm run check` does, with `__tests__/tsconfig.json`.

Some stubs, such as `N/record/instance`, have no types in `@hitc/netsuite-types`. To import one
from a TypeScript test, declare it in a `.d.ts` file in `__tests__/`. Jest skips `.d.ts` files.

## SuiteCloud CLI Hooks

`suitecloud.config.js` hooks into several SuiteCloud CLI commands via `beforeExecuting` to automate
the build and keep the developer experience consistent:

| Command            | Hook behavior                            |
| ------------------ | ---------------------------------------- |
| `project:deploy`   | Runs `clean`, `build` and tests          |
| `project:validate` | Runs `clean` and `build`                 |
| `project:package`  | Runs `clean` and `build`                 |
| `file:upload`      | Runs `clean` and `build`                 |
| `file:create`      | Prints a note to move generated JS files |
| `file:import`      | Prints a note to move generated JS files |
| `object:import`    | Prints a note to move generated JS files |
| `object:update`    | Prints a note to move generated JS files |

Commands that write files into `src/FileCabinet/` (`file:create`, `file:import`, `object:import`,
`object:update`) print a reminder to move any downloaded JS files into `src/SuiteScripts/`, where
the build pipeline manages them. The hooks run `clean` before each build, so a file left in
`src/FileCabinet/SuiteScripts/` is deleted the next time a hook builds the project.
