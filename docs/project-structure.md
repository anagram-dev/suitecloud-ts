# Project Structure

```text
/
├ .agents/skills/         # NetSuite agent skills vendored from oracle/netsuite-suitecloud-sdk
├ .claude/skills/         # symlinks to .agents/skills/ for Claude Code
├ .github/workflows/      # GitHub Actions
├ __tests__/              # Jest tests
├ docs/                   # documentation for developers using the starter project
├ lib/                    # entry points for bundling third-party libraries such as Zod
├ src/                    # folder used as `defaultProjectFolder` in suitecloud.config.js
│ ├ FileCabinet/          # standard folder expected by the SuiteCloud CLI
│ │ └ ...                 # File Cabinet folders other than SuiteScripts/ (e.g. Templates/), if needed
│ ├ Objects/              # SuiteCloud XML objects
│ ├ SuiteScripts/         # TS and JS source files, not deployed to NetSuite
│ │ └ lib/                # generated library bundles, committed to Git
│ ├ deploy.xml
│ └ manifest.xml
├ AGENTS.md               # instructions for AI coding agents
├ CLAUDE.md               # imports AGENTS.md for Claude Code
└ ...                     # project, build, bundle and SuiteCloud configuration files
```

## Source and Output Folders

TypeScript and JavaScript sources live together in `src/SuiteScripts/`, inside
`defaultProjectFolder` (i.e. `src/`) but outside `FileCabinet/`. The [build](build-pipeline.md)
compiles them into `src/FileCabinet/SuiteScripts/`, the native folder the SuiteCloud CLI deploys to
the File Cabinet.

This layout has a few consequences:

- TypeScript files are never deployed to the File Cabinet.
- Compiled JavaScript files are ignored by Git, since the build regenerates them.
- XML objects in `src/Objects/` work as usual, including `object:import`.
- The hooks print a reminder whenever a SuiteCloud CLI command may write JavaScript files into the
  ignored folder. See [SuiteCloud CLI Hooks](usage.md#suitecloud-cli-hooks).

## JavaScript and TypeScript Interop

Plain JavaScript files must be AMD modules, and the build copies them as they are. TypeScript files
can import them, which allows existing JavaScript projects to adopt TypeScript one file at a time.
To give a JavaScript module types, add a sibling `.d.ts` file that declares its exports, as
`src/SuiteScripts/utils/error.d.ts` does for `error.js`. The build skips `.d.ts` files, so they are
never deployed.
