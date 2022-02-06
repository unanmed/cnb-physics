import resolve from 'rollup-plugin-node-resolve';
import babel from "rollup-plugin-babel";
import { terser } from 'rollup-plugin-terser';

// rollup.config.js
export default {
    input: 'dist/src/index.js',
    output: {
        file: 'src/index.js',
        format: 'esm',
    },
    plugins: [
        resolve(),
    ]
};