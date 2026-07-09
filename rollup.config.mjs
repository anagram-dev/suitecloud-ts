import { nodeResolve } from '@rollup/plugin-node-resolve'
import { globSync, existsSync } from 'node:fs'
import { resolve, dirname, extname } from 'node:path'

export default {
  input: globSync('build/**/*.js'),
  output: {
    dir: 'src/FileCabinet/SuiteScripts',
    format: 'amd',
    esModule: false,
    preserveModules: true,
    preserveModulesRoot: 'build',
    interop: (id) => (/^N(\/|$)/.test(id) ? 'defaultOnly' : 'auto'),
  },
  plugins: [
    {
      name: 'externalize-nmodule-imports',
      resolveId(id, parentId) {
        return parentId && /^N(\/|$)/.test(id) ? { id, external: true } : null
      },
    },
    {
      // TS preserves star imports upon build, and they need to be rewritten to
      //  default imports to avoid Rollup adding interop boilerplate
      name: 'rewrite-nmodule-star-imports',
      transform(code) {
        return {
          code: code.replace(
            /^import \* as (\w+) from ('N(?:\/[^']+)?');/gm,
            'import $1 from $2;',
          ),
        }
      },
    },
    {
      // If Rollup is resolving an import to an original JS AMD file import, not built by TS,
      //  then it should be treated as external. It will be statically copied outside the bundler.
      // An import is of that type when it's relative, doesn't have a `.js` extension, and
      //  there's no file in `build` for its path.
      name: 'externalize-jsamd-imports',
      resolveId(id, parentId) {
        // When resolving an input file, then `id` is the file path and `parentId` is empty.
        // When resolving an import path, then `id` is the imported path and `parentId` is the importing path.
        if (!id.startsWith('.') || !parentId) {
          return null
        }
        const ext = extname(id)
        const resolved = resolve(dirname(parentId), ext ? id : `${id}.js`)
        if (!existsSync(resolved)) {
          return { id, external: true }
        }
        return null
      },
    },
    {
      // Rollup wraps module content inside `define`, moving file-level
      //  @NApiVersion/@NScriptType annotations inside it, so they need to be
      //  moved to the top of the file.
      name: 'hoist-netsuite-annotations',
      renderChunk(code) {
        const banner = code
          .match(/\/\*\*[\s\S]*?@NApiVersion[\s\S]*?\*\//)?.[0]
          ?.trim()
        if (!banner) {
          return null
        }
        const dedentedBanner = banner.replace(/^[ \t]+(\*)/gm, ' $1')
        const strippedCode = code.replace(banner, '')
        return { code: `${dedentedBanner}\n${strippedCode}` }
      },
    },
    nodeResolve(),
  ],
}
