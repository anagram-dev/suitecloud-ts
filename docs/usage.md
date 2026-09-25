# Usage

## Basic Usage

After the initial [Setup](setup.md), run deployments and other SuiteCloud CLI commands as usual.
The build runs automatically before each command.

```bash
suitecloud project:deploy
```

## Scripts

| Script                            | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `npm run build`                   | Compile TypeScript and copy static files to `FileCabinet` |
| `npm run bundle:lib`              | Bundle third-party libraries into `src/SuiteScripts/lib/` |
| `npm run check`                   | Type check the project with TypeScript 7                  |
| `npm run clean`                   | Remove compiled output from `FileCabinet/SuiteScripts`    |
| `npm run lint` / `lint:fix`       | Lint the project or auto-fix linting issues               |
| `npm run format` / `format:check` | Format or check format with Prettier                      |
| `npm test`                        | Run unit tests with Jest                                  |

## SuiteCloud CLI Hooks

`suitecloud.config.js` hooks into several SuiteCloud CLI commands via `beforeExecuting` to automate
the build and keep the developer experience consistent:

| Command            | Hook behavior                            |
| ------------------ | ---------------------------------------- |
| `project:deploy`   | Runs build and tests                     |
| `project:validate` | Runs build                               |
| `project:package`  | Runs build                               |
| `file:upload`      | Runs build                               |
| `file:create`      | Prints a note to move generated JS files |
| `file:import`      | Prints a note to move generated JS files |
| `object:import`    | Prints a note to move generated JS files |
| `object:update`    | Prints a note to move generated JS files |

Commands that write files into `FileCabinet` (`file:create`, `file:import`, `object:import`,
`object:update`) print a reminder to move any downloaded JS files into `src/SuiteScripts/`. That
way the build pipeline manages them, and the next build doesn't overwrite them.
