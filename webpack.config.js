const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin()

const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports =  smp.wrap({
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            },
            {
                test: /\.tsx?$/,
                use: { loader: 'ts-loader',   options: { transpileOnly: true }},
                exclude: /node_modules/,
            },
            {
                test: /\.txt$/i,
                exclude: '/node_modules/',
                use: 'raw-loader'
            },

            { test: /baby.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["Baby"] } } },

            // { test: /pixi\.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["PIXI"] } } },
            // { test: /phaser-split\.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["Phaser"] } } },
            // { test: /p2\.js$/, exclude: '/node_modules/', use: { loader: "expose-loader", options: { exposes: ["p2"] } } },

        ]
    },

    ///////////  danger here
    // optimization: {
    //     // minimize: true
    //     runtimeChunk:true,
    //     removeAvailableModules: false,
    //     removeEmptyChunks: false,
    //     splitChunks: false,
    // },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    externals: {
        Baby: 'baby',
        Ammo: 'ammo',
        Babylon: 'babylon',
    },


    output: {
        filename: 'bundle.[name].js',     // for small bundles
        publicPath: "dist/",
        globalObject: "self",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new MonacoWebpackPlugin(),
    ],
    devServer: {
        contentBase: './'
    }
})
