# Usage

After the initial [Setup](setup.md), run deployments and other SuiteCloud CLI commands as usual.
The build runs automatically before each command that needs it (see
[SuiteCloud CLI Hooks](#suitecloud-cli-hooks)).

```bash
suitecloud project:deploy
```

For any file-specific command, pass its deployed path in the File Cabinet, not its source path.
For example:

```bash
suitecloud file:upload --paths /SuiteScripts/RL_Echo.js
```

## Scripts

| Script                            | Description                                                                 |
| --------------------------------- | --------------------------------------------------------------------------- |
| `npm run build`                   | Compile TypeScript and copy static files to `src/FileCabinet/SuiteScripts/` |
| `npm run bundle:lib`              | Bundle third-party libraries into `src/SuiteScripts/lib/`                   |
| `npm run check`                   | Type check the project with TypeScript 7                                    |
| `npm run clean`                   | Remove compiled output from `src/FileCabinet/SuiteScripts/` and `build/`    |
| `npm run lint` / `lint:fix`       | Lint the project or auto-fix linting issues                                 |
| `npm run format` / `format:check` | Format or check format with Prettier                                        |
| `npm test`                        | Run unit tests with Jest                                                    |

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

Commands that write files into `FileCabinet` (`file:create`, `file:import`, `object:import`,
`object:update`) print a reminder to move any downloaded JS files into `src/SuiteScripts/`, where
the build pipeline manages them. The hooks run `clean` before each build, so a file left in
`src/FileCabinet/SuiteScripts/` is deleted the next time a hook builds the project.
