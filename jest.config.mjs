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
  clearMocks: true,
  testPathIgnorePatterns: ['/node_modules/', '\\.d\\.ts$'],
  passWithNoTests: true,
}
