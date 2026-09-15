const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

var PACKAGE = require('./package.json');        // use the version # from package.json
var version = PACKAGE.version;

module.exports = {
    // devtool: 'inline-source-map',
    devtool: 'eval-source-map',

    entry: {
        "app": "./src/main.ts",
        "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
        "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker.js",
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.png$/,
                use: {
                    loader: "url-loader",
                    options: { limit: 8192 }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // {
            //     test: /\.ttf$/,
            //     use: ['file-loader']
            // },
            {
                test: /\.ttf$/,
                type: 'asset/resource'
              },
            {
                test: /\.tsx?$/,
                use: { loader: 'ts-loader', options: { transpileOnly: true } },
                exclude: /node_modules/,
            },
            {
                test: /\.txt$/i,
                exclude: '/node_modules/',
                use: 'raw-loader'
            },

            // { test: /baby.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["Baby"] } } },

            // { test: /pixi\.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["PIXI"] } } },
            // { test: /phaser-split\.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["Phaser"] } } },
            // { test: /p2\.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["p2"] } } },

        ],

        // this line gets rid of a harmless error message 'cannot resolve perf_hooks'
        noParse:[require.resolve('typescript/lib/typescript.js')],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },


    output: {
        filename: 'bundle.[name].js',     // for small bundles
        publicPath: "dist."+version+"/",
        globalObject: "self",
        path: path.resolve(__dirname, "dist."+version),
    },
    plugins: [
        new MonacoWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: "[name].css"
        })
    ],
    devServer: {
        contentBase: './',
        inline: true,
        hot: true,
        stats: "minimal",
        overlay: true,
        injectClient: false,
        disableHostCheck: true
        }
}
