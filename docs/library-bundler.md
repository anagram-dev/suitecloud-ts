# Library Bundler

Third-party npm packages cannot be loaded directly in SuiteScript, since it expects AMD modules
served from the File Cabinet. The library bundler pre-bundles selected packages into self-contained
AMD files that can be uploaded and imported like any other SuiteScript file.

## How it works

Each library gets a small entrypoint in `lib/` that re-exports the public API, for example:

```ts
// lib/zod.ts
export { z as default } from 'zod';
```

Running `npm run bundle:lib` processes every entrypoint in `lib/` through Rollup
(`rollup.config.lib.mjs`) and writes two output files per library into `src/SuiteScripts/lib/`:

- **`<package>.js`** — the full library bundled as an AMD module, ready for the File Cabinet
- **`<package>.d.ts`** — bundled type declarations for use during TypeScript development

Both output files should be committed to the repository. They are consumed directly by the TypeScript
build pipeline, and no build step is required for day-to-day development after the initial bundle.

## Bundling a new library

1. Install the package as a dev dependency:

    ```bash
    npm install --save-dev <package>
    ```

2. Create an entrypoint in `lib/` that exports the API your scripts will use, for example:

    ```ts
    // lib/<package>.ts
    export { something as default } from '<package>';
    ```

3. Add two entries to the `export default` array in `rollup.config.lib.mjs`: one for the JS
   bundle and one for the type declarations:

    ```js
    // JS bundle
    {
      input: `${dirs.entrypoints}/<package>.ts`,
      output: { file: `${dirs.output}/<package>.js`, format: 'amd' },
      plugins: [resolve()],
    },
    // Type declarations
    {
      input: `${dirs.entrypoints}/<package>.ts`,
      output: { file: `${dirs.output}/<package>.d.ts`, format: 'es' },
      plugins: [resolve(), dts({ respectExternal: true })],
    },
    ```

4. Run the bundler and commit the output:

    ```bash
    npm run bundle:lib
    git add src/SuiteScripts/lib/<package>.js src/SuiteScripts/lib/<package>.d.ts
    ```

5. In your SuiteScript files, import the bundled library using its relative path:

    ```ts
    import name from './lib/<package>';
    ```
