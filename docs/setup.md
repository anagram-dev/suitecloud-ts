# Setup

## Prerequisites

1. (Optional) If using `nix` and `direnv`, make sure flakes are enabled, and run:

    ```bash
    direnv allow
    ```

2. If not using `nix`, make sure that the following are installed globally:

    - Node.js v22 (`nvm use` picks it up from `.nvmrc`)
    - Oracle JDK or OpenJDK v21

## Installation

1. Install dependencies using `npm`:

    ```bash
    npm install
    ```

2. Authenticate the SuiteCloud CLI with a NetSuite account:

    ```bash
    suitecloud account:setup
    ```

    The SuiteCloud CLI is a project dependency, and the `nix` dev shell puts it on the `PATH`.
    Without `nix`, run it as `npx suitecloud`, or install the
    [`@oracle/suitecloud-cli`](https://www.npmjs.com/package/@oracle/suitecloud-cli) package
    globally to call `suitecloud` directly.

After setup, see [Usage](usage.md) for day-to-day commands.
