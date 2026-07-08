const { spawn } = require('node:child_process');
const SuiteCloudJestUnitTestRunner = require('@oracle/suitecloud-unit-testing/services/SuiteCloudJestUnitTestRunner');

const runNpmCommand = (command) => async () =>
    new Promise((resolve, reject) => {
        const child = spawn('npm', ['run', command], {
            cwd: __dirname,
            stdio: 'inherit',
            shell: process.platform === 'win32',
        });
        child.on('error', reject);
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`"${command}" exited with code ${code}`));
            }
        });
    });

const clean = runNpmCommand('clean');
const build = runNpmCommand('build');
const test = async () => {
    await SuiteCloudJestUnitTestRunner.run({
        // Jest configuration options.
    });
};

const tap = (fn) => async (args) => {
    await fn();
    return args;
};

module.exports = {
    defaultProjectFolder: 'src',
    commands: {
        'project:deploy': {
            beforeExecuting: tap(async () => {
                await clean();
                await build();
                await test();
            }),
        },
        'project:package': {
            beforeExecuting: tap(async () => {
                await clean();
                await build();
            }),
        },
        'project:validate': {
            beforeExecuting: tap(async () => {
                await clean();
                await build();
            }),
        },
    },
};
