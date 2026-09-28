import SuiteCloudJestConfiguration from '@oracle/suitecloud-unit-testing/jest-configuration/SuiteCloudJestConfiguration.js'
import path from 'node:path'
import cliConfig from './suitecloud.config.js'

const suiteCloudConfig = SuiteCloudJestConfiguration.build({
  projectFolder: cliConfig.defaultProjectFolder,
  projectType: SuiteCloudJestConfiguration.ProjectType.ACP,
})

export default {
  ...suiteCloudConfig,
  transform: {
    ...suiteCloudConfig.transform,
    '^.+\\.ts$': path.join(import.meta.dirname, 'jest.transformer.mjs'),
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s',
    // Oracle's sample test, named as the SuiteCloud CLI scaffolds it
    '**/__tests__/sample-test.js',
  ],
  passWithNoTests: true,
}
