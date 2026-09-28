const SuiteCloudJestConfiguration = require('@oracle/suitecloud-unit-testing/jest-configuration/SuiteCloudJestConfiguration');
const cliConfig = require('./suitecloud.config');

const suiteCloudConfig = SuiteCloudJestConfiguration.build({
    projectFolder: cliConfig.defaultProjectFolder,
    projectType: SuiteCloudJestConfiguration.ProjectType.ACP,
});

module.exports = {
    ...suiteCloudConfig,
    transform: {
        ...suiteCloudConfig.transform,
        '^.+\\.ts$': require.resolve('./jest.transformer.mjs'),
    },
    testPathIgnorePatterns: ['/node_modules/', '\\.d\\.ts$'],
    passWithNoTests: true,
};
