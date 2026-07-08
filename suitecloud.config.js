const { spawn } = require('node:child_process');
const SuiteCloudJestUnitTestRunner = require('@oracle/suitecloud-unit-testing/services/SuiteCloudJestUnitTestRunner');

const defaultProjectFolder = 'src';

const tap = (fn) => async (args) => {
    await fn(args);
    return args;
};

const writeInfo = (message) => {
    const BOLD_BLUE = '\x1b[1;34m';
    const RESET = '\x1b[0m';
    process.stdout.write(`${BOLD_BLUE}${message}${RESET}\n`);
};

const runNpmCommand = async (command) =>
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

const build = async () => {
    await runNpmCommand('clean');
    await runNpmCommand('build');
};
const test = async () => {
    await SuiteCloudJestUnitTestRunner.run({
        // Jest configuration options.
    });
};
const logJsFolderNote = () => {
    writeInfo(
        `NOTE: JavaScript files are placed in the ignored "./${defaultProjectFolder}/FileCabinet" folder. If needed, move them to "./${defaultProjectFolder}/SuiteScripts".`,
    );
};

module.exports = {
    defaultProjectFolder,
    commands: {
        'file:create': {
            beforeExecuting: tap(logJsFolderNote),
        },
        'file:import': {
            beforeExecuting: tap(logJsFolderNote),
        },
        'file:upload': {
            beforeExecuting: tap(build),
        },
        'object:import': {
            beforeExecuting: tap(logJsFolderNote),
        },
        'object:update': {
            beforeExecuting: tap(logJsFolderNote),
        },
        'project:deploy': {
            beforeExecuting: tap(async () => {
                await build();
                await test();
            }),
        },
        'project:package': {
            beforeExecuting: tap(build),
        },
        'project:validate': {
            beforeExecuting: tap(build),
        },
    },
};
