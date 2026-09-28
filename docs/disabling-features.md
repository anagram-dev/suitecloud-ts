# Disabling Quality-of-life Features

Every quality-of-life feature is enabled by default, but none of them are required. They stay out
of the build: `build` doesn't invoke any of them, and the SuiteCloud CLI hooks only call
`clean`, `build` and `test`. Leaving one unused costs nothing, and builds and deployments keep
working either way.

## ESLint

Don't run `npm run lint`. The only other things that invoke it are the pre-commit hook and the
GitHub Action, both covered below.

To silence it in an editor that lints automatically, add paths to the `globalIgnores` list in
`eslint.config.mjs`, or disable the ESLint extension for this workspace.

## Prettier

Prettier is linked to ESLint. `eslint-plugin-prettier` reports formatting violations as lint errors,
so `npm run lint`, the pre-commit hook and the GitHub Action all enforce formatting, and Prettier
can only be easily turned off together with ESLint.

To exempt specific files, add them to `.prettierignore`.

## GitHub Action for Pull Request Validation

The workflow only triggers on `pull_request`, so it never runs locally.

To drop an individual check, remove its step from `.github/workflows/validate.yaml`. The
`Check Format`, `Lint`, `Type Check` and `Test` steps can each go on their own, and the rest set up
the job.

If the repository will be hosted on GitHub, but no GitHub Actions are needed at all, delete
`.github/workflows/validate.yaml`. Other hosts ignore the workflow.

## Git Hooks

The `pre-commit` hook runs `lint-staged` and the `commit-msg` hook runs `commitlint`. They are
independent, so either can be disabled on its own.

Disable a hook by deleting its file:

```bash
rm .husky/pre-commit    # lint and format staged files
rm .husky/commit-msg    # conventional commit message validation
```

Deleting both is the recommended way to turn off Git hooks entirely. Husky can stay installed with
no hook files present: its wrapper exits early when a hook has no matching file, so commits run
without it, and `npm install` leaves the deletions alone. Restoring a hook later is a matter of
writing the file back.

## AI Agent Instructions

Only AI coding agents read these files, so they can stay in the repository unused. To remove the
agent instructions, delete both files. Keeping only `CLAUDE.md` doesn't work, since it
imports `AGENTS.md`:

```bash
rm AGENTS.md CLAUDE.md
```

## AI Agent Skills

Only AI coding agents read these files. The build, ESLint and Prettier all
ignore `.agents/` and `.claude/`, so they can stay in the repository unused.

To remove a single skill, delete its folder, its symlink and its entry in `skills-lock.json`:

```bash
rm -r .agents/skills/<skill> .claude/skills/<skill>
```

To remove every skill, delete both skill folders and the lock file:

```bash
rm -r .agents/skills .claude/skills skills-lock.json
```

After removing every skill, drop the line in `AGENTS.md` that tells agents not to edit
`.agents/skills/` or `.claude/skills/`.

## NVM Support

Locally, `.nvmrc` is only read by `nvm use`, so ignoring it means not running that command. Any
Node.js v22 install works, whether from `nvm`, `nix`, Homebrew or a system package.

The GitHub Action reads the same file via `node-version-file`, which is what keeps CI aligned
with local development. To delete `.nvmrc`, remove the `node-version-file` line from
`.github/workflows/validate.yaml`.

## Nix Flake and `direnv`

Without `direnv allow`, the flake is never evaluated. If the shell is already active, run
`direnv deny` to unload it.

In that case, install the appropriate Node.js and OpenJDK versions by any other means,
as described in [Setup](setup.md). The flake files can stay in the repository unused.
