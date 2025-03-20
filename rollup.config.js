import typescript from "@rollup/plugin-typescript";
import { minify } from "rollup-plugin-esbuild-minify";
import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import versionInjector from "rollup-plugin-version-injector";
import prettier from "rollup-plugin-prettier";
import optimizeJs from "rollup-plugin-optimize-js";

const babelConfig = {
  babelHelpers: "bundled",
  extensions: [".ts", ".js"],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
        modules: false,
        bugfixes: true,
        loose: true,
      },
    ],
  ],
};

export default [
  // ESM Build
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "es",
      preserveModules: true,
      entryFileNames: "[name].js",
      sourcemap: true,
    },
    cache: true,
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
      typescript(),
      nodeResolve(),
      babel(babelConfig),
      versionInjector({
        injectInComments: {
          fileRegexp: /\.(js|ts)$/,
          tag: "<LIBRARY_NAME> @{version}",
        },
      }),
      prettier({
        parser: "babel",
        tabWidth: 2,
        singleQuote: true,
        bracketSpacing: true,
      }),
      optimizeJs(),
    ],
    treeshake: {
      moduleSideEffects: false,
    },
  },
  // Minified ESM Build
  {
    input: "src/<LIBRARY_NAME>.ts",
    output: {
      file: "dist/<LIBRARY_NAME>.min.js",
      format: "es",
      sourcemap: true,
    },
    cache: true,
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
      typescript(),
      nodeResolve(),
      babel(babelConfig),
      versionInjector({
        injectInComments: {
          fileRegexp: /\.(js|ts)$/,
          tag: "<LIBRARY_NAME> @{version}",
        },
      }),
      minify({
        minify: true,
        legalComments: "none",
        logLevel: "warning",
      }),
      optimizeJs(),
    ],
    treeshake: {
      moduleSideEffects: false,
    },
  },
  // CommonJS Build
  {
    input: "src/<LIBRARY_NAME>.ts",
    output: {
      file: "dist/<LIBRARY_NAME>.cjs",
      format: "cjs",
      sourcemap: true,
      exports: "auto",
    },
    cache: true,
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
      typescript(),
      nodeResolve(),
      babel(babelConfig),
      versionInjector({
        injectInComments: {
          fileRegexp: /\.(js|ts)$/,
          tag: "<LIBRARY_NAME> @{version}",
        },
      }),
      optimizeJs(),
    ],
    treeshake: {
      moduleSideEffects: false,
    },
  },
  // Minified CommonJS Build
  {
    input: "src/<LIBRARY_NAME>.ts",
    output: {
      file: "dist/<LIBRARY_NAME>.min.cjs",
      format: "cjs",
      sourcemap: true,
      exports: "auto",
    },
    cache: true,
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
      typescript(),
      nodeResolve(),
      babel(babelConfig),
      versionInjector({
        injectInComments: {
          fileRegexp: /\.(js|ts)$/,
          tag: "<LIBRARY_NAME> @{version}",
        },
      }),
      minify({
        minify: true,
        legalComments: "none",
        logLevel: "warning",
      }),
      optimizeJs(),
    ],
    treeshake: {
      moduleSideEffects: false,
    },
  },
];