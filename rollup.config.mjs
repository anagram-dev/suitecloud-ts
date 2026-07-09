import { nodeResolve } from '@rollup/plugin-node-resolve';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const srcDir = 'dist';
const outDir = 'src/FileCabinet/SuiteScripts';

const collectEntries = (dir) => {
    const entries = [];
    for (const file of readdirSync(dir)) {
        const fullPath = join(dir, file);
        if (statSync(fullPath).isDirectory()) {
            entries.push(...collectEntries(fullPath));
        } else if (extname(file) === '.js') {
            entries.push(fullPath);
        }
    }
    return entries;
};

const nModulePattern = /^N(\/|$)/;

export default collectEntries(srcDir).map((entry) => {
    const relPath = relative(srcDir, entry);
    return {
        input: entry,
        output: {
            file: `${outDir}/${relPath}`,
            format: 'amd',
            esModule: false,
        },
        external: (id) => nModulePattern.test(id) || id.startsWith('.'),
        plugins: [nodeResolve()],
    };
});
