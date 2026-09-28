import { createHash } from 'node:crypto'
import suiteCloudTransformer from '@oracle/suitecloud-unit-testing/jest-configuration/SuiteCloudJestTransformer.js'
import ts from 'typescript'

// Emits ESM so that babel-jest can still hoist `jest.mock` calls above the imports
const compilerOptions = {
  module: ts.ModuleKind.ESNext,
  target: ts.ScriptTarget.ES2023,
  inlineSourceMap: true,
  inlineSources: true,
}

export default {
  process(sourceText, sourcePath, options) {
    const { outputText } = ts.transpileModule(sourceText, {
      fileName: sourcePath,
      compilerOptions,
    })
    return suiteCloudTransformer.process(outputText, sourcePath, options)
  },
  getCacheKey(sourceText, sourcePath, options) {
    return createHash('sha256')
      .update(
        suiteCloudTransformer.getCacheKey(sourceText, sourcePath, options),
      )
      .update(ts.version)
      .digest('hex')
  },
}
