# Project Structure

```text
/
├ .agents/skills/         # NetSuite agent skills vendored from oracle/netsuite-suitecloud-sdk
├ .claude/skills/         # symlinks to .agents/skills/ for Claude Code
├ .github/workflows       # github actions
├ __tests__/              # jest tests
├ docs/                   # documentation for developers using the boilerplate
├ lib/                    # entry points for Zod and other 3rd-party libs for bundling
├ src/                    # folder used as `defaultProjectFolder` in suitecloud.config.js
│ ├ FileCabinet/          # standard folder expected by the SuiteCloud CLI
│ │ └ ...                 # folders expected by the SuiteCloud CLI except SuiteScripts (i.e. Templates)
│ ├ Objects/              # SuiteCloud XML objects
│ ├ SuiteScripts/         # TS and JS source files, not deployed to NetSuite
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
- Compiled JavaScript files are ignored from Git, since every build overwrites them.
- XML objects in `src/Objects/` work as usual, including `object:import`.
- The SuiteCloud CLI warns whenever a command may write JavaScript files into the ignored folder.
  See [SuiteCloud CLI Hooks](usage.md#suitecloud-cli-hooks).

## JavaScript and TypeScript Interop

Plain JavaScript files must be AMD modules, and the build copies them as they are. TypeScript files
can import them, which allows existing JavaScript projects to adopt TypeScript one file at a time.
To give a JavaScript module types, add a sibling `.d.ts` file that declares its exports, as
`src/SuiteScripts/utils/error.d.ts` does for `error.js`.
