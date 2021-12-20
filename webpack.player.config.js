// const webpack = require('webpack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin()

// const VueLoaderPlugin = require('vue-loader-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const { web } = require('webpack');

module.exports = smp.wrap({
    // devtool: 'inline-source-map',
    devtool: 'eval-source-map',
    target: 'web',
    entry: {
        "app": "./src/main.ts",
        "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
        "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker.js",
    },
    mode: "development",
    module: {
        rules: [
            // {
            //     test: /\.vue$/,
            //     use: "vue-loader"
            // },
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
            {
                test: /\.ttf$/,
                use: ['file-loader']
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

        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            // this isn't technically needed, since the default `vue` entry for bundlers
            // is a simple `export * from '@vue/runtime-dom`. However having this
            // extra re-export somehow causes webpack to always invalidate the module
            // on the first HMR update and causes the page to reload.
            // vue: "@vue/runtime-dom"
        }
    },


    output: {
        filename: 'bundle.[name].js',     // for small bundles
        publicPath: "dist/",
        globalObject: "self",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new MonacoWebpackPlugin(),
        // new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        // new webpack.optimize.LimitChunkCountPlugin({
        //     maxChunks: 5,
        // }),
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
})
