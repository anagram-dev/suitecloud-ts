import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';
import jest from 'eslint-plugin-jest';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import requirejs from 'eslint-plugin-requirejs';
import globals from 'globals';

const distFiles = ['src/FileCabinet/SuiteScripts/**/*'];
const commonJsFiles = ['jest.config.js', 'suitecloud.config.js'];

export default defineConfig([
    {
        // shared config for all JS files regardless of version or type
        files: ['**/*.{js,mjs,cjs}'],
        ignores: [...distFiles],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        // config ESM files not using the mjs extension
        files: ['**/*.js'],
        ignores: [...distFiles, ...commonJsFiles],
        languageOptions: { sourceType: 'module' },
    },
    {
        // config for JS files or utility scripts not using ESM
        files: [...commonJsFiles],
        ignores: [...distFiles],
        languageOptions: { sourceType: 'commonjs' },
    },
    {
        // config for SuiteScript files
        files: ['src/**/*.js'],
        ignores: [...distFiles],
        plugins: { requirejs },
        languageOptions: {
            // SuiteScript 2.1 supports ECMAScript 2023
            // https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_156042690639.html
            ecmaVersion: 2023,
            // Neither `module`, `commonjs` or `script` is exactly AMD, but `script` is the closest
            sourceType: 'script',
            globals: {
                ...globals.amd,
            },
        },
        rules: {
            'requirejs/no-invalid-define': ['error'],
            'requirejs/no-invalid-require': ['error'],
            'requirejs/no-multiple-define': ['error'],
            'requirejs/no-assign-exports': ['error'],
            'requirejs/no-js-extension': ['error'],
            'requirejs/no-object-define': ['error'],
            'requirejs/no-function-define': ['error'],
            'requirejs/no-amd-define': ['off'],
            'requirejs/no-named-define': ['error'],
            'requirejs/no-commonjs-wrapper': ['error'],
            'requirejs/no-commonjs-return': ['off'],
            'requirejs/no-commonjs-exports': ['error'],
            'requirejs/no-commonjs-module-exports': ['error'],
            'requirejs/no-dynamic-require': ['error'],
            'requirejs/no-conditional-require': ['error'],
            'requirejs/no-assign-require': ['error'],
            'requirejs/no-require-tourl': ['error'],
            'requirejs/enforce-define': ['error'],
            'requirejs/one-dependency-per-line': ['off'],
            'requirejs/amd-function-arity': ['error'],
            'requirejs/sort-amd-paths': ['off'],
            'requirejs/no-restricted-amd-modules': ['error'],
        },
    },
    {
        // config for test JS files
        files: ['**/__tests__/**/*.js'],
        ignores: [...distFiles],
        plugins: { jest },
        languageOptions: { globals: jest.environments.globals.globals },
    },
    {
        files: ['**/*.json'],
        ignores: ['package-lock.json'],
        plugins: { json },
        language: 'json/json',
        extends: ['json/recommended'],
    },
    {
        files: ['**/*.md'],
        plugins: { markdown },
        language: 'markdown/gfm',
        extends: ['markdown/recommended'],
    },
    prettierRecommended,
]);
