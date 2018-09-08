const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const phaserPath = path.join(__dirname, "node_modules", "phaser-ce", "build", "custom");

module.exports = function(env, args = {}) {
    const prod = args.mode === "production";
    return {
        devtool: prod ? "source-map" : "eval-source-map",
        entry: {
            "app": "./src/main.ts",
            "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
            "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker.js",
        },
        mode: "development",
        module: {
            rules: [{
                exclude: /node_modules/,
                test: /\.(j|t)s$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.txt$/,
                use: "raw-loader",
            },
            { test: /pixi\.js$/, loader: "expose-loader?PIXI" },
            { test: /phaser-split\.js$/, loader: "expose-loader?Phaser" },
            { test: /p2\.js$/, loader: "expose-loader?p2" }],
        },
        output: {
            filename: "[name].js",
            globalObject: "self",
            path: path.resolve(__dirname, "dist"),
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: ["app"],
                template: "index.html",
            }),
        ],
        resolve: {
            alias: {
                p2: path.join(phaserPath, "p2.js"),
                "phaser-ce": path.join(phaserPath, "phaser-split.js"),
                pixi: path.join(phaserPath, "pixi.js"),
            },
            extensions: [".js", ".ts"],
        },
    };
};
