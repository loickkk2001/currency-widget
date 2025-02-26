const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const babel = require('@rollup/plugin-babel').default;
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');
const image = require('@rollup/plugin-image');
const { terser } = require('rollup-plugin-terser');
const livereload = require('rollup-plugin-livereload');

const isDev = process.env.ROLLUP_WATCH; // Check if running in watch mode

// Function to dynamically import rollup-plugin-serve
async function getServePlugin() {
  const { default: serve } = await import('rollup-plugin-serve');
  return serve({
    open: true,
    contentBase: 'dist',
    port: 3000,
  });
}

// Function to get all plugins including dynamic serve plugin if in dev mode
async function getPlugins() {
  const plugins = [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.ts', '.tsx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
    }),
    postcss({
      extensions: ['.css'],
    }),
    image(),
    isDev && livereload('dist'),
    !isDev && terser(),
  ];

  if (isDev) {
    const servePlugin = await getServePlugin();
    plugins.push(servePlugin);
  }

  return plugins.filter(Boolean);
}

// Export Rollup configuration
module.exports = async () => ({
  input: 'src/index.tsx', // Entry point for the React app
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: await getPlugins(),
});
