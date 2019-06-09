import typescript from "rollup-plugin-typescript2"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import peerDepsExternal from "rollup-plugin-peer-deps-external"

export default {
  input: "./src/index.ts",

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
    resolve({
      extensions: [".ts"]
    }),
    typescript(),
    commonjs()
  ]
}
