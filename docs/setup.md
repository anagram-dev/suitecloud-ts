# Setup

1. (Optional) If using `nix` and `direnv`, make sure flakes are enabled, and run:

    ```bash
    direnv allow
    ```

2. If not using `nix`, make sure that the following are installed globally:

    - Node.js v22
    - Oracle JDK or OpenJDK v21
    - `@oracle/suitecloud-cli` [NPM package](https://www.npmjs.com/package/@oracle/suitecloud-cli)

3. Install dependencies using `npm`:

    ```bash
    npm install
    ```

4. Authenticate the SuiteCloud CLI with a NetSuite account:

    ```bash
    suitecloud account:setup
    ```

After setup, see [Usage](usage.md) for day-to-day commands.
