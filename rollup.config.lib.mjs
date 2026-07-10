import resolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'

const dirs = {
  entrypoints: 'lib',
  output: 'src/SuiteScripts/lib',
}

export default [
  {
    input: `${dirs.entrypoints}/zod.ts`,
    output: {
      file: `${dirs.output}/zod.js`,
      format: 'amd',
    },
    plugins: [resolve()],
  },
  {
    input: `${dirs.entrypoints}/zod.ts`,
    output: {
      file: `${dirs.output}/zod.d.ts`,
      format: 'es',
    },
    plugins: [
      resolve(),
      dts({ respectExternal: true }),
      {
        // Insert `@ts-ignore` before type variance errors in zod.d.ts until
        //  upstream Zod updates with types compatible with TS v7.
        name: 'patch-zod-dts-variance',
        renderChunk(code) {
          const ignore = '/** @ts-ignore Cast variance */'
          const lines = code.split('\n')
          const result = []
          for (const line of lines) {
            const alreadyIgnored = result
              .at(-1)
              ?.includes('@ts-ignore Cast variance')
            if (
              !alreadyIgnored &&
              (/^\s*(in|out)\s+\w/.test(line) || /<(in|out)\s+\w/.test(line))
            ) {
              result.push(`${line.match(/^[ \t]*/)[0]}${ignore}`)
            }
            result.push(line)
          }
          return result.join('\n')
        },
      },
    ],
  },
]
