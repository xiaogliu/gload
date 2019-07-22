// rollup.config.js
import path from "path";
import babel from "rollup-plugin-babel";
import alias from "rollup-plugin-alias";
import { terser } from "rollup-plugin-terser";

const { NODE_ENV } = process.env;
const pathResolve = p => path.resolve(__dirname, p);

export default {
  input: "./src/main.ts",
  output: [
    {
      file: "./dist/gload.min.js",
      format: "iife",
      name: "Gload"
    },
    {
      file: "./dist/gload-es.min.js",
      format: "es"
    }
  ],
  plugins: [
    alias({
      // need add .ts, otherwise will add .js extension by default
      resolve: ['.ts', '.js'],
      '@': pathResolve('src')
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
        }
        // output: {
        //   keep license comment
        //   comments: function(node, comment) {
        //     var text = comment.value;
        //     var type = comment.type;
        //     if (type == "comment2") {
        //       // multiline comment
        //       return /@preserve|@license|@cc_on/i.test(text);
        //     }
        //   }
        // }
      })
  ]
};
