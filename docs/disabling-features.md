# Disabling Quality-of-life Features

Every quality-of-life feature is enabled by default, but none of them are required. They stay out
of the build: `build` doesn't invoke any of them, and the SuiteCloud CLI hooks only call
`clean`, `build` and `test`. Leaving one unused costs nothing, and builds and deployments keep
working either way.

If any feature is not needed, it can be disabled or ignored by following the instructions
described below for each.

## ESLint

Don't run `npm run lint`. The only other things that invoke it are the pre-commit hook and the
GitHub Action, both covered below.

To silence it in an editor that lints automatically, add paths to the `ignores` array in
`eslint.config.mjs`, or disable the ESLint extension for this workspace.

## Prettier

Don't run `npm run format`. Formatting is enforced by `npm run lint`, the pre-commit hook and the
GitHub Action, since ESLint reports Prettier violations as lint errors through
`eslint-plugin-prettier`.

To exempt specific files, add them to `.prettierignore`.

## GitHub Action for Pull Request validation

The workflow only triggers on `pull_request`, so it never runs locally.

To drop an individual check, remove its step from `.github/workflows/validate.yaml`. The
`Check Format`, `Lint` and `Test` steps can each go on their own; the rest set up the job.

If the repository will be hosted in GitHub, but no GitHub Actions are needed at all,
delete `.github/workflows/validate.yaml`. If hosted elsewhere, then the GitHub Actions will be
ignored.

## Pre-commit hooks

The `pre-commit` hook runs `lint-staged` and the `commit-msg` hook runs `commitlint`. They are
independent, so either can be disabled on its own.

Disable a hook by deleting its file:

```bash
rm .husky/pre-commit    # lint and format staged files
rm .husky/commit-msg    # conventional commit message validation
```

Deleting both is the recommended way to turn off git hooks entirely. Husky can stay installed with
no hook files present: its wrapper exits early when a hook has no matching file, so commits run
without it, and `npm install` leaves the deletions alone. Restoring a hook later is a matter of
writing the file back.

## AI agent instructions

Only AI coding agents read these files, so they can stay in the repository unused. To remove the
agent instructions, delete both files. Keeping only `CLAUDE.md` doesn't work, since it
imports `AGENTS.md`:

```bash
rm AGENTS.md CLAUDE.md
```

## AI agent skills

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

## NVM support

`.nvmrc` is only read when you run `nvm use`, so ignoring it means not running that command. Any
Node.js v22 install works, whether from `nvm`, `nix`, Homebrew or a system package.

The GitHub Action reads the same file via `node-version-file`, which is what keeps CI aligned
with local development.

## Nix flake and `direnv`

Don't run `direnv allow`, and the flake is never evaluated. If the shell is already active, run
`direnv deny` to unload it.

In that case, install the appropriate Node.js and OpenJDK versions by whatever means you prefer,
as described in [Setup](setup.md). The flake files can stay in the repository unused.
