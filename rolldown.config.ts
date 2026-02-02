import { defineConfig } from 'rolldown';

const removeCommentsPlugin = {
    name: 'remove-comments',
    renderChunk(code: string) {
        return code
            .replace(/\/\*(?!\s*@__(?:PURE|NO_SIDE_EFFECTS)__\s*\*\/)[\s\S]*?\*\//g, '')
            .replace(/\/\/#region.*\n?/g, '')
            .replace(/\/\/#endregion\n?/g, '')
            .replace(/\n{3,}/g, '\n\n');
    },
};

export default defineConfig([
    // Web build - ESM
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.mjs',
            format: 'esm',
        },
        external: ['react', /^react\//, 'react-native'],
        plugins: [removeCommentsPlugin],
    },
    // Web build - CJS
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.js',
            format: 'cjs',
        },
        external: ['react', /^react\//, 'react-native'],
        plugins: [removeCommentsPlugin],
    },
    // React Native build - ESM
    {
        input: 'src/index.native.ts',
        output: {
            file: 'dist/index.native.mjs',
            format: 'esm',
        },
        external: ['react', /^react\//, 'react-native'],
        plugins: [removeCommentsPlugin],
    },
    // React Native build - CJS
    {
        input: 'src/index.native.ts',
        output: {
            file: 'dist/index.native.js',
            format: 'cjs',
        },
        external: ['react', /^react\//, 'react-native'],
        plugins: [removeCommentsPlugin],
    },
]);
