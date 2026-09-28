# Library Bundler

Third-party npm packages cannot be loaded directly in SuiteScript, since it expects AMD modules
served from the File Cabinet. The library bundler pre-bundles selected packages into self-contained
AMD files that can be uploaded and imported like any other SuiteScript file. The build and ESLint
reject direct npm package imports in SuiteScript files, so every package has to go through the
bundler.

## How It Works

Each library gets a small entrypoint in `lib/` that re-exports the public API, for example:

```js
// lib/zod.mjs
export { z as default } from 'zod';
```

Running `npm run bundle:lib` processes every entrypoint in `lib/` through Rollup
(`rollup.config.lib.mjs`) and writes two output files per library into `src/SuiteScripts/lib/`:

- **`<package>.js`** — the full library bundled as an AMD module, ready for the File Cabinet
- **`<package>.d.ts`** — bundled type declarations for use during TypeScript development

Both output files should be committed to the repository. The build copies `<package>.js` like any
other JavaScript file, and `tsc` reads `<package>.d.ts` for types. `bundle:lib` isn't part of
`npm run build`, so it only needs to run again after adding or upgrading a library.

## Bundling a New Library

Rollup bundles the library as it is, without transpiling or polyfilling it. Before adding one,
check that it doesn't depend on syntax newer than ES2023, or on Node.js or browser APIs such as
`process`, `Buffer` or `fetch`, which SuiteScript may not provide.

1. Install the package as a dev dependency. It's bundled into `src/SuiteScripts/lib/`, so NetSuite
   never installs it:

    ```bash
    npm install --save-dev <package>
    ```

2. Create an entrypoint in `lib/` that exports the API your scripts will use, for example:

    ```js
    // lib/<package>.mjs
    export { something as default } from '<package>';
    ```

3. Add two entries to the `export default` array in `rollup.config.lib.mjs`: one for the JS
   bundle and one for the type declarations:

    ```js
    // JS bundle
    {
      input: `${dirs.entrypoints}/<package>.mjs`,
      output: { file: `${dirs.output}/<package>.js`, format: 'amd' },
      plugins: [resolve()],
    },
    // Type declarations
    {
      input: `${dirs.entrypoints}/<package>.mjs`,
      output: { file: `${dirs.output}/<package>.d.ts`, format: 'es' },
      plugins: [resolve(), dts({ respectExternal: true })],
    },
    ```

4. Run the bundler and commit the output:

    ```bash
    npm run bundle:lib
    git add src/SuiteScripts/lib/<package>.js src/SuiteScripts/lib/<package>.d.ts
    ```

    If `npm run check` then reports errors in `<package>.d.ts`, the declarations may need patching
    for TypeScript 7. See the `patch-zod-dts-variance` plugin in `rollup.config.lib.mjs` for Zod.

5. In your SuiteScript files, import the bundled library by its path relative to the importing
   file:

    ```ts
    import name from './lib/<package>'; // from src/SuiteScripts/
    import name from '../lib/<package>'; // from src/SuiteScripts/utils/
    ```
