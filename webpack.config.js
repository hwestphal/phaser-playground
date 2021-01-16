const path = require('path');
const phaserPath = path.join(__dirname, "node_modules", "phaser-ce", "build", "custom");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = (env, argv) => {
    const prod = argv.mode === "production";

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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.ttf$/,
                use: ['file-loader']
            }, {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.txt$/i,
                exclude: '/node_modules/',
                use: 'raw-loader'
            },

            { test: /pixi\.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["PIXI"] } } },
            { test: /phaser-split\.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["Phaser"] } } },
            { test: /p2\.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["p2"] } } },

            ]
        },

        resolve: {
            alias: {
                p2: path.join(phaserPath, "p2.js"),
                "phaser-ce": path.join(phaserPath, "phaser-split.js"),
                pixi: path.join(phaserPath, "pixi.js"),
            },
            extensions: [".js", ".ts"],
        },
        output: {
            filename: "[name].js",
            publicPath: "dist/",
            globalObject: "self",
            path: path.resolve(__dirname, "dist"),
        },


        plugins: [
            new MonacoWebpackPlugin()
        ]
    }
};
