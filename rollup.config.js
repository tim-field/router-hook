import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import peerDepsExternal from "rollup-plugin-peer-deps-external"

export default {
  input: "./src/index.js",

  output: {
    file: "dist/index.js",
    format: "es",
    globals: {
      react: "React",
      "react-dom": "ReactDOM"
    }
  },

  plugins: [
    peerDepsExternal(),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".jsx"],
      runtimeHelpers: true
    }),
    resolve({
      extensions: [".js", ".jsx"]
    }),
    commonjs()
  ]
}
