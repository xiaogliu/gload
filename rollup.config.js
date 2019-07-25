// rollup.config.js
import path from "path";
import babel from "rollup-plugin-babel";
import alias from "rollup-plugin-alias";
import { terser } from "rollup-plugin-terser";
import { version as VERSION } from "./package.json";

const pathResolve = p => path.resolve(__dirname, p);
const { NODE_ENV } = process.env;

const now = new Date();
const DATE = `${now.getMonth() +
  1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

export default {
  input: "./src/index.ts",
  output: [
    {
      // script
      file: "./dist/gload.min.js",
      format: "iife",
      name: "Gload"
    },
    {
      // es6 module
      file: "./dist/gload-es.min.js",
      format: "es"
    }
  ],
  plugins: [
    alias({
      // need add .ts, otherwise will add .js extension by default
      resolve: [".ts", ".js"],
      "@": pathResolve("src")
    }),
    babel({
      extensions: [".js", ".ts"],
      exclude: "node_modules/**"
    }),
    NODE_ENV === "prod" &&
      terser({
        compress: {
          // remove console.log
          pure_funcs: ["console.log"]
        },
        output: {
          // add comment on the top
          preamble: `/*! gload - v${VERSION} - ${DATE} https://xiaogliu.github.io */`
        }
      })
  ]
};
