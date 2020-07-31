
import resolve from "@rollup/plugin-node-resolve";
import {dillx} from "rollup-plugin-dillx";

export default {
    input: "./src/main.js",
    output: {
        file: "./dist/oregano-core.js",
        format: "esm"
    },
    plugins: [
        dillx(),
        resolve()
    ],
    watch: {
        exclude: "node_modules/**"
    }
}
